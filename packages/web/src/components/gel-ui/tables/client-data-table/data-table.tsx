"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table"
import { Button } from "../../../ui/button"
import { useState } from "react"
import { Input } from "../../../ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../../ui/dropdown-menu"
import { CaretDown, Path } from "@phosphor-icons/react"
import { Route } from "../../../../models/route-model";
import { createRoute } from "packages/web/src/services/routes"
import Client from "packages/web/src/models/client-model"
import RouteDialogView from "../../route-dialog-view"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../../../ui/tooltip"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [route, setRoute] = useState<Route>()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  })

  const setColumnHeaders = ( id: string ) => { // To convert id to name
    switch (id) {
      case "name":
        return "Nome"
      case "email":
        return "E-mail"
      case "phone":
        return "Telefone"
      case "location":
        return "Localização"
      default:
        return ""
    }
  }
  
  const handleCreateNewRoute = () => { // Creating a route of selected clients
    if ( table.getFilteredSelectedRowModel().rows.length > 0) {
      const clients = table.getFilteredSelectedRowModel().rows.map( item => item.original )
      createRoute( clients as Client[]).then(
        (response) => { 
          setRoute(response)
        })
    }
  }
 
  return (
    <>
    <div className="flex items-center pb-4">

        <div className="flex items-center gap-4">

          {
            ( table.getFilteredSelectedRowModel().rows.length > 0 ) ?
              <RouteDialogView route={route} disabled={table.getFilteredSelectedRowModel().rows.length <= 0}>
                <div 
                onClick={handleCreateNewRoute} 
                aria-disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
                className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 bg-primary text-white hover:bg-primary/90 h-9 px-4 py-4 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" 
                >
                  <Path size={20}/>
                  Criar rota
                </div>
              </RouteDialogView>
            :
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                  <div 
                    className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 bg-primary text-white hover:bg-primary/90 h-9 px-4 py-4 opacity-50 cursor-not-allowed" 
                  >
                    <Path size={20}/>
                    Criar rota
                  </div>

                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Selecione os clientes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          }

          <Input
            placeholder="Digite o nome do cliente..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-lg shadow-none w-[240px] focus:bg-white focus:w-[360px] focus-visible:border-primary focus-visible:ring-0 transition-all duration-700"
          />
        </div>
        

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-slate-100 flex items-center gap-4">
              <CaretDown size={16} />
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    { setColumnHeaders(column.id) }
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

    </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    <div className="flex items-center">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} cliente(s) selecionado(s).
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Voltar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
      </div>
    </div>


    </>
  )
}