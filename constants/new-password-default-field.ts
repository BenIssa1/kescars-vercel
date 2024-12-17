import { NewPasswordSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";


export const NewPasswordDefaultValues: DefaultValues<z.infer<typeof NewPasswordSchema>> = {
    password: ''
}