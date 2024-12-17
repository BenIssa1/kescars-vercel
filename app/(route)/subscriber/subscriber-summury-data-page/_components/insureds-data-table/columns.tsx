"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Insured } from "@prisma/client";
import { formatDateTime } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Insured>[] = [
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
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div>{row.original.avatar}</div>
          <div className="flex items-center gap-2">
            <span>{row.original.firstName}</span>
            <span>{row.original.lastName}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "identifier",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Identrifiant" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left  font-medium">{row.original.identifier}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Adresse" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left  font-medium">{row.original.address}</div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telephone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left  font-medium">{row.original.phoneNumber}</div>
      );
    },
  },
  {
    accessorKey: "urgentNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telephone Urgent" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.urgentNumber}</div>
      );
    },
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Anniversaire" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {formatDateTime(row.original.birthday).dateTime}
        </div>
      );
    },
  },
  {
    accessorKey: "placeOfBirth",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de Naissance" />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.placeOfBirth}</div>
      );
    },
  },
  {
    accessorKey: "professionalActivity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profession" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.original.professionalActivity}
        </div>
      );
    },
  },
  {
    accessorKey: "bloodGroup",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Groupe sanguin" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.bloodGroup}</div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ville" />;
    },
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.original.city}</div>;
    },
  },
  {
    accessorKey: "prefecture",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Commune" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.prefecture}</div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Creer le " />;
    },
    cell: ({ row }) => {
      return <div>{formatDateTime(row.original.createdAt).dateTime}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
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
