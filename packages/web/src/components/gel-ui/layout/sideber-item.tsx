import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

interface SidebarItemInterface extends LinkProps {
    name: string
    children: ReactNode
}


export default function SidebarItem( {name, children, href}: SidebarItemInterface) {
    return (
        <Link href={href} className="w-full flex gap-3 px-5 py-4 items-center group hover:bg-primary/10 transition-colors duration-300">
            <span className="text-primary">{children}</span>
            <span className="group-hover:text-primary transition-colors ">{name}</span>
        </Link>
    )
}