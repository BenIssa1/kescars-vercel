'use client'

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { declarantLabels } from "@/constants";
import { FirstAiderTreatment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FirstAiderTreatment>[] = [
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
    accessorKey: "nameOfClaimant",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom du sinistrer" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div>
            <Avatar>
              <AvatarImage src={row.original.insured.avatar} />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
            <span>{row.original.insured.lastName}</span>
          </div>
        </div> 
      );
    },
  },

  {
    accessorKey: "pickupDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de pise en charge" />
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("pickupDate"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "pickupLocation",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Lieu de la pise en charge"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <span>{row.original.pickupLocation}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "supportCenter",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Centre de la prise en charge"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
          <span>{row.original.supportCenter}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Creer le " />
      )
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
];
