import { db } from "../lib/db"
import {unstable_noStore as noStore} from "next/cache"

export async function fetchAllBrokerageCompany() {
    noStore()

    try {
        return await db.brokerageCompany.findMany()
    } catch (error) {
        console.error("Databse Error: ", error)
        throw new Error("Failed to fetch users data.")
    }
}