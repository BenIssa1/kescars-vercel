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
import { formatDateTime } from "@/lib/utils";
import { Prisma, Subscriber } from "@prisma/client";
import Image from "next/image";
import { BringersButtonModal } from "./bringers-data-table/button-modal";
import { InsuredsButtonModal } from "./insureds-data-table/button-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type SubscriberType =  Prisma.SubscriberGetPayload<{
  include: {
   Insured: true,
   bringer: true
  }
}>

export const columns: ColumnDef<SubscriberType>[] = [
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
        className="inline-block whitespace-nowrap"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subscriberFullName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nom du souscripteur" />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left items-center gap-3 font-medium flex">
          <div className="relative w-10 h-10 bg-cover rounded-full bg-gradient-to-br from-purple-300 to-purple-900">
            <Image
              src={row.original.avatar || ""}
              alt="profile"
              fill
              className="bg-cover rounded-full"
            />
          </div>
          <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
            <span>{row.original.subscriberFullName}</span>
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
    accessorKey: "taxpayer",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Num CC" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.taxpayer}
        </div>
      );
    },
  },
  {
    accessorKey: "fieldOfActivity",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Domaine d'activite" />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.fieldOfActivity}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Adresse" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.address}
        </div>
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.phoneNumber}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Creer le " />;
    },
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
  },
  {
    accessorKey: "insuredsTable",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Assurés" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <InsuredsButtonModal insured={row.original?.Insured} />
        </div>
      );
    },
  },
  {
    accessorKey: "bringersTable",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Apporteurs" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <BringersButtonModal bringer={row.original?.bringer} />
        </div>
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
