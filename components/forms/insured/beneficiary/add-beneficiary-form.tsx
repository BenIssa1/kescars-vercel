'use client'

import { Beneficiary } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  createdAt: z.date({
    required_error: "La date de naissance est requise",
  }),
  percentage: z
    .number()
    .min(1, "La part doit être supérieure à 0")
    .max(100, "La part ne peut pas dépasser 100%"),
});

type AddBeneficiaryFormProps = {
  onSuccess: (beneficiary: Beneficiary) => void;
};

export function AddBeneficiaryForm({ onSuccess }: AddBeneficiaryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",      
      percentage: 100,
    },
  });

  function handleSubmit() {
    const values = form.getValues();
    if (form.formState.isValid) {
      onSuccess(values);
      form.reset();
    }
  }


  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess(values);
    form.reset();
  }

  return (
    <Form {...form}>
        <div className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>JJ/MM/AAAA</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Part (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="100" 
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="button" className="mt-8" onClick={handleSubmit}>
            Ajouter
          </Button>
        </div>
    </Form>
  )
}
