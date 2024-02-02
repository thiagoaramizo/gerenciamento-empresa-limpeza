import Client from './client-model'

export interface RoutePayload {
    id?: number
    created_at?: string
    payload: string
}

export interface Route {
    clients: Client[]
}