'use-client'

import Head from 'next/head'
import AppConteiner from '../../components/gel-ui/layout/app-container'
import PageTitle from '../../components/gel-ui/typography/page-title'

export default function RegisterClient() {
    return (
        <>
            <Head>
                <title>Registrar cliente - ERP Limpeza</title>
            </Head>
            <AppConteiner>
                <PageTitle>Registro de cliente</PageTitle>
            </AppConteiner>
        </>
        
    )
}
