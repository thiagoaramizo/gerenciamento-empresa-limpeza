import express from 'express'
import pool from '../database'
import Client from '../models/client-model'

const clientController = express.Router()

clientController.post('/', async (req, res) => {
    const dbClient = await pool.connect()

    try {
        const new_client = req.body as Client
        const phoneOnlyNumbers = new_client.phone.replace(/\D/g,'') // Removing characters other than digits
        
        // Changing the function for a transaction to include Lon and Lat
        await dbClient.query('BEGIN')
        
        const query = `INSERT INTO clients (name, email, phone) VALUES ('${new_client.name}', '${new_client.email}', '${phoneOnlyNumbers}' ) RETURNING id`
        const result = await dbClient.query(query)
        
        const queryLocation = `INSERT INTO clients_location(client_id ,lon, lat) VALUES (${result.rows[0].id}, ${new_client.lon}, ${new_client.lat})`
        await dbClient.query(queryLocation)
        
        await dbClient.query('COMMIT')

        res.status(201)
        return res.json({ 
            message: 'Cliente salvo com sucesso',
            id: result.rows[0].id
        })
    } catch (err) {
        await dbClient.query('ROLLBACK')
        console.log(err)
        res.status(500)
        return res.json({ 
            message: 'Erro ao cadastrar cliente',
        })
    } finally {
        dbClient.release()
    }
})

clientController.get('/', async (req, res) => {
    try {
        const dbClient = await pool.connect()
        const query = 'SELECT A.*, B.lon, B.lat FROM clients A, clients_location B WHERE A.id = B.client_id ORDER BY id DESC'
        const result = await dbClient.query(query)
        dbClient.release()
        return res.json(
            {
                total: result.rowCount,
                clients: result.rows
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

clientController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dbClient = await pool.connect()
        const query = `SELECT A.*, B.lon, B.lat FROM clients A, clients_location B WHERE A.id = B.client_id AND id = ${id}`
        const result = await dbClient.query(query)
        dbClient.release()
        if ( (result.rowCount) && (result.rowCount > 0) ) {
            return res.json( result.rows[0] )
        } else {
            res.status(404)
            return res.json({
                message: 'Cliente não encontrado'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

export default clientController