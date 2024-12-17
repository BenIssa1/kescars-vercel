import { CompanySchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const CompanyDefaultValues: DefaultValues<z.infer<typeof CompanySchema>> = {
    name: '',
    avatar: '',
    address: '',
    phone: '',
    email: '',
    brokerageCompanyId: '',
} 