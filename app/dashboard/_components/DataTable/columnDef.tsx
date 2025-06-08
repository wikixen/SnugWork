import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SortHeader } from "./tableHeader";
import { ColumnDef } from "@tanstack/react-table";
import { JobApp } from "@/lib/data/models";
import { MoreHorizontal } from "lucide-react";
import DeleteDialog from "./deleteDialog";
import EditDialog from "./editDialog";

// This is to define the columns in the data table
export const columns: ColumnDef<JobApp>[] = [
  {
    accessorKey: "company",
    header: ({ column }) => <SortHeader column={column}>Company</SortHeader>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => <SortHeader column={column}>Position</SortHeader>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortHeader column={column}>Location</SortHeader>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "appStatus",
    header: ({ column }) => <SortHeader column={column}>Status</SortHeader>,
    cell: ({ row }) => {
      const status = row.getValue("appStatus");

      switch (status) {
        case "Applied":
          return (
            <div className="bg-[#4f46e5] rounded-xl text-center py-1">
              {status}
            </div>
          );
        case "Interview":
          return (
            <div className="bg-[#f59e0b] rounded-xl text-center py-1">
              {status}
            </div>
          );
        case "Offer":
          return (
            <div className="bg-[#10b981] rounded-xl text-center py-1">
              {status}
            </div>
          );
        case "Rejected":
          return (
            <div className="bg-[#ef4444] rounded-xl text-center py-1">
              {status}
            </div>
          );
      }
    },
  },
  {
    accessorKey: "notes",
    header: () => <div className="font-bold">Notes</div>,
    cell: ({ row }) => (
      <ScrollArea className="capitalize w-50 py-4">
        {row.getValue("notes")}
        <ScrollBar orientation="horizontal" className="border" />
      </ScrollArea>
    ),
  },
  {
    accessorKey: "dateApplied",
    header: ({ column }) => (
      <SortHeader column={column}>Date Applied</SortHeader>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("dateApplied") as Date).toLocaleDateString("en-US", {
          timeZone: "UTC",
        })}
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
];
