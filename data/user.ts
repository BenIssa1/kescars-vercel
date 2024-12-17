import { db } from "../lib/db"
import { UserRole } from "@prisma/client"
import {unstable_noStore as noStore} from "next/cache"

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })

        return user
    } catch (error) {
        return null
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id } })

        return user 
    } catch (error) {
        return null
    }
}

export const getUserRole = async (role: UserRole) => {
    try {
        const userRole = await db.user.findFirst({ where: { role }})

        return userRole
    } catch (error) {
        return null
    }
}

export async function fetchAllUsers(brokerageCompanyId: string | undefined, userId: string | undefined) {
    noStore()
    

    try {
        return await db.user.findMany({
            where: {
                brokerageCompanyId,
                NOT: {
                    id: userId
                }
            }
        })
    } catch (error) {
        console.error("Databse Error: ", error)
        throw new Error("Failed to fetch users data.")
    }
}