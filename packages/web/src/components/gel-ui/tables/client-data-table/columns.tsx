"use client";

import { ColumnDef } from "@tanstack/react-table";
import Client from "packages/web/src/models/client-model";
import { Button } from "../../../ui/button";
import { phoneMask } from "packages/web/src/lib/utils";
import CopyCell from "../copy-cell";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { CaretUpDown, DotsThree } from "@phosphor-icons/react";
import { Checkbox } from "../../../ui/checkbox";

export const columns: ColumnDef<Client>[] = [
    {
      // Selects para marcar os clientes
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="shadow-none"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-slate-300 shadow-none"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({column}) => (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-primary">Nome</span>
            <CaretUpDown size={24} className="ml-2 h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
    },
    {
        accessorKey: "email",
        header: () => <div className="text-primary">E-mail</div>,
        cell: ({ row }) => {
            return <CopyCell value={row.getValue("email")} />;
        },
    },
    {
        accessorKey: "phone",
        header: () => <div className="text-primary">Telefone</div>,
        cell: ({ row }) => {
            const phoneFormated = phoneMask(row.getValue("phone"));
            return (
                <CopyCell
                    value={row.getValue("phone")}
                    formatedValue={phoneFormated}
                />
            );
        },
    },
    {
        accessorKey: "location",
        header: () => <div className="text-primary">Localização</div>,
        cell: ({ row }) => {
            return `${ row.original.lon.toFixed(2) } , ${ row.original.lat.toFixed(2) }`;
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
