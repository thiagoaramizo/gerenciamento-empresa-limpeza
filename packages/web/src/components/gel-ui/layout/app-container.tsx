import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface AppConteinerInterface {
    children: ReactNode
}


export default function AppConteiner( {children}: AppConteinerInterface) {
    return (
        <>
        <div className="min-h-screen flex flex-col justify-start bg-slate-50">
            <Header/>
            <main className="grid grid-cols-layout min-h-layout">
                <Sidebar />
                <section className="py-8 px-6 xl:px-12">
                    {children}
                </section>
            </main>
        </div>
        </>
    )
}