'use server'

import * as z from 'zod'
import { db } from "../lib/db"
import { revalidatePath } from "next/cache"
import { BeneficiarySchema, InsuredSchema } from '@/schemas'
import { Beneficiary } from '@prisma/client'


export async function createInsured(values: z.infer<typeof InsuredSchema>) {
    const parsedResult = InsuredSchema.safeParse(values)
    if (!parsedResult.success)
        return { error: 'Champs invalide.' }

    const {
        avatar = "",
        identifier = "",
        firstName = "",
        lastName = "",
        birthday = new Date(),
        placeOfBirth = "",
        bloodGroup = "",
        professionalActivity = "",
        email = "",
        address = "",
        phoneNumber = "",
        urgentNumber = "",
        city = "",
        prefecture = "",

        policyNumber = "",
        paiementMode = "",
        effectiveDate = "",
        expirationDate = "",
        status,

        typeOfContrat = "",
        beneficiaries = [],
        prime,

        subscriberId = "",
        companyId = "",
        brokerageCompanyId,
    } = parsedResult.data

    const createdAt = new Date().toISOString()
    const birthDate = birthday ? new Date(birthday).toISOString() : null
    const effective_date = effectiveDate ? new Date(effectiveDate).toISOString() : null
    const expiration_date = expirationDate ? new Date(expirationDate).toISOString() : null

    try {
        await db.insured.create({
            data: {
                avatar,
                identifier,
                firstName,
                lastName,
                birthday: birthDate ? new Date(birthDate).toISOString() : new Date(0).toISOString(),
                placeOfBirth,
                bloodGroup,
                professionalActivity,
                email,
                address,
                phoneNumber,
                urgentNumber,
                city,
                prefecture,

                policyNumber,
                paiementMode,
                effectiveDate: effective_date,
                expirationDate: expiration_date,
                status: status,

                typeOfContrat,
                beneficiaries: {
                    create: beneficiaries.map((beneficiary) => ({
                        fullName: beneficiary.fullName,
                        percentage: beneficiary.percentage,
                        createdAt: createdAt,
                        updatedAt: createdAt
                    }))
                },
               /*  prime: {
                    create: {
                        dailyCosts: prime?.dailyCosts,
                        deathCapital: prime.deathCapital,
                        individualCapital: prime.individualCapital,
                        medicalExpenses: prime.medicalExpenses,
                        createdAt: createdAt,
                        updatedAt: createdAt
                    }
                }, */

                subscriberId,
                companyId,
                brokerageCompanyId,
            }
        })

        console.log("L'assuré a été créé avec succès");
        revalidatePath('/insured')
        return { success: true, message: "L'assuré a été créé avec succès" }

    } catch (error) {
        console.error("Erreur dans la création de l'assuré:", error);

        // Ajout d'une vérification de type pour l'erreur
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: String(error) };
        }
    }
}

export async function updateInsured(id: string, values: z.infer<typeof InsuredSchema>) {
    const parseResult = InsuredSchema.safeParse(values);
    if (!parseResult.success) return { error: 'Champs invalide.' };

    const {
        avatar = "",
        identifier = "",
        firstName = "",
        lastName = "",
        birthday = "",
        placeOfBirth = "",
        bloodGroup = "",
        professionalActivity = "",
        email = "",
        address = "",
        phoneNumber = "",
        urgentNumber = "",
        city = "",
        prefecture = "",
        policyNumber = "",
        paiementMode = "",
        effectiveDate = "",
        expirationDate = "",
        status,
        typeOfContrat = "",
        beneficiaries = [],
        subscriberId = "",
        companyId = ""
    } = parseResult.data;

    const birthDate = birthday ? new Date(birthday).toISOString() : null;
    const effective_date = effectiveDate ? new Date(effectiveDate).toISOString() : null;
    const expiration_date = expirationDate ? new Date(expirationDate).toISOString() : null;

    try {
        await db.insured.update({
            where: { id },
            data: {
                avatar,
                identifier,
                firstName,
                lastName,
                birthday: birthDate || new Date(0).toISOString(),
                placeOfBirth,
                bloodGroup,
                professionalActivity,
                email,
                address,
                phoneNumber,
                urgentNumber,
                city,
                prefecture,
                policyNumber,
                paiementMode,
                effectiveDate: effective_date,
                expirationDate: expiration_date,
                status: status,
                typeOfContrat,
                subscriberId,
                companyId,
                beneficiaries: {
                    deleteMany: {},
                    create: beneficiaries.map(beneficiary => ({
                        fullName: beneficiary.fullName,
                        percentage: beneficiary.percentage,
                    }))
                }
            }
        });

        revalidatePath('/insured');
        return {
            success: true,
            message: "L'assuré a été modifié avec succès"
        };

    } catch (error) {
        console.error("Erreur dans la mise à jour de l'assuré:", error);

        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: String(error) };
        }
    }
}

export const getInsuredByIdentifier = async (identifier: string) => {
    try {
        const insured = await db.insured.findFirst({
            where: { identifier: identifier }
        });

        return insured;
    } catch (error) {
        return null
    }
}