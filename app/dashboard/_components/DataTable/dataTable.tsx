"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobApp } from "@/lib/data/models";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import DeleteDialog from "./deleteDialog";
import EditDialog from "./editDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<JobApp>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => <></>,
  },
  {
    accessorKey: "userId",
    header: "",
    cell: () => <></>,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Postion",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "appStatus",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("appStatus")}</div>,
  },
  {
    accessorKey: "dateApplied",
    header: "Applied On",
    cell: ({ row }) => (
      <div>
        {(row.getValue("dateApplied") as Date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-semibold">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <EditDialog row={row} />
          <DeleteDialog row={row.getValue("id")} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable({ data }: { data: JobApp[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
            : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
