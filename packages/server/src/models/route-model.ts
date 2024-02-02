import Client from './client-model'

export interface Route {
    id?: number
    created_at?: string
    payload: RoutePayload | string
}

export interface RoutePayload {
    clients: Client[]
    distances: number[]
}