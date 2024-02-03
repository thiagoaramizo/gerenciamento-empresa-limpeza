import { ReactNode } from "react";
import { Route } from "../../models/route-model";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import RouteView from "./route-view";
import { Spinner } from "@phosphor-icons/react";
import Loader from "./loader";

interface RouteDialogViewProps {
    children: ReactNode
    route: Route | undefined
}

export default function RouteDialogView( {route, children}: RouteDialogViewProps) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                {route ? <RouteView route={route} /> : <Loader message="Calculando a rota..."/>}
            </DialogContent>
        </Dialog>
    );
}
