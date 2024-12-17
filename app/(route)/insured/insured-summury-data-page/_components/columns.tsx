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
import { statusColors, statusOptionsLabel } from "@/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Insured, Prisma } from "@prisma/client";
import Image from "next/image";
import { BeneficiariesButtonModal } from "./beneficiaries-data-table/button-modal";
import { CompanyButtonModal } from "./company/button-modal";
import { SubscribersButtonModal } from "./subscriber-data-table/button-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type InsuredType =  Prisma.InsuredGetPayload<{
  include: {
    beneficiaries: true,
    company: true,
    subscriber: true
  }
}>

export const columns: ColumnDef<InsuredType>[] = [
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
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-900">
            <Image
              src={row.original.avatar || ""}
              alt="profile"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-row items-center gap-2 inline-block whitespace-nowrap pr-7">
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.identifier}
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
    accessorKey: "urgentNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telephone Urgent" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.urgentNumber}
        </div>
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.placeOfBirth}
        </div>
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
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
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.bloodGroup}
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ville" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.city}
        </div>
      );
    },
  },
  {
    accessorKey: "prefecture",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Commune" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.prefecture}
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
    accessorKey: "beneficiairesTable",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Bénéficiaire" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <BeneficiariesButtonModal beneficiaries={row.original?.beneficiaries} />
        </div>
      );
    },
  },

  {
    accessorKey: "policyNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="N de la Polique" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.policyNumber}
        </div>
      );
    },
  },

  {
    accessorKey: "paiementMode",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Mode de paiement" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {row.original.paiementMode}
        </div>
      );
    },
  },

  {
    accessorKey: "effectiveDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date d'effet" />;
    },
    cell: ({ row }) => {
      const effectiveDate = row.original.effectiveDate
        ? formatDateTime(row.original.effectiveDate).dateTime
        : "N/A";
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {effectiveDate}
        </div>
      );
    },
  },

  {
    accessorKey: "expirationDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date d'expiration" />
      );
    },
    cell: ({ row }) => {
      const expirationDate = row.original.expirationDate
        ? formatDateTime(row.original.expirationDate).dateTime
        : "N/A";
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          {expirationDate}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Statut" />;
    },
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "text-left font-medium text-sm inline-block whitespace-nowrap pr-7",
            statusColors[row.original.status]
          )}
        >
          {statusOptionsLabel[row.original.status]}
        </div>
      );
    },
  },

  {
    accessorKey: "subscriberTable",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Souscripteur" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <SubscribersButtonModal subscriber={row.original?.subscriber} />
        </div>
      );
    },
  },

  {
    accessorKey: "companyTable",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Compagnie" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <CompanyButtonModal company={row.original?.company} />
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
