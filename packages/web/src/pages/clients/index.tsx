'use-client'

import { useEffect, useState } from 'react'
import AppConteiner from '../../components/gel-ui/layout/app-container'
import PageTitle from '../../components/gel-ui/typography/page-title'
import { DataTable } from '../../components/gel-ui/tables/client-data-table/data-table'
import { columns } from '../../components/gel-ui/tables/client-data-table/columns'
import Head from 'next/head'
import Link from 'next/link'
import { GetApiResponse, getClients } from '../../services/clients'


export default function Clients() {

    const [apiResponse, setApiResponse] = useState<GetApiResponse>()

    useEffect( () => {
        getClients().then(
            (response) => setApiResponse(response)
        )
    }, [])

    return (
        <>
        <Head>
            <title>Clientes - ERP Limpeza</title>
        </Head>
        <AppConteiner>
            <div className='w-full flex items-start justify-between'>
                <PageTitle>Clientes</PageTitle>
                <Link 
                    href={'./clients/register'}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 bg-primary text-white hover:bg-primary/90 h-9 px-4 py-2"
                >
                    Novo cliente</Link>
            </div>
            
            <div className='pt-6'>
                {apiResponse?.clients && <DataTable columns={columns} data={apiResponse.clients}/>}
            </div>
            
        </AppConteiner>
        </>
        
    )
}