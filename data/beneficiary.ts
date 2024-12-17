import { db } from "@/lib/db"
import {unstable_noStore as noStore} from "next/cache"


export async function fetchAllBeneficiaries() {
    noStore()

    try{
        return await db.beneficiary.findMany()
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch beneficiaries data.')
    }
}