import * as z from 'zod'
import { SubscriberSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";

export const  SubscriberDefaultValues: DefaultValues<z.infer<typeof SubscriberSchema>> = {
    subscriberFullName: '',
    avatar: '',
    prime: '',
    address: '',
    phoneNumber: '',
    email: '',
    taxpayer: '',
    fieldOfActivity: '',
    bringerId: '',
    brokerageCompanyId: '',
}