import express from 'express'
import pool from '../database'
import Client from '../models/client-model'

const routeController = express.Router()

function calcRoute ( clients: Client[] ): Client[] {
    // TODO implementar função
    return clients
}


routeController.post('/', async (req, res) => {
    try {
        const clientsToRoute = req.body as Client[]
        const routeOfClients = calcRoute( clientsToRoute )
        const dbClient = await pool.connect()
        const query = `INSERT INTO routes (payload) values ('${ JSON.stringify(routeOfClients) }') RETURNING id`
        const result = await dbClient.query(query)
        dbClient.release()
        res.status(201)
        return res.json({ 
            message: 'Rota criada com sucesso',
            id: result.rows[0].id
        })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})


routeController.get('/', async (req, res) => {
    try {
        const dbClient = await pool.connect()
        const query = 'SELECT * FROM routes ORDER BY id DESC'
        const result = await dbClient.query(query)
        dbClient.release()
        return res.json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

routeController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dbClient = await pool.connect()
        const query = `SELECT * FROM routes WHERE id = ${id}`
        const result = await dbClient.query(query)
        dbClient.release()
        if ( (result.rowCount) && (result.rowCount > 0) ) {
            return res.json( result.rows[0] )
        } else {
            res.status(404)
            return res.json({
                message: 'Rota não encontrado'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

// TODO: implementar função de edição.
routeController.put('/:id', async (req, res) => {
    const id = req.params.id
    res.status(500)
    return res.json({ message: `Não foi possível editar a rota id ${id}. Endpoint não implementada.`})
})

// TODO: implementar função de remoção.
routeController.delete('/:id', async (req, res) => {
    const id = req.params.id
    res.status(500)
    return res.json({ message: `Não foi possível deletar a rota id ${id}. Endpoint não implementada.`})
})

export default routeController