import { db } from "@/lib/db"
import {unstable_noStore as noStore} from "next/cache"

export async function fetchCardData() { 
    noStore()
    
    try {
        const results = await Promise.all([
            db.subscriber.count(),
            db.insured.count(),
            db.treatment.count()
        ])

        console.log("Data fetch complete")
        console.log(results)

        return {
            subscriberCount: results[0],
            insuredCount: results[1],
            statementCount: results[2]
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error getting Card Data")
    }

}