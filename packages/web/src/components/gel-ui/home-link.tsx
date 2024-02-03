import Link from "next/link"
import { ReactNode } from "react"


interface HomeLinkProps {
    href: string
    children: ReactNode
    className: string
}

export default function HomeLink ({href, children, className}: HomeLinkProps) {
    return (
        <Link href={href}
            className={`flex flex-col items-start px-4 pt-12 pb-4 min-w-[250px] max-w-[300px] rounded-md text-lg font-semibold text-white transition-colors ease-in duration-300 hover:bg-primary  ${className}`}
        >
            {children}
        </Link>
    )
}

