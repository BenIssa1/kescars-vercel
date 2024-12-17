"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Percent, Trash2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Beneficiary } from "@/types";

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  onDelete: (id: number) => void;
}

export function BeneficiaryList({ beneficiaries, onDelete }: BeneficiaryListProps) {
  if (beneficiaries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {"Aucun bénéficiaire n'a été ajouté"}
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4">
        {beneficiaries.map((beneficiary) => (
          <Card key={beneficiary.id} className="relative group min-w-[300px]">
            <CardContent className="pt-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => beneficiary.id && onDelete(beneficiary.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <User2 className="h-5 w-5 text-primary/80" />
                  {beneficiary.fullName}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(beneficiary.createdAt, "dd MMMM yyyy", { locale: fr })}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4" />
                  <span>{beneficiary.percentage}% des parts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}