import express from 'express'
import pool from '../database'
import Client from '../models/client-model'
import { RoutePayload } from '../models/route-model'

const routeController = express.Router()

function makeRoute ( clients: Client[] ): RoutePayload {

    // Partindo da posição 0,0 procurando o ponto mais próximo
    const actualLocation = {
        lat: 0,
        lon: 0
    }

    // Criando dois arrays de apoio
    const routed: Client[] = []
    const distances: number[] = []
    const needRoute = JSON.parse( JSON.stringify(clients) ) as Client[]

    //Executando em loop até que todos os clientes estejam na rota
    while ( routed.length < clients.length ){

        const distancesArray = needRoute.map( (clientNeedRoute) => {
            return calcDistance( actualLocation, clientNeedRoute )
        } )

        console.log( distancesArray )
        //achando o menor valor
        const shortest = Math.min(...distancesArray)
        const indexShortest = distancesArray.indexOf( shortest )

        //Movendo o menor para a rota
        routed.push( needRoute[indexShortest] )
        distances.push( shortest )
        needRoute.splice( indexShortest, 1)

        //Atualizando a localização atual
        actualLocation.lat = routed[ routed.length -1 ].lat
        actualLocation.lon = routed[ routed.length -1 ].lon

    }

    // Retornando o payload ordenado para a rota
    return {
        clients: routed as Client[],
        distances: distances
    }
}

function calcDistance ( position: { lon: number, lat: number}, client: Client ): number {
    // Considerando um plano, caso seja necessário considerar a circunferencia da terra é necessário adequar o cálculo
    // Assim, aplicaremos o teorema de pitágoras: d²=( (xb-xa)² + (yb-ya)²)
    const deltaX = client.lon - position.lon
    const deltay = client.lat - position.lat
    const sqrDistance = (deltaX**2) + (deltay**2)
    const distance = Math.sqrt(sqrDistance)
    return distance
}

// Criação de rotas com clientes específicos SEM PERSISTENCIA
routeController.post('/new', (req, res) => {
    try{
        const clients = req.body as Client[]
        return res.json( makeRoute( clients ) )
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

//Criação de rota para todos os clientes
routeController.get('/new', async (req, res) => {
    try{
        const dbClient = await pool.connect()
        const clientsQuery = 'SELECT A.*, B.lon, B.lat FROM clients A, clients_location B WHERE A.id = B.client_id ORDER BY id DESC'
        const result = await dbClient.query(clientsQuery)
        const clients = result.rows as Client[]
        const new_route = makeRoute( clients )
        const persistQuery = `INSERT INTO routes (payload) values ('${ JSON.stringify(new_route) }') RETURNING id`
        await dbClient.query(persistQuery)
        res.status(201)
        return res.json( new_route )
    }catch (err) {
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