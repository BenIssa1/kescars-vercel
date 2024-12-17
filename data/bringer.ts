import { db } from "../lib/db"
import {unstable_noStore as noStore} from "next/cache"


export async function fetchBringerById(id: string) {
    noStore()

    try {
        const bringer = await db.bringer.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                avatar: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                terminate: true, 
                createdAt: true,
                updatedAt: true
            }
        })

        if (!bringer) {
            throw new Error("Bringer not found")
        }

        return {
            ...bringer
        }
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch bringer.")
    }
}

const ITEMS_PER_PAGE = 7 

export async function fetchFilteredBringers(query: string, currentPage: number) {
    const offset = ( currentPage - 1 ) * ITEMS_PER_PAGE
    noStore()

    try {
        return await db.bringer.findMany({
            where: {
                OR: [
                    {id: {contains: query, mode: "insensitive"}},
                    {avatar: {contains: query, mode: 'insensitive'}},
                    {firstName: {contains: query, mode: "insensitive"}},
                    {lastName: {contains: query, mode: "insensitive"}},
                    {phone: {contains: query, mode: "insensitive"}},
                    {email: {contains: query, mode: "insensitive"}},
                    {terminate: {equals: query === "true"}}
                ]
            },
            orderBy: {
                createdAt: "desc" 
            },
            take: ITEMS_PER_PAGE,
            skip: offset
        })
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch bringer.")
    }
}

export async function fetchBringersPages(query: string) {
    noStore()

    try {
        const count = await db.bringer.count({
            where: {
                OR: [
                    {id: {contains: query, mode: "insensitive"}},
                    {firstName: {contains: query, mode: "insensitive"}},
                    {lastName: {contains: query, mode: "insensitive"}},
                    {phone: {contains: query, mode: "insensitive"}},
                    {email: {contains: query, mode: "insensitive"}},
                    {terminate: {equals: query === "true"}}
                ]
            }
        })

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
        return totalPages

    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of bringers.')
    }
}

export async function fetchAllBringers(brokerageCompanyId: string | undefined) {
    noStore()

    try {
        return await db.bringer.findMany({
            where: {
                brokerageCompanyId
            }
        })
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error("Failed to fetch bringers data.");
    }
} 