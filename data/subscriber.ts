import { db } from "../lib/db"
import { unstable_noStore as noStore } from "next/cache"

const ITEMS_PER_PAGE = 7

export async function fetchSubscribers(brokerageCompanyId: string | undefined) {
    noStore()

    try {
        return await db.subscriber.findMany({
            where: {
                brokerageCompanyId
            },
            select: {
                id: true,
                subscriberFullName: true,
                avatar: true
            }

        })
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch subscribers.")
    }
}

export async function fetchFilteredSubscribers(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        return await db.subscriber.findMany({
            where: {
                OR: [
                    { id: { contains: query, mode: "insensitive" } },
                    { subscriberFullName: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { phoneNumber: { contains: query, mode: "insensitive" } },
                    { fieldOfActivity: { contains: query, mode: "insensitive" } },
                    { address: { contains: query, mode: "insensitive" } },
                    { taxpayer: { contains: query, mode: "insensitive" } },
                    { avatar: { contains: query, mode: "insensitive" } }
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
        throw new Error("Failed to fetch subscribers.")
    }
}

export async function fetchAllSubscribers(brokerageCompanyId: string | undefined) {
    noStore()

    try {
        return await db.subscriber.findMany({
            where: {
                brokerageCompanyId
            }, include: {
                Insured: true,
                bringer: {
                    select: {
                        id: true,
                        avatar: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        brokerageCompanyId: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        terminate: true,
                    }
                }
            }
        })
    } catch (error) {
        console.error("Databse Error: ", error)
        throw new Error("Failed to fetch subscribers data.")
    }
}

export async function fetchSubscribersPages(query: string) {
    noStore()

    try {
        const count = await db.subscriber.count({
            where: {
                OR: [
                    { id: { contains: query, mode: "insensitive" } },
                    { subscriberFullName: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { taxpayer: { contains: query, mode: "insensitive" } },
                    { fieldOfActivity: { contains: query, mode: "insensitive" } },
                    { phoneNumber: { contains: query, mode: "insensitive" } },
                    { address: { contains: query, mode: "insensitive" } },
                    { avatar: { contains: query, mode: "insensitive" } },
                ]
            },
        })

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
        return totalPages

    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of subscriber.')
    }
}

export async function fetchSubscriberById(id: string) {
    noStore()

    try {
        const subscriber = await db.subscriber.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                subscriberFullName: true,
                email: true,
                phoneNumber: true,
                taxpayer: true,
                fieldOfActivity: true,
                address: true,
                avatar: true,
                bringerId: true,
                createdAt: true,
                updatedAt: true,
                bringer: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })

        if (!subscriber) {
            throw new Error("Subscriber not found")
        }

        return {
            ...subscriber,
        }
    } catch (error) {
        console.error("Database Error: ", error)
        throw new Error("Failed to fetch subscriber.")
    }
}

export async function fetchLatestSubscribers() {
    noStore()

    try {
        console.log("Data fetch complete")
        return await db.subscriber.findMany({
            select: {
                id: true,
                subscriberFullName: true,
                fieldOfActivity: true,
                avatar: true
            },
            take: 3,
        })


    } catch (error) {
        console.error(error)
        throw new Error("Error getting last Subscribers")
    }
}