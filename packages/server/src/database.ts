import { Pool } from 'pg'

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'dbgel'
})

export default pool