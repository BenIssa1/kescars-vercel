import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Beneficiary } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<Beneficiary>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nom du Bénéficiaire" />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
            <span>{row.original.fullName}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Part en %" />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left flex items-center gap-3 font-medium">
          <div className="text-left font-medium inline-block whitespace-nowrap pr-7">
            <span>{row.original.percentage}</span>
          </div>
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
];
