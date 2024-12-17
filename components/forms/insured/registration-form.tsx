"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { createInsured } from "@/actions/insured";
import CustomFormField from "@/components/custom-form-field";
import { SingleImageDropzone } from "@/components/edgestore/single-image-dropzone";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { bloodGroups, statusOptions, typeOfContrat } from "@/constants";
import { InsuredDefaultValues } from "@/constants/insured-default-values";
import { useEdgeStore } from "@/lib/edgestore";
import { InsuredSchema } from "@/schemas";
import { Beneficiary, FormFieldType } from "@/types";
import { Company, Subscriber } from "@prisma/client";
import { TiUserAddOutline, TiUserDelete } from "react-icons/ti";
import { PlusCircle } from "lucide-react";
import { AddBeneficiaryForm } from "@/components/forms/insured/beneficiary/add-beneficiary-form";
import { BeneficiaryList } from "@/components/forms/insured/beneficiary/beneficiary-list";
import TypeOfContractSelect from "./type-of-contract-select";
import { useCurrentUser } from '@/hooks/use-current-user'

interface Props {
  setOpen: (open: boolean) => void;
  subscribers: Subscriber[];
  companies: Company[];
}

export const InsuredRegistrationForm: React.FC<Props> = ({
  setOpen,
  subscribers,
  companies,
}) => {
  //################ EDGESTORE #######################
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState(0);
  const { edgestore } = useEdgeStore();
  //################ EDGESTORE #######################

  //################ BENEFICIARY #######################
  const [showForm, setShowForm] = React.useState(false);
  const [beneficiaries, setBeneficiaries] = React.useState<Beneficiary[]>([])
  const [subscriberSelected, setSubscriberSelected] = React.useState<Subscriber>()

  const handleAddBeneficiary = (beneficiary: Beneficiary) => {
    setBeneficiaries([...beneficiaries, { ...beneficiary, id: Date.now() }])
    setShowForm(false)
  };

  const handleDeleteBeneficiary = (id: number) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id))
  }
  //################ BENEFICIARY #######################

  const [isLoading, setIsLoading] = React.useState(false);
 
  const user = useCurrentUser()

  const form = useForm<z.infer<typeof InsuredSchema>>({
    resolver: zodResolver(InsuredSchema),
    defaultValues: InsuredDefaultValues,
  });

  const handleSubmit = async (values: z.infer<typeof InsuredSchema>) => {
    setIsLoading(true);
    values.beneficiaries = beneficiaries;
    values.prime = customSpecs;

    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      values.avatar = res.url;
    }

    values.brokerageCompanyId = user?.brokerageCompanyId
    const response = await createInsured(values);

    if (response.success) {
      if (setOpen) {
        setOpen(false);
      }
      form.reset();

      toast.success("Assurrer bien enregistrer");
    } else {
      setIsLoading(false);
      toast.error("Echec de l'enregistrement");
    }
  };

  const [customSpecs, setCustomSpecs] = React.useState({
    deathCapital: 0,
    individualCapital: 0,
    medicalExpenses: 0,
    dailyCosts: 0,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 flex-1 mt-6 h-[520px] overflow-scroll remove-scrollbar p-2 w-[500px]"
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center font-bold text-xl bg-primary text-primary-foreground rounded-full">
            1
          </div>
          <h1 className="font-bold text-2xl text-primary">
            Information assuree
          </h1>
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="companyId"
          label="Compagnie d'assurance"
          placeholder="Choisir un souscripteur"
        >
          {companies?.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              <div className=" shad-select-whit-avatar">
                <div className="relative w-9 h-9  aspect-square">
                  <Image
                    src={company.avatar || ""}
                    fill
                    alt={company.name}
                    className="rounded-full bg-cover border border-primary"
                  />
                </div>

                <p>{company.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="subscriberId"
          label="Souscripteur"
          placeholder="Choisir un souscripteur"
          onChange={(value) => {
            const souscripteurItem = subscribers.find((element) => element.id == value);
            setSubscriberSelected(souscripteurItem);
          }}
        >
          {subscribers?.map((subscriber) => (
            <SelectItem key={subscriber.id} value={subscriber.id}>
              <div className=" shad-select-whit-avatar">
                <div className="relative w-9 h-9  aspect-square">
                  <Image
                    src={subscriber.avatar || ""}
                    fill
                    alt={subscriber.subscriberFullName}
                    className="rounded-full bg-cover border border-primary"
                  />
                </div>

                <p>{subscriber.subscriberFullName}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="firstName"
            label="Nom"
            placeholder="Ex: Doe"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastName"
            label="Prenom"
            placeholder="Ex: John"
          />
        </div>
        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthday"
            label="Aniversaire"
            placeholder="Ex: "
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="placeOfBirth"
            label="Lieu de naissance"
            placeholder="Ex: Abobo"
          />
        </div>

        <div className="flex flex-col items-center gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Ex: exemple@email.com"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="bloodGroup"
            label="Groupe sanguin"
            placeholder="Choisir un groupe"
          >
            {bloodGroups?.map((group) => (
              <SelectItem key={group.label} value={group.value}>
                <p>{group.label}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="professionalActivity"
            label="Activite professionnel"
            placeholder="Ex: Developpeur web"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phoneNumber"
            label="Telephone"
            placeholder="Ex: "
          />
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="urgentNumber"
            label="Telephone en cas d'urgence"
            placeholder="Ex: "
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Adresse"
            placeholder="Ex: Abidjan"
          />
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="city"
            label="Ville"
            placeholder="Ex: Abidjan"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="prefecture"
            label="Commune"
            placeholder="Ex: Abobo"
          />
        </div>

        <div className="flex items-center gap-3 py-5">
          <div className="w-9 h-9 flex items-center justify-center font-bold text-xl bg-primary text-primary-foreground rounded-full">
            2
          </div>
          <h1 className="font-bold text-2xl text-primary">
            Detail de la Police
          </h1>
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="policyNumber"
            label="Num de police"
            placeholder="Ex: 0123456789"
          />
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="paiementMode"
            label="Mode de paiement"
            placeholder="Ex: Cheque"
          />

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="effectiveDate"
            label="Date de validite"
            placeholder="Ex: "
          />
        </div>

        <div className="flex items-center flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="expirationDate"
            label="Date d'expiration"
            placeholder="Ex: "
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="status"
            label="Statut"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-primary p-3"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />

                      <Label
                        htmlFor={option.value}
                        className="cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>




        {/* Type de contrat */}

        {subscriberSelected && (
          <>
            <div className="flex items-center -mb-2 gap-3 py-5">
              <div className="w-9 h-9 flex items-center justify-center font-bold text-xl bg-primary text-primary-foreground rounded-full">
                3
              </div>
              <h1 className="font-bold text-2xl text-primary">Type de contrat</h1>
            </div>

            <TypeOfContractSelect
              prime={subscriberSelected.prime}
              customSpecs={customSpecs}
              setCustomSpecs={setCustomSpecs} />
          </>

        )}

        {/* Type de contrat */}


        {/* beneficiaires */}
        <div className="">
          <Button
            className="gap-2"
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="w-5 h-5" />
            {showForm ? "Masquer le formulaire" : "Ajouter un bénéficiaire"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
            {/* <h2>Ajouter un bénéficiaire</h2> */}
            <AddBeneficiaryForm onSuccess={handleAddBeneficiary} />
          </div>
        )}

        <BeneficiaryList beneficiaries={beneficiaries} onDelete={handleDeleteBeneficiary} />
        {/* beneficiaires */}

        {/* avatar profile */}
        <div className="w-full flex items-center justify-center">
          <SingleImageDropzone
            id="avatar"
            name="avatar"
            width={500}
            height={200}
            value={file}
            className="bg-white"
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>

        <div className="py-8">
          <SubmitButton
            onClick={async () => {
              if (file) {
                return await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
              }
            }}
            isPending={isLoading}
            loaderLabel="Enregistrement..."
            className=""
          >
            Enregistrer
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};