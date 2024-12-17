'use server'

import * as z from 'zod'
import { DisasterDeclarationSchema } from "@/schemas"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createDisasterDeclaration(values: z.infer<typeof DisasterDeclarationSchema>) {
    const parsedResult = DisasterDeclarationSchema.safeParse(values)
    if (!parsedResult.success)
        return { error: "Champs invalide." }

    const {
        disasterDate = '',
        disasterPlace = '',
        hospitalCenter = '',
        accidentReport = '',
        insuredId = ''
    } = parsedResult.data


    const createdAt = new Date().toISOString()
    const disaster_date = new Date(disasterDate).toISOString()

    /* try {
        await db.statement.create({
            data: {
                disasterDate: disaster_date,
                disasterPlace,
                hospitalCenter,
                accidentReport,

                createdAt: createdAt,
                insuredId
            }
        })
        revalidatePath("/treatment")
        return { success: true, message: "Le sinistre a été enregistrer avec succes"}
    } catch (error) {
        console.error("Erreur dans la creation de la declaration du sinistre", error)
        
        if (error instanceof Error) {
            return { success: false, message: error.message}
        } else {
            return { success: false, message: String(error) }
        }
    } */
}