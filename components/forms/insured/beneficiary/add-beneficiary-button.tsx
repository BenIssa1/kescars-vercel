'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React from "react";
import { AddBeneficiaryForm } from "./add-beneficiary-form";

export function AddBeneficiaryButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Ajouter un bénéficiaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AddBeneficiaryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
