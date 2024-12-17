import { LoginSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";


export const LoginDefaultValues: DefaultValues<z.infer<typeof LoginSchema>> = {
    email: '',
    password: ''
}