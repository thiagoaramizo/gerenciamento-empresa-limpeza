import Head from "next/head";
import AppConteiner from "../../components/gel-ui/layout/app-container";
import PageTitle from "../../components/gel-ui/typography/page-title";
import { useState, useEffect } from "react";
import { GetApiResponse, getRoutes } from "../../services/routes";
import { DataTable } from "../../components/gel-ui/tables/route-data-table/data-table";
import { columns } from "../../components/gel-ui/tables/route-data-table/columns";


export default function Routes() {

  const [apiResponse, setApiResponse] = useState<GetApiResponse>()

    useEffect( () => {
        getRoutes().then(
            (response) => setApiResponse(response)
        )
    }, [])

  return (
    <>
      <Head>
        <title>Rotas - ERP Limpeza</title>
      </Head>
      <AppConteiner>
        <PageTitle>Rotas</PageTitle>

        <div className='pt-8'>
            {apiResponse?.routes && <DataTable columns={columns} data={apiResponse.routes}/>}
        </div>

      </AppConteiner>
    </>
    
  )
}
