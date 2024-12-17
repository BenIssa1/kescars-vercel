"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { Bringer } from "@prisma/client";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Bringer>[] = [
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
      return <DataTableColumnHeader column={column} title="Nom et Prenoms" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div className="relative w-10 h-10 bg-cover rounded-full bg-gradient-to-br from-purple-300 to-purple-900">
            <Image
              src={row.original.avatar || ""}
              alt="profile"
              fill
              className="bg-cover rounded-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>{row.original.firstName}</span>
            <span>{row.original.lastName}</span>
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
      return <div className="text-left font-medium">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telephone" />;
    },
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.original.phone}</div>;
    },
  },
  {
    accessorKey: "terminate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge className="bg-green-500">
          {row.original.terminate}
          Actif
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Creer le " />;
    },
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {formatDateTime(row.original.createdAt).dateDay}
        </div>
      );
    },
  },
  {
    accessorKey: "subscribers",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Souscripteurs " />;
    },
    cell: ({ row }) => {
      return (
        <Badge className="bg-primary/80 flex gap-1 cursor-pointer">
          <div className="">nbr</div>
          <Separator />
          <div>Suscripteurs</div>
        </Badge>
      );
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
