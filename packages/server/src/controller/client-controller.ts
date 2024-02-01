import express from 'express'
import pool from '../database'
import Client from '../models/client-model'

const clientController = express.Router()

clientController.post('/', async (req, res) => {
    const new_client = req.body as Client
    try {
        const query = `INSERT INTO clients (name, email, phone) VALUES ('${new_client.name}', '${new_client.email}', '${new_client.phone}' )`
        await pool.query(query)
        res.status(201)
        return res.json({ message: 'Client saved successfully'})
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

clientController.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clients')
        console.log(result.rows)
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
    const id = req.params.id
    try {
        const result = await pool.query('SELECT * FROM clients')
        console.log(result.rows)
        return res.json({ message: 'clients get' + id})
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

clientController.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await pool.query('SELECT * FROM clients')
        console.log(result.rows)
        return res.json({ message: 'clients put:' + id})
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

clientController.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await pool.query('SELECT * FROM clients')
        console.log(result.rows)
        return res.json({ message: 'clients delete:' + id})
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

export default clientController