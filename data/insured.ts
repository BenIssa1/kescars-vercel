import { db } from "../lib/db"
import { unstable_noStore as noStore } from "next/cache"

const ITEMS_PER_PAGE = 7

export async function fetchLatestInsureds(brokerageCompanyId: string | undefined) {
    noStore()

    try {

        return await db.insured.findMany({
            where: {
                brokerageCompanyId
            },
            select: {
                id: true,
                avatar: true,
                firstName: true,
                lastName: true,
                professionalActivity: true
            },
            take: 2
        })
    } catch (error) {
        console.error(error)
        throw new Error("Error getting last Insureds")
    }
}

export async function fetchFilteredInsureds(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    try {
        return await db.insured.findMany({
            where: {
                OR: [
                    { id: { contains: query, mode: "insensitive" } },
                    { avatar: { contains: query, mode: "insensitive" } },
                    { identifier: { contains: query, mode: "insensitive" } },
                    { policyNumber: { contains: query, mode: "insensitive" } },
                    { firstName: { contains: query, mode: "insensitive" } },
                    { lastName: { contains: query, mode: "insensitive" } },
                    { placeOfBirth: { contains: query, mode: "insensitive" } },
                    { bloodGroup: { contains: query, mode: "insensitive" } },
                    { professionalActivity: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { address: { contains: query, mode: "insensitive" } },
                    { phoneNumber: { contains: query, mode: "insensitive" } },
                    { urgentNumber: { contains: query, mode: "insensitive" } },
                    { city: { contains: query, mode: "insensitive" } },
                    { prefecture: { contains: query, mode: "insensitive" } },
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
        throw new Error("Failed to fetch insureds.")
    }
}

export async function fetchAllInsureds(brokerageCompanyId: string | undefined) {
    noStore()

    try {
        return await db.insured.findMany({
            where: {
                brokerageCompanyId
            },
            include: {
                beneficiaries: true,
                subscriber: true,
                company: true
            }
        })
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch insureds data.")
    }
}

export async function fetchInsuredsPage(query: string) {
    noStore()

    try {
        const count = await db.insured.count({
            where: {
                OR: [
                    { id: { contains: query, mode: "insensitive" } },
                    { avatar: { contains: query, mode: "insensitive" } },
                    { identifier: { contains: query, mode: "insensitive" } },
                    { firstName: { contains: query, mode: "insensitive" } },
                    { lastName: { contains: query, mode: "insensitive" } },
                    { placeOfBirth: { contains: query, mode: "insensitive" } },
                    { bloodGroup: { contains: query, mode: "insensitive" } },
                    { professionalActivity: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { address: { contains: query, mode: "insensitive" } },
                    { phoneNumber: { contains: query, mode: "insensitive" } },
                    { urgentNumber: { contains: query, mode: "insensitive" } },
                    { city: { contains: query, mode: "insensitive" } },
                    { prefecture: { contains: query, mode: "insensitive" } },
                ]
            }
        })

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
        return totalPages

    } catch (error) {
        console.error("Data Error: ", error)
        throw new Error('Failed to fetch total number of insured.')
    }
}

export async function fetchInsuredById(id: string) {
    noStore()

    try {
        const insured = await db.insured.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                avatar: true,
                identifier: true,
                firstName: true,
                lastName: true,
                birthday: true,
                placeOfBirth: true,
                bloodGroup: true,
                professionalActivity: true,
                email: true,
                address: true,
                phoneNumber: true,
                urgentNumber: true,
                city: true,
                prefecture: true,
                subscriber: true,
                company: true,
                policyNumber: true,
                typeOfContrat: true,
                paiementMode: true,
                effectiveDate: true,
                expirationDate: true,
                subscriberId: true,
                companyId: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!insured) {
            throw new Error("Insured not found")
        }

        return {
            ...insured
        }
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch insured.")
    }
}
