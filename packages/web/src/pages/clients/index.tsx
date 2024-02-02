'use-client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import AppConteiner from '../../components/gel-ui/layout/app-container'
import PageTitle from '../../components/gel-ui/typography/page-title'
import Client from '../../models/client-model'
import { DataTable } from '../../components/gel-ui/tables/client-data-table/data-table'
import { columns } from '../../components/gel-ui/tables/client-data-table/columns'
import Head from 'next/head'


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
        <>
        <Head>
            <title>Clientes - ERP Limpeza</title>
        </Head>
        <AppConteiner>
            <PageTitle>Clientes</PageTitle>
            <div className='pt-6'>
                {apiResponse?.clients && <DataTable columns={columns} data={apiResponse.clients}/>}
            </div>
            
        </AppConteiner>
        </>
        
    )
}