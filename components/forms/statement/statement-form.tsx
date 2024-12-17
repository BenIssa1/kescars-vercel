"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomFormField from "@/components/custom-form-field";
import { Form } from "@/components/ui/form";
import { useEdgeStore } from "@/lib/edgestore";

import { createDisasterDeclaration } from "@/actions/disaster-declaration";
import { SubmitButton } from "@/components/submit-button";
import { DisasterDeclarationDefaultValues } from "@/constants/disaster-declaration-values";
import {
  DisasterDeclarationFormSchema,
  DisasterDeclarationSchema,
} from "@/schemas";
import { FormFieldType } from "@/types";
import { toast } from "react-toastify";

export const StatmentRegistrationForm = ({
  setOpen,
  insuredId,
}: {
  setOpen?: (open: boolean) => void;
  insuredId: string;
}) => {
  //################ EDGESTORE #######################
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  //################ EDGESTORE #######################

  

  const [isLoading, setIsLoading] = React.useState(false);
  // const [error, setError] = React.useState<string | undefined>('')
  // const [success, setSuccess] = React.useState<string | undefined>('')

  const form = useForm<z.infer<typeof DisasterDeclarationFormSchema>>({
    resolver: zodResolver(DisasterDeclarationFormSchema),
    defaultValues: DisasterDeclarationDefaultValues,
  });

  const handleSubmit = async (
    values: z.infer<typeof DisasterDeclarationSchema>
  ) => {
    values.insuredId = insuredId;
    setIsLoading(true);

    /* const response = await createDisasterDeclaration(values);

    if (response.success) {
      if (setOpen) {
        setOpen(false);
      }
      form.reset();

      toast.success("Prise en charge enregistrée avec succès✅️", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      toast.info(
        <div className="space-y-2 text-sm p-4 mt-2">
          <p>
            <span className="font-semibold">Date du sinistre:</span>{" "}
            {values.disasterDate.toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Lieu:</span> {values.disasterPlace}
          </p>
          <p>
            <span className="font-semibold">Centre de prise en charge:</span>{" "}
            {values.hospitalCenter}
          </p>
          <p>
            <span className="font-semibold">Rapport:</span>{" "}
            {values.accidentReport}
          </p>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
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
    } */
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
            name="disasterDate"
            label="Date et Heure de prise en charge"
            showTimeSelect
            placeholder=""
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="disasterPlace"
            label="Lieu de prise en charge"
            placeholder="Angre"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hospitalCenter"
            label="Centre de prise en charge"
            placeholder="CHU Angre"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="accidentReport"
          label="Rapport"
          placeholder="Rapport de l'accident"
        />

        <SubmitButton
          onClick={async () => {}}
          isPending={isLoading}
          loaderLabel="Enregistrement..."
        >
          Enregistrer
        </SubmitButton>
      </form>
    </Form>
  );
};
