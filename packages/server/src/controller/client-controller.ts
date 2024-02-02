import express from 'express'
import pool from '../database'
import Client from '../models/client-model'

const clientController = express.Router()

clientController.post('/', async (req, res) => {
    try {
        const new_client = req.body as Client
        const dbClient = await pool.connect()
        const phoneOnlyNumbers = new_client.phone.replace(/\D/g,'') // Removendo caracteres diferentes de dígitos
        const query = `INSERT INTO clients (name, email, phone) VALUES ('${new_client.name}', '${new_client.email}', '${phoneOnlyNumbers}' ) RETURNING id`
        const result = await dbClient.query(query)
        dbClient.release()
        res.status(201)
        return res.json({ 
            message: 'Cliente salvo com sucesso',
            id: result.rows[0].id
        })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

clientController.get('/', async (req, res) => {
    try {
        const dbClient = await pool.connect()
        const query = 'SELECT * FROM clients ORDER BY id DESC'
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
        const query = `SELECT * FROM clients WHERE id = ${id}`
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

// TODO: implementar função de edição.
clientController.put('/:id', async (req, res) => {
    const id = req.params.id
    res.status(500)
    return res.json({ message: `Não foi possível editar o usuário id ${id}. Endpoint não implementada.`})
})

// TODO: implementar função de remoção.
clientController.delete('/:id', async (req, res) => {
    const id = req.params.id
    res.status(500)
    return res.json({ message: `Não foi possível deletar o usuário id ${id}. Endpoint não implementada.`})
})

export default clientController