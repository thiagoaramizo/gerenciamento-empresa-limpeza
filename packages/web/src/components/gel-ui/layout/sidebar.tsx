import { HouseSimple, Path, UsersThree } from "@phosphor-icons/react";
import Footer from "./footer";
import SidebarItem from "./sideber-item";

export default function Sidebar() {
    return (
        <nav className={`bg-slate-300 flex flex-col items-start justify-between pt-8 pb-4`}>
            <div className="flex flex-col uppercase text-slate-600 w-full divide-y divide-black/5">
                <SidebarItem name="Início" href={"/"} >
                    <HouseSimple size={20} weight="bold"/>
                </SidebarItem>

                <SidebarItem name="Clientes" href={"/clients"} >
                    <UsersThree size={20} weight="bold"/>
                </SidebarItem>

                <SidebarItem name="Rotas" href={"/routes"} >
                    <Path size={20} weight="bold"/>
                </SidebarItem>
            </div>

            <Footer />
        </nav>
    );
}
