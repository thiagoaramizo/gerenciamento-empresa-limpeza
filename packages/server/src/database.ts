import { Pool } from 'pg' // Using the library https://github.com/brianc/node-postgres to connect to the database


const dbConfig = {
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'dbgel'
}

const pool = new Pool(dbConfig) //Using pool to manage connections, if you use a transaction it is necessary to use the client with connect() and release with release()

export default pool
