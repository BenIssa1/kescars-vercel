'use server'

import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { BringerSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createBringer(values: z.infer<typeof BringerSchema>) { 

    const parsedResult = BringerSchema.safeParse(values)
    if (!parsedResult.success)
        return { error: "Champs invalide. "}


    const {
        avatar = '',
        firstName = '',
        lastName = '',
        phone = '',
        email = '',
        terminate = false,
        brokerageCompanyId
    } = parsedResult.data
    
    const createdAt = new Date().toISOString()

    try {
        await db.bringer.create({
            data: {
                avatar,
                firstName,
                lastName,
                phone,
                email,
                terminate,
                createdAt,
                brokerageCompanyId
            }
        })
    } catch (error) {
        console.error('Error creating Bringer: ', error)
        return { error: "Erreur lors de la création de l'apporteur." }
    }

    revalidatePath('/bringer')

    return { success: true }
}

export async function updateBringer(id: string, values: z.infer<typeof BringerSchema>) {

    const parsedResult = BringerSchema.safeParse(values)
    if (!parsedResult.success)
        return { error: "Champs invalide."}

    const {
        firstName = '',
        lastName = '',
        phone = '',
        email = '',
        terminate = false
    } = parsedResult.data

    await db.bringer.update({
        where: {
            id: id
        },
        data: {
            firstName,
            lastName,
            phone,
            email,
            terminate
        }
    })

    revalidatePath('/bringer')
    return { success: true }
} 

export async function deleteBringer(id: string) {


    await db.bringer.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/bringer')
    return { success: true }
}