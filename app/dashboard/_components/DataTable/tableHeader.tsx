import { Button } from "@/components/ui/button"
import { JobApp } from "@/lib/data/models"
import { Column } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from "lucide-react"

interface SortHeaderProps {
  column: Column<JobApp, unknown>,
  children: string
}

export const SortHeader = ({ column, children }: SortHeaderProps) => {
  const sortIcon = () => {
    const sort = column.getIsSorted();
    if (!sort) {
      return <ArrowUpDown />
    }

    return sort === "desc" ? <ArrowDownIcon /> : <ArrowUpIcon />
  }
  return (
    <Button
      variant="ghost"
      onClick={column.getToggleSortingHandler()}
      className="cursor-pointer font-bold text-center w-full"
    >
      {children}
      {sortIcon()}
    </Button>
  )
}