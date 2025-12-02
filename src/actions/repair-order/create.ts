'use server'

import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { repairOrderSchema } from "@/lib/validations/repair-order.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRepairOrder(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = repairOrderSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Erro de validação.",
    };
  }

  await db.insert(repairOrders).values({
    ...validated.data,
    dueDate: validated.data.dueDate,
  });

  revalidatePath("/");
  redirect("/");
}