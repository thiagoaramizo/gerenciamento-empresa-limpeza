"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Client from "packages/web/src/models/client-model"


export const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "phone",
      header: "Telefone",
    }
  ]