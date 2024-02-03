import Head from "next/head";
import AppConteiner from "../../components/gel-ui/layout/app-container";
import PageTitle from "../../components/gel-ui/typography/page-title";
import { useState, useEffect } from "react";
import { GetApiResponse, getNewRoutesOfAllClients, getRoutes } from "../../services/routes";
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
      getNewRoutesOfAllClients().then(
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
            <Button size={"lg"} className="text-md flex gap-2 items-center px-6" onClick={handleCreateNewRoute}>
              <Path size={24}/>
              Nova rota
            </Button>
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
