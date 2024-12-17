"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomFormField from "@/components/custom-form-field";
import { Form } from "@/components/ui/form";

import { createTreatment } from "@/actions/treatment";
import { SubmitButton } from "@/components/submit-button";
import { DisasterDeclarationDefaultValues } from "@/constants/disaster-declaration-values";
import {
  TreatmentSchema,
} from "@/schemas";
import { FormFieldType } from "@/types";
import { toast } from "react-toastify";
import { Declarant } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export const TreatmentRegistrationForm = ({
  setOpen,
  insuredId,
  declarant
}: {
  setOpen?: (open: boolean) => void;
  insuredId: string;
  declarant: Declarant
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // console.log(pathname);

  const form = useForm<z.infer<typeof TreatmentSchema>>({
    resolver: zodResolver(TreatmentSchema),
    defaultValues: DisasterDeclarationDefaultValues,
  });

  const handleSubmit = async (
    values: z.infer<typeof TreatmentSchema>
  ) => {
    values.insuredId = insuredId;
    values.declarant = declarant;
    setIsLoading(true);

    const response = await createTreatment(values);

    if (response.success) {
      if (setOpen) {
        setOpen(false);
      }
      form.reset();

      toast.success("Prise en charge enregistrée avec succès!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (pathname === '/first-aid') {
        router.push("/first-aid/statment-table");
      } else if (pathname === "/health-center") {
        router.push("/health-center/statment-table");
      }

    } else {
      setIsLoading(false);
      toast.error("Echec de l'enregistrement", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 flex-1 mt-6"
      >
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="pickupDate"
            label="Date et Heure de prise en charge"
            showTimeSelect
            placeholder=""
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="pickupLocation"
            label="Lieu de prise en charge"
            placeholder="Angre"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="supportCenter"
            label="Centre de prise en charge"
            placeholder="CHU Angre"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="report"
          label="Rapport"
          placeholder="Rapport de l'accident"
        />

        <SubmitButton
          onClick={async () => { }}
          isPending={isLoading}
          loaderLabel="Enregistrement..."
        >
          Enregistrer
        </SubmitButton>
      </form>
    </Form>
  );
};
