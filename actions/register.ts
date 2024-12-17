"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { revalidatePath } from "next/cache"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  } 

  const {email, password, name, brokerageCompanyId, image} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: "Email already in use!"}
  }

  await db.user.create({
    data: {
      name,
      email,
      image,
      password: hashedPassword,
      brokerageCompanyId
    }
  });
  revalidatePath('/account');
  return {success: "User created!"};
}