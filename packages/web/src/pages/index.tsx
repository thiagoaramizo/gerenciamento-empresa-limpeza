import Head from "next/head";
import AppConteiner from "../components/gel-ui/layout/app-container";
import PageTitle from "../components/gel-ui/typography/page-title";
import HomeLink from "../components/gel-ui/home-link";
import { Path, UsersThree } from "@phosphor-icons/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>ERP Limpeza - Gerenciamento para empresa de limpeza</title>
      </Head>
      <AppConteiner>
        <PageTitle>Página inicial</PageTitle>

        <div className="flex w-full gap-4 mt-8">
          <HomeLink href="/clients" className="bg-primary/80">
              <UsersThree size={60} weight="thin" />
              <span>Meus clientes</span>
          </HomeLink>

          <HomeLink href="/routes" className="bg-primary/65">
              <Path size={60} weight="thin" />
              <span>Minhas rotas</span>
          </HomeLink>
        </div>
        

      </AppConteiner>
    </>
  )
}
