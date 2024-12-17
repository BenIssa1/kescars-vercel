import { BrokerageCompanySchema, LoginSchema, RegisterSchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const AccountDefaultValues: DefaultValues<z.infer<typeof RegisterSchema>> = {
  name: "",
  email: "",
  password: "",
  brokerageCompanyId: ""
}

export const LoginDefaultValues: DefaultValues<z.infer<typeof LoginSchema>> = {
  email: "",
  password: "",
}

