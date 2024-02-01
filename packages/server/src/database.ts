import { Pool } from 'pg' // Utilizando a biblioteca https://github.com/brianc/node-postgres para conexão com o banco


const dbConfig = {
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'dbgel'
}

const pool = new Pool(dbConfig) //Utilizando pool para gerenciamento de conexões, caso utilize alguma transaction é necessário usar o client com connect() e liberar com release()

export default pool
