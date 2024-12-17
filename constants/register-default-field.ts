import { RegisterSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";


export const RegisterDefaultValues: DefaultValues<z.infer<typeof RegisterSchema>> = {
    name: '',
    email: '',
    password: ''
}