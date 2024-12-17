'use server'

import { db } from "../lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { DefaultValues } from "react-hook-form"
import { SubscriberSchema } from "@/schemas"



export async function createSubscriber(values: z.infer<typeof SubscriberSchema>) {

    const parseResult = SubscriberSchema.safeParse(values)
    if (!parseResult.success)
        return { error: 'Champs invalides. ' }

    const {
        avatar = '',
        prime = '',
        subscriberFullName = '',
        taxpayer = '',
        fieldOfActivity = '', 
        address = '',
        email = '',
        phoneNumber = '',
        bringerId = '',
        brokerageCompanyId
    } = parseResult.data

    const createdAt = new Date().toISOString() 

    try { 
        await db.subscriber.create({
            data: {
                avatar,
                prime,
                subscriberFullName,
                taxpayer,
                fieldOfActivity,
                address, 
                email,
                phoneNumber,
                createdAt,
                bringerId,
                brokerageCompanyId
            }
        })
        console.log('Subscriber created')
    
    } catch (error) {
        console.error('Error creating Subscriber: ', error)
    }

    revalidatePath('/subscribers')

    return { success: true }
}

export async function updateSubscriber(id: string, values: z.infer<typeof SubscriberSchema>) {
    const parseResult = SubscriberSchema.safeParse(values)
    if (!parseResult.success)
        return { error: 'Champs invalides.' }

    const {
        avatar = '',
        prime = '',
        subscriberFullName = '',
        taxpayer = '',
        fieldOfActivity = '',
        address = '',
        email = '',
        phoneNumber = '',
        bringerId = ""
    } = parseResult.data

    await db.subscriber.update({
        where: {
            id: id
        },
        data: {
            avatar,
            prime,
            subscriberFullName,
            taxpayer,
            fieldOfActivity,
            address,
            email,
            phoneNumber,
            bringerId
        }
    })

    revalidatePath('/subscriber')
    return { 
        success: true, 
        SuccessMessage: 'Le souscripteur a été modifié ',
        ErrorMessage: "Le souscripteur n'a pas été modifié"
    }
}

