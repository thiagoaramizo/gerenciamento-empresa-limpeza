'use-client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import AppConteiner from '../../components/gel-ui/app-container'
import PageTitle from '../../components/gel-ui/page-title'

export default function Clients() {

    const [apiResponse, setApiResponse] = useState()

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
            <p>{JSON.stringify( apiResponse )}</p>
        </AppConteiner>
    )
}