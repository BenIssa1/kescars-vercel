"use client";

import { getInsuredByIdentifier } from "@/actions/insured";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { SearchSchema } from "@/schemas";
import { Patient } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Insured } from "@prisma/client";

export type SearchFormData = z.infer<typeof SearchSchema>;

interface SearchFormProps {
  onPatientFound: (patient: Insured | null) => void;
}

export function SearchForm({ onPatientFound }: SearchFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);

    try {
      const insured = await getInsuredByIdentifier(data.id);

      if (insured) {
        onPatientFound(insured);
      } else {
        onPatientFound(null);
        toast({
          variant: "destructive",
          title: "Assuré non trouvé",
          description: "Aucun assuré trouvé avec cet identifiant.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
    >
      <div className="space-y-2">
        <Label>{"Identifiant de l'assuré"}</Label>
        <div className="relative">
          <Input
            id="id"
            placeholder="Ex: INS123456789"
            {...register("id")}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        {errors.id && (
          <p className="text-sm text-destructive">{errors.id.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Recherche en cours..." : "Rechercher"}
      </Button>
    </form>
  );
}
