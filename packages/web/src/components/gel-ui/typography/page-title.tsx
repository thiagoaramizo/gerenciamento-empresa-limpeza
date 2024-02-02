import { ReactNode } from "react"

interface PageTitleInterface {
    children: ReactNode
}

export default function PageTitle( {children}: PageTitleInterface) {
    return (
        <h1 className="text-xl lg:text-2xl xl:text-3xl text-primary font-bold uppercase">
            {children}
        </h1>
    )
}