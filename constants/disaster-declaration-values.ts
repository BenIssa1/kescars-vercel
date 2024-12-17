import { DisasterDeclarationSchema, TreatmentSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const DisasterDeclarationDefaultValues: DefaultValues<z.infer<typeof DisasterDeclarationSchema>> = {
  disasterDate: new Date(),
  disasterPlace: '',
  hospitalCenter: '',
  accidentReport: '',
  insuredId: ''
} 

export const TreatmentDefaultValues: DefaultValues<z.infer<typeof TreatmentSchema>> = {
  pickupDate: new Date(),
  pickupLocation: '',
  supportCenter: '',
  report: '',
  insuredId: ''
} 