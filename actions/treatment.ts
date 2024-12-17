'use server'

import * as z from 'zod'
import { TreatmentSchema } from "@/schemas"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createTreatment(values: z.infer<typeof TreatmentSchema>) {
  const parsedResult = TreatmentSchema.safeParse(values)
  if (!parsedResult.success)
    return { error: "Champs invalide." }

  const {
    pickupDate = '',
    pickupLocation = '',
    supportCenter = '',
    report = '',
    insuredId = '',
    declarant,
  } = parsedResult.data


  const createdAt = new Date().toISOString()
  const pickup_date = new Date(pickupDate).toISOString()

  try {
    await db.treatment.create({
      data: {
        pickupDate: pickup_date,
        pickupLocation,
        supportCenter,
        report,
        declarant,
        createdAt: createdAt,
        insuredId
      }
    })
    revalidatePath("/treatment")
    return { success: true, message: "Le sinistre a été enregistrer avec succes" }
  } catch (error) {
    console.error("Erreur dans la creation de la declaration du sinistre", error)

    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: String(error) }
    }
  }
}