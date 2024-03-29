import Client from "../models/client-model";
import { Route } from "../models/route-model";
import api from "./api";

export interface GetApiResponse {
    total: number,
    routes: Route[]
}

export interface GenericApiResponse {
    message: string,
}

export async function getRoutes(): Promise< GetApiResponse | undefined>  {
    try {
        const response = await api.get( '/route')
        const total = response.data.total
        const routes = response.data.routes.map( (route: { id: number; created_at: string; payload: string; }) => {
            const convertedRoute = {
                id: route.id,
                created_at: route.created_at,
                payload: JSON.parse( route.payload )
            }
            return convertedRoute
        })
        return {
            total,
            routes
        }

    } catch (err) {
    }
}

export async function createRouteOfAllClients(): Promise<Route | undefined>  {
    try {
        const response = await api.get( '/route/new')
        if (response.status == 201) {
            return response.data as Route
        }
    } catch (err) {
    }
}

export async function createRoute(clients: Client[]): Promise<Route | undefined> {
    try {
        const response = await api.post( '/route/new', clients)
        if (response.status == 201) {
            return response.data as Route
        }
    } catch (err) {
    }
}