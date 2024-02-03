import { Buildings, CaretDoubleDown, MapPin, Path, Ruler, User } from "@phosphor-icons/react";
import { Route, RoutePayload } from "../../models/route-model";
import { formatDistance, getRouteTotalDistance } from "../../lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface RouteViewProps {
    route: Route 
}

export default function RouteView( {route}: RouteViewProps) {

    const { clients, distances } = route.payload as RoutePayload

    return (
        <>
        <div className="flex items-end justify-between">
            <h1 className="text-primary text-2xl font-bold">Rota {route.id}</h1>
            <div className="flex items-center gap-1 text-sm">
                <Ruler size={16}/>
                <span>Total { formatDistance( getRouteTotalDistance( distances ) ) }</span>
            </div>
            
        </div>

        <ScrollArea className="max-h-[400px] w-full rounded-md border p-4">
        
        <div className="flex items-center gap-3 pb-3">
            <div className="text-primary w-[32px] h-[32px] bg-primary/30 flex items-center justify-center rounded-full">
                <Buildings size={20}/>
            </div>
            
            <span>Partindo da empresa</span>
        </div>

        {
            clients.map( (client, index) =>  (
                <div key={client.id} className="flex flex-col gap-3">
                    <div className="flex items-center gap-5 text-slate-400 pl-2">
                        <CaretDoubleDown size={16} className=""/>
                        <span className="text-xs">Delocamento de { formatDistance( distances[index] ) }</span>
                    </div>
                    <div className="flex items-center gap-3 pb-3">
                        <div className="text-primary w-[32px] h-[32px] bg-primary/30 flex items-center justify-center rounded-full">
                            <User size={20} />
                        </div>
                        <div>
                            <span className="font-semibold">{client.name}</span>
                            <span className="flex gap-0.5 items-center text-xs font-bold text-slate-400"><MapPin size={12} weight="fill"/>({client.lon}, {client.lat})</span>
                        </div>
                    </div>
                </div>

                )
            )
        }

        </ScrollArea>


        </>
    )
}