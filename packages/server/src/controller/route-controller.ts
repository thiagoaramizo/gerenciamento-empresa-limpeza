import express from 'express'
import pool from '../database'
import Client from '../models/client-model'
import { RoutePayload } from '../models/route-model'

const routeController = express.Router()

function makeRoute ( clients: Client[] ): RoutePayload {

    // Starting from position 0,0 looking for the closest point
    const currentLocation = {
        lat: 0,
        lon: 0
    }

    // Creating two support arrays
    const routed: Client[] = []
    const distances: number[] = []
    const needRoute = JSON.parse( JSON.stringify(clients) ) as Client[]

    // Running in a loop until all clients are on the route
    while ( routed.length < clients.length ){

        const distancesArray = needRoute.map( (clientNeedRoute) => {
            return calcDistance( currentLocation, clientNeedRoute )
        } )

        // finding the lowest value
        const shortest = Math.min(...distancesArray)
        const indexShortest = distancesArray.indexOf( shortest )

        // Moving the smallest to the route
        routed.push( needRoute[indexShortest] )
        distances.push( shortest )
        needRoute.splice( indexShortest, 1)

        //Updating current location
        currentLocation.lat = routed[ routed.length -1 ].lat
        currentLocation.lon = routed[ routed.length -1 ].lon

    }

    // Returning the ordered payload for the route
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

// Creation of routes with specific customers in post body
routeController.post('/new', async (req, res) => {
    const dbClient = await pool.connect()
    try{
        const clients = req.body as Client[]
        const newRoute = makeRoute( clients )
        const persistQuery = `INSERT INTO routes (payload) values ('${ JSON.stringify(newRoute) }') RETURNING id`
        const resultNewId = await dbClient.query(persistQuery)
        res.status(201)
        return res.json( {
            id: resultNewId.rows[0].id,
            created_at: new Date().toISOString(),
            payload: newRoute
        } )
    } catch (err) {
        console.log(err)
        res.status(500)
    }finally{
        dbClient.release()
    }
})


// Route creation for all customers
routeController.get('/new', async (req, res) => {
    const dbClient = await pool.connect()
    try{
        
        const clientsQuery = 'SELECT A.*, B.lon, B.lat FROM clients A, clients_location B WHERE A.id = B.client_id ORDER BY id DESC'
        const result = await dbClient.query(clientsQuery)
        const clients = result.rows as Client[]
        const newRoute = makeRoute( clients )
        const persistQuery = `INSERT INTO routes (payload) values ('${ JSON.stringify(newRoute) }') RETURNING id`
        const resultNewId = await dbClient.query(persistQuery)
        res.status(201)
        return res.json( {
            id: resultNewId.rows[0].id,
            created_at: new Date().toISOString(),
            payload: newRoute
        } )
    }catch (err) {
        console.log(err)
        res.status(500)
    }finally{
        dbClient.release()
    }
})


routeController.get('/', async (req, res) => {
    try {
        const dbClient = await pool.connect()
        const query = 'SELECT * FROM routes ORDER BY id DESC'
        const result = await dbClient.query(query)
        dbClient.release()
        return res.json(
            {
                total: result.rowCount,
                routes: result.rows
            }
        )
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

export default routeController
