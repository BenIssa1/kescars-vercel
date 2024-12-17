"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { BrokerageCompanySchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { revalidatePath } from "next/cache"
import { UserRole } from "@prisma/client";


export const registerBrokerageCompany = async (values: z.infer<typeof BrokerageCompanySchema>) => {
  const validatedFields = BrokerageCompanySchema.safeParse(values);
  
  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  } 

  const {email, number, name, image} = validatedFields.data;

  const brokerageCompany = await db.brokerageCompany.create({
    data: {
      name,
      number
    }
  });

  if (!brokerageCompany) {
    return {error: "Error creating Brokerage company!"}
  }

  const hashedPassword = await bcrypt.hash("password", 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: "Email already in use!"}
  }

  await db.user.create({
    data: {
      name,
      email,
      image,
      role: UserRole.BROKERAGECOMPANY,
      password: hashedPassword,
      brokerageCompanyId: brokerageCompany.id
    }
  });
  revalidatePath('/brokerage-company');
  return { success: true }
}