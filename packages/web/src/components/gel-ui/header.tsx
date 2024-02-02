import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import HeaderSearchForm from "./header-search-form";

export default function Header() {
    return (
        <header className="w-full h-[96px] bg-slate-200/75 px-6 flex items-center justify-between">
            <div> 
                <Link href={'/'}>
                    <Image src={'logo.svg'} width={190} height={38} alt="Gerenciamento Empresa Limpeza" />    
                </Link>
            </div>
            <div className="flex items-center justify-end gap-6">
                <HeaderSearchForm />          
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-200/90">
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuItem>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}