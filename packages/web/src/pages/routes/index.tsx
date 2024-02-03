import Head from "next/head";
import AppConteiner from "../../components/gel-ui/layout/app-container";
import PageTitle from "../../components/gel-ui/typography/page-title";
import { useState, useEffect } from "react";
import { GetApiResponse, createRouteOfAllClients, getRoutes } from "../../services/routes";
import { DataTable } from "../../components/gel-ui/tables/route-data-table/data-table";
import { columns } from "../../components/gel-ui/tables/route-data-table/columns";
import { Route } from "../../models/route-model";
import RouteDialogView from "../../components/gel-ui/route-dialog-view";
import { Button } from "../../components/ui/button";
import { Path } from "@phosphor-icons/react";
import Loader from "../../components/gel-ui/loader";


export default function Routes() {

  const [apiResponse, setApiResponse] = useState<GetApiResponse>()
  const [route, setRoute] = useState<Route>()

    useEffect( () => {
        getRoutes().then(
            (response) => setApiResponse(response)
        )
    }, [])

    const handleCreateNewRoute = () => {
      createRouteOfAllClients().then(
        (response) => { 
          setRoute(response)
        })
    }

  return (
    <>
      <Head>
        <title>Rotas - ERP Limpeza</title>
      </Head>
      <AppConteiner>
        <div className='w-full flex items-start justify-between'>
          <PageTitle>Rotas</PageTitle>

          <RouteDialogView route={route}>
            <div
              className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-4" 
              onClick={handleCreateNewRoute}
            >
              <Path size={24}/>
              Nova rota geral
            </div>
          </RouteDialogView>

        </div>

        <div className='pt-8'>
            {apiResponse?.routes ? <DataTable columns={columns} data={apiResponse.routes}/> : 
            <Loader message="Carregando as rotas..."/>
            }
        </div>

      </AppConteiner>
    </>
    
  )
}
