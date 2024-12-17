import { BringerSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const BringerDefaultValues: DefaultValues<z.infer<typeof BringerSchema>> = {
    avatar: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "", 
    terminate: false,
    brokerageCompanyId: '',
}