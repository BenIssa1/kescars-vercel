"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            console.log("first");
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          }
          className="max-w-sm"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
      </div>
    </div>
  );
}