'use server'

import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { repairOrderSchema } from "@/lib/validations/repair-order.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateRepairOrder(id: number, prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = repairOrderSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Erro de validação.",
    };
  }

  await db
    .update(repairOrders)
    .set({ ...validated.data, updatedAt: new Date() })
    .where(eq(repairOrders.id, id));

  revalidatePath("/");
  redirect("/");
}