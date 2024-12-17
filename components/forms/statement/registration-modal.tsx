"use client";

import { CreateStatment } from "@/components/action-buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { StatmentRegistrationForm } from "./statement-form";
import { usePathname } from "next/navigation";

interface StatmentRegistrationModalFormProps {
  insuredId: string;
}

export const StatmentRegistrationModalForm = ({
  insuredId,
}: StatmentRegistrationModalFormProps) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CreateStatment />
      </DialogTrigger>
      <DialogContent className="flex items-center justify-between">
        <div className="relative h-[600px] min-w-[35%] rounded-md">
          <Image
            src={pathname === '/first-aid' ? '/png/disasterImg.png' : pathname === "/health-center" ? '/jpg/health-center.jpg' : ''}
            alt="img"
            fill
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div>
          <DialogHeader>
            <DialogTitle className="capitalize">
              {pathname === '/first-aid' ? 'Enregistrer un nouveau sinistre' : pathname === "/health-center" ? 'Enregistrer une nouvelle prise en charge' : ''}
            </DialogTitle>
            <DialogDescription>
              Renseigner les champs ci-dessous pour ajouter un nouveau sinistre
            </DialogDescription>
          </DialogHeader>

          <StatmentRegistrationForm insuredId={insuredId} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
