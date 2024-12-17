import { ResetSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";


export const ResetEmailDefaultValues: DefaultValues<z.infer<typeof ResetSchema>> = {
    email: '',
}