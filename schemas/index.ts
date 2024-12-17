import { Declarant, UserRole } from "@prisma/client";
import * as z from "zod";

const BringerFormSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  firstName: z.string().min(1, {
    message: "Veuillez entrer le nom.",
  }),
  lastName: z.string().min(1, {
    message: "Veuillez entrer le prénom",
  }),
  phone: z.string().min(1, {
    message: "Veuillez entrer le téléphone",
  }),
  email: z.string().email({
    message: "L'email est obligatoire",
  }),
  terminate: z.boolean().optional(),
  createdAt: z.string(),
  brokerageCompanyId: z.string().optional(),
});
export const BringerSchema = BringerFormSchema.omit({
  id: true,
  createdAt: true,
});

const CompanyFormSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  name: z.string().min(1, {
    message: "Veuillez entrer le nom.",
  }),
  phone: z.string().min(1, {
    message: "Veuillez entrer le téléphone",
  }),
  email: z.string().email({
    message: "L'email est obligatoire",
  }),
  address: z.string(),
  createdAt: z.string(),
  brokerageCompanyId: z.string().optional(),
});
export const CompanySchema = CompanyFormSchema.omit({
  id: true,
  createdAt: true,
});

export const BeneficiarySchema = z.object({
  id: z.number().optional(),
  fullName: z.string().min(1, {
    message: "Veuillez entrer le nom.",
  }),
  percentage: z.number().min(1, {
    message: "Veuillez entrer le pourcentage.",
  }),
  createdAt: z.date(),


  /*  updatedAt: z.date().optional(),
 insuredId: z.string(),.optional() */
});

export const PrimeSchema = z.object({
  deathCapital: z.number(),
  individualCapital: z.number(),
  medicalExpenses: z.number(),
  dailyCosts: z.number(),
}).optional();

const InsuredFormSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  identifier: z.string().optional(),
  firstName: z.string().min(2, {
    message: 'Veuillez entrer le nom.'
  }),
  lastName: z.string().min(2, {
    message: 'Veuillez entrer le prénom.'
  }),
  birthday: z.date({
    message: 'Veuillez entrer une date.'
  }),
  placeOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  professionalActivity: z.string().optional(),
  email: z.string().email({
    message: "Veuillez entrer l'email."
  }),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  urgentNumber: z.string().optional(),
  city: z.string().optional(),
  prefecture: z.string().optional(),

  policyNumber: z.string().optional(),
  paiementMode: z.string().optional(),
  effectiveDate: z.date().optional(),
  expirationDate: z.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),

  typeOfContrat: z.string().optional(),
  beneficiaries: z.array(BeneficiarySchema).optional(),
  prime: PrimeSchema,

  createdAt: z.string(),
  subscriberId: z.string(),
  companyId: z.string(),
  brokerageCompanyId: z.string().optional(),
});
export const InsuredSchema = InsuredFormSchema.omit({
  id: true,
  createdAt: true,
});

const SubscriberFormSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  prime: z.string().optional(),
  subscriberFullName: z.string().min(1, {
    message: "Le nom est obligatoire.",
  }),
  taxpayer: z.string().optional(),
  fieldOfActivity: z.string().optional(),
  address: z.string().min(1, {
    message: "L'adresse est obligatoire.",
  }),
  email: z.string().email({
    message: "L'email est obligatoire.",
  }),
  phoneNumber: z.string({
    message: "Le téléphone est obligatoire.",
  }),
  createdAt: z.string(),
  bringerId: z.string({
    message: "Selectionnez un apporteur.",
  }),
  brokerageCompanyId: z.string().optional(),
});
export const SubscriberSchema = SubscriberFormSchema.omit({
  id: true,
  createdAt: true,
});

export const DisasterDeclarationFormSchema = z.object({
  id: z.string().optional(),
  disasterDate: z.date({
    message: 'Veuillez entrer une date.'
  }),
  disasterPlace: z.string(),
  hospitalCenter: z.string(),
  accidentReport: z.string(),

  insuredId: z.string().optional(),
  createdAt: z.string().optional(),
});
export const DisasterDeclarationSchema = DisasterDeclarationFormSchema.omit({
  id: true,
  createdAt: true,
});

const TreatmentFormSchema = z.object({
  id: z.string().optional(),
  pickupDate: z.date({
    message: 'Veuillez entrer une date.'
  }),
  pickupLocation: z.string(),
  supportCenter: z.string(),
  report: z.string(),
  declarant: z.nativeEnum(Declarant).optional(),

  insuredId: z.string().optional(),
  createdAt: z.string().optional(),
});
export const TreatmentSchema = TreatmentFormSchema.omit({
  id: true,
  createdAt: true,
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Nom d'utilisateur réquis",
  }),
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(6, {
    message: "6 caractères minimun réquis",
  }),
  role: z.nativeEnum(UserRole).optional().optional(),
  image: z.string().optional(),
  brokerageCompanyId: z.string().optional(),
});

export const BrokerageCompanySchema = z.object({
  name: z.string().min(1, {
    message: "Nom de l'entreprise est réquis",
  }),
  email: z.string().email({
    message: "Email invalide",
  }),
  number: z.string(),
  image: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(1, {
    message: "Mot de passe réquis",
  }),
  code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum de 6 caractères requis.",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const SearchSchema = z.object({
  id: z
    .string()
    .min(8, "L'identifiant doit contenir au moins 8 caractères")
    .max(20, "L'identifiant ne peut pas dépasser 20 caractères"),
});
