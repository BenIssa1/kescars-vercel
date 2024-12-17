"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Company } from "@prisma/client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface companyButtonModalProps {
  company: Company;
}

export const CompanyButtonModal = ({ company }: companyButtonModalProps) => {
  const [open, setOpen] = React.useState(false);
  const companyDatas: Company[] = [company]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Badge className="bg-primary/80 flex gap-1 cursor-pointer">
          <div>Compagnie</div>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-[1220px] overflow-hidden" align="end">
        <DataTable columns={columns} data={companyDatas || []} />
      </PopoverContent>
    </Popover>
  );
};
