import { Spinner } from "@phosphor-icons/react"

interface LoaderProps {
    message: string
}

export default function Loader ( {message}:LoaderProps) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center font-semibold min-h-[400px] w-full">
            <Spinner size={32} className="animate-spin text-primary" />
            {message}
        </div>
    )
}