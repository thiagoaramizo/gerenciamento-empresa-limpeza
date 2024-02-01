import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes'
import clientController from './controller/client-controller'

const PORT = 3333
const app = express()
app.use(bodyParser.json())

// Routes
app.use(routes)
app.use('/client', clientController)


// Start server
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})