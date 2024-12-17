import { db } from "@/lib/db";
import {unstable_noStore as noStore} from "next/cache"


export async function fetchAllTreatments() {
    noStore()
    
    try {
        return await db.treatment.findMany({select: {
            id: true,
            pickupDate: true,
            pickupLocation: true,
            report: true,
            createdAt: true,
            supportCenter: true,
            declarant: true,
            insuredId: true,
            insured: {
                select: {
                    avatar: true,
                    firstName: true,
                    lastName: true
                }
            }
        }})
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}

export async function getFirstAidersTreatementByDeclarant() {
    noStore()
    try {
        return await db.treatment.findMany({
            where: {
                declarant: 'FIRST_AIDERS',
            },
            select: {
                id: true,
                pickupDate: true,
                pickupLocation: true,
                report: true,
                declarant: true,
                createdAt: true,
                supportCenter: true,
                insuredId: true,
                insured: {
                    select: {
                        avatar: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        
    } catch (error) {
        console.error('Error lors de la recuperation des traitements: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}

export async function getHealthcareTreatementByDeclarant() {
    noStore()
    try {
        return await db.treatment.findMany({
            where: {
                declarant: 'HEALTH_CENTER',
            },
            select: {
                id: true,
                pickupDate: true,
                pickupLocation: true,
                report: true,
                declarant: true,
                createdAt: true,
                supportCenter: true,
                insuredId: true,
                insured: {
                    select: {
                        avatar: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        
    } catch (error) {
        console.error('Error lors de la recuperation des traitements: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}