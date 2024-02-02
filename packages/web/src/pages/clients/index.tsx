'use-client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import AppConteiner from '../../components/gel-ui/app-container'
import PageTitle from '../../components/gel-ui/page-title'
import Client from '../../models/client-model'
import { DataTable } from '../../components/gel-ui/client-data-table/data-table'
import { columns } from '../../components/gel-ui/client-data-table/columns'


interface ApiResponse {
    total: number,
    clients: Client[]
}

export default function Clients() {

    const [apiResponse, setApiResponse] = useState<ApiResponse>()

    useEffect( () => {
        axios.get( 'http://localhost:3333/client')
            .then( (response) => {
                setApiResponse( response.data )
            }).catch( (err) => {
            })
    }, [])

    return (
        <AppConteiner>
            <PageTitle>Clientes</PageTitle>
            <div className='pt-6'>
                {apiResponse?.clients && <DataTable columns={columns} data={apiResponse.clients}/>}
            </div>
            
        </AppConteiner>
    )
}