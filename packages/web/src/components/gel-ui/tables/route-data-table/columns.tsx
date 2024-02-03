"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Route, RoutePayload } from "packages/web/src/models/route-model";
import { Button } from "../../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { CaretUpDown, DotsThree } from "@phosphor-icons/react";
import RouteDialogView from "../../route-dialog-view";
import { formatDistance, getRouteTotalDistance } from "packages/web/src/lib/utils";


export const columns: ColumnDef<Route>[] = [

    {
        accessorKey: "id",
        header: ({column}) => (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-primary">Rota</span>
            <CaretUpDown size={24} className="ml-2 h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => {
          return (
            <RouteDialogView  route={row.original}>Rota {row.original.id}</RouteDialogView>
          )
        }
    },
    {
      accessorKey: "created_at",
      header: ({column}) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-primary">Criação</span>
          <CaretUpDown size={24} className="ml-2 h-4 w-4" />
        </button>
      ),
      cell: ({ row }) => {
        const date = new Date (row.getValue("created_at"))
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          timeZone: "UTC",
        }
        const formatedDate = new Intl.DateTimeFormat('pt-BR').format(date)
        return <span className="font-medium">{formatedDate}</span>
      }
    },
    {
        id: "locations",
        header: () => <div className="text-primary">Locais</div>,
        cell: ({ row }) => {
            const payload = row.original.payload as RoutePayload
            return <span>{ `${payload.clients.length}` } </span>;
        },
    },
    {
      id: "distance",
      header: () => <div className="text-primary">Distância</div>,
      cell: ({ row }) => {

          const payload = row.original.payload as RoutePayload
          const totalDistance = formatDistance( getRouteTotalDistance( payload.distances ) )

          return <span>{totalDistance} </span>;
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-4 w-6 p-0">
                            <DotsThree size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-100">
                        <DropdownMenuItem className="cursor-not-allowed">Editar</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-not-allowed">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];
