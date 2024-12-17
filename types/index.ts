import { SearchSchema } from "@/schemas";
import { Declarant, Status } from "@prisma/client";
import * as z from "zod";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export enum Role {
  ADMIN = "Administrateur",
  USER = "Courtier",
  FIRST_AIDERS = "Secouristes",
  CARE_CENTER = "Centre de prise en charge",
}

// ############### gestion de donnees ###################
export type Bringers = {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  terminate: boolean;
};

// export type TypeOfContrat = {
//   value: string;
//   label: string;
// };

export type Beneficiary = {
  id?: number;
  fullName: string;
  createdAt: Date;
  percentage: number;
}

export type TypeOfContrat = {
  id: string;
  name: string;
  prime: number;
  specs: {
    deathCapital: number;
    individualCapital: number;
    medicalExpenses: number;
    dailyCosts: number;
  };
  isCustom?: boolean;
}


export type TypecustomSpecs = {
  deathCapital: number;
  individualCapital: number;
  medicalExpenses: number;
  dailyCosts: number;
}

// ############### Centre de santé ###################

export type Patient = {
  id: string;
  identifier: string;
  firstName: string;
  lastName: string;
  avatar: string;
  birthday: Date;
  bloodGroup: string;
  urgentNumber: string;
  status: Status;
  professionalActivity: string
  /* coverageType: string;
  lastVisit?: string; */
}

export type TypeTreatment = {
  id: string
  pickupDate: Date
  pickupLocation: string
  supportCenter: string
  report: string
  declarant: Declarant,
  createdAt: Date
  insuredId: string,
  insured: {
    avatar: string,
    firstName: string,
    lastName: string
  }
}

export type FirstAiderTreatment = {
  id: string
  pickupDate: Date
  pickupLocation: string
  supportCenter: string
  report: string
  declarant: Declarant,
  createdAt: Date
  insuredId: string,
  insured: {
    avatar: string,
    firstName: string,
    lastName: string
  }
}

export type HealthcareTreatment = FirstAiderTreatment