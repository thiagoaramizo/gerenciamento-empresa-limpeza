import express from 'express'

import pool from './database'

const routes = express.Router()

routes.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        console.log(result.rows)
        return res.json({ message: 'Hello World'})
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

export default routes