import { HouseSimple, Path, UsersThree } from "@phosphor-icons/react";
import Footer from "./footer";
import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="bg-slate-300/60 flex flex-col items-start justify-between pt-8 pb-4 px-6">
            <div className="flex flex-col gap-4 uppercase text-slate-600 w-full divide-y divide-slate-400/30">
                <Link href={"/"} className="w-full flex gap-3 items-center group">
                    <HouseSimple size={24} weight="bold" className="text-primary"/>
                    <span className="group-hover:text-primary transition-colors">Início</span>
                </Link>

                <Link href={"/clients"} className="w-full flex gap-3 pt-4 items-center group">
                    <UsersThree size={24} weight="bold" className="text-primary"/>
                    <span className="group-hover:text-primary transition-colors">Clientes</span>
                </Link>

                <Link href={"/routes"} className="w-full flex gap-3 pt-4 items-center group">
                    <Path size={24} weight="bold" className="text-primary"/>
                    <span className="group-hover:text-primary transition-colors">Rotas</span>
                </Link>
            </div>

            <Footer />
        </nav>
    );
}
