"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleLabels } from "@/constants";
import { User } from "@prisma/client";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div className="relative w-10 h-10 bg-cover rounded-full bg-gradient-to-br from-purple-300 to-purple-900">
            <Image
              src={row.original.image || "/svg/User.svg"}
              alt="profile"
              fill
              className="object-cover rounded-full bg-gradient-to-br from-purple-300 to-purple-900"
            />
          </div>
          <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
            <span>{row.original.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.email}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
         {/*  {roleLabels[row.original.role] || row.original.role} */}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      /* const payment = row.original */

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            /*  onClick={() => navigator.clipboard.writeText(payment.id)} */
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
