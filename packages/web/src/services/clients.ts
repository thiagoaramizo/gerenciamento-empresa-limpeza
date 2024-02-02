import Client from "../models/client-model";
import api from "./api";

export interface GetApiResponse {
    total: number,
    clients: Client[]
}

export interface GenericApiResponse {
    message: string,
}

export async function getClients(): Promise<GetApiResponse | undefined>  {
    const response = await api.get( '/client')
    return response.data as GetApiResponse
}

export async function postClient( client: Client ): Promise<GenericApiResponse | undefined>  {
    const response = await api.post( '/client', client)
    return response.data as GenericApiResponse
}
