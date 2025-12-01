'use server'

import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { repairOrderSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string;
} | null;

export async function createRepairOrder(prevState: ActionState, formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
    status: "OPEN", // Default
  };

  const validatedFields = repairOrderSchema.safeParse(rawData);


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro ao validar os campos. Verifique os dados.",
    };
  }

  try {
    await db.insert(repairOrders).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Erro de banco de dados: Falha ao criar ordem.",
    };
  }


  revalidatePath("/");
  redirect("/");
}