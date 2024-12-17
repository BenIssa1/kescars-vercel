import { z } from "zod";
import { DefaultValues } from "react-hook-form";
import { InsuredSchema } from "@/schemas";

export const InsuredDefaultValues: DefaultValues<z.infer<typeof InsuredSchema>> = {
    avatar: '',
    identifier: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    placeOfBirth: '',
    bloodGroup: '',
    professionalActivity: '',
    email: '',
    address: '',
    phoneNumber: '',
    urgentNumber: '', 
    city: '',
    prefecture: '',

    policyNumber: '',
    typeOfContrat: '',
    paiementMode: '',
    effectiveDate: new Date(),
    expirationDate: new Date(),
    brokerageCompanyId: '',
}