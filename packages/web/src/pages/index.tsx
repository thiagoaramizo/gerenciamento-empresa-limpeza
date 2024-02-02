import Head from "next/head";
import AppConteiner from "../components/gel-ui/layout/app-container";
import PageTitle from "../components/gel-ui/typography/page-title";

export default function Home() {
  return (
    <>
      <Head>
        <title>ERP Limpeza - Gerenciamento para empresa de limpeza</title>
      </Head>
      <AppConteiner>
        <PageTitle>Página inicial</PageTitle>
      </AppConteiner>
    </>
  )
}
