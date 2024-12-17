import { BrokerageCompanySchema } from "@/schemas";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const BrokerageCompanyDefaultValues: DefaultValues<z.infer<typeof BrokerageCompanySchema>> = {
  name: "",
  email: "",
  number: "",
}