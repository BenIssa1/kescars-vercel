import { db } from "../lib/db"
import {unstable_noStore as noStore} from "next/cache"

const ITEMS_PER_PAGE = 7

export async function fetchFilteredCompanies(query: string, currentPage: number) {
    const offset = ( currentPage - 1 ) * ITEMS_PER_PAGE

    try {
        return await db.company.findMany({
            where: {
                OR: [
                    {id: {contains: query, mode: "insensitive"}},
                    {name: {contains: query, mode: "insensitive"}},
                    {phone: {contains: query, mode: "insensitive"}},
                    {email: {contains: query, mode: "insensitive"}},
                    {address: {contains: query, mode: "insensitive"}},
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: ITEMS_PER_PAGE,
            skip: offset
        })
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch companies.")
    }
}

export async function fetchAllCompanies(brokerageCompanyId: string | undefined) {
    noStore()

    try {
        return await db.company.findMany({
            where: {
                brokerageCompanyId
            }
        })
    } catch (error) {
        console.error("Databse Error: ", error)
        throw new Error("Failed to fetch companies data.")
    }
}

export async function fetchCompaniesPages(query: string) {
    noStore()

    try {
        const count = await db.company.count({
            where: {
                OR: [
                    {id: {contains: query, mode: "insensitive"}},
                    {name: {contains: query, mode: "insensitive"}},
                    {phone: {contains: query, mode: "insensitive"}},
                    {email: {contains: query, mode: "insensitive"}},
                    {address: {contains: query, mode: "insensitive"}}
                ]
            }
        })

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
        return totalPages

    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of companies.')
    }
}

export async function fetchCompanyById(id: string) {
    noStore()

    try {
        const company = await db.company.findUnique({
            where: {
                id: id 
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                phone: true,
                email: true,
                address: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!company) {
            throw new Error("Company not found")
        }

        return {
            ...company
        }
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch company.")
    }
}