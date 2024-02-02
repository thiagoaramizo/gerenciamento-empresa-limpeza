"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Route, RoutePayload } from "packages/web/src/models/route-model";
import { Button } from "../../../ui/button";
import CopyCell from "../copy-cell";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { CaretUpDown, DotsThree } from "@phosphor-icons/react";

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
        cell: ({ row }) => <span className="font-medium"> Rota {row.getValue("id")}</span>
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
      cell: ({ row }) => <span className="font-medium">{row.getValue("created_at")}</span>
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
          const totalDistance = payload.distances.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          )

          return <span>{`${totalDistance.toFixed(2)} pontos`} </span>;
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
