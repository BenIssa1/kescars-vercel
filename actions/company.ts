'use server'

import * as z from 'zod'
import { db } from "../lib/db"
import { revalidatePath } from "next/cache"
import { CompanySchema } from '@/schemas'


export async function createCompany(values: z.infer<typeof CompanySchema>) {

    const parsedResult = CompanySchema.safeParse(values)
    if (!parsedResult.success)
        return { error: "Champs invalide." }

    const {
        name = '',
        avatar = '',
        address = '',
        phone = '',
        email = '',
        brokerageCompanyId,
    } = parsedResult.data

    const createdAt = new Date().toISOString()

    try {
        await db.company.create({
            data: {
                name,
                avatar,
                address,
                phone,
                email,
                createdAt,
                brokerageCompanyId
            }
        })
    } catch (error) {
        console.error('Error creating Company: ', error)
        return { error: "Erreur lors de la création de la companie."}
    }

    revalidatePath('/company')

    return { success: true }
}

export async function updateCompany(id: string, values: z.infer<typeof CompanySchema>) {

    const parsedResult = CompanySchema.safeParse(values)
    if (!parsedResult.success)
        return { error: "Champs invalide" }

    const {
        name = '',
        avatar = '',
        address = '',
        phone = '',
        email = '',
    } = parsedResult.data

    await db.company.update({
        where: {
            id: id
        },
        data: {
            name,
            avatar,
            address,
            phone,
            email
        }
    })

    revalidatePath('/company')
    return { success: true }
}

export async function deleteCompany(id: string) {
    await db.company.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/company')
    return { success: true }
}