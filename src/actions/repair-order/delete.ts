'use server'

import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteRepairOrder(id: number) {
  await db.delete(repairOrders).where(eq(repairOrders.id, id));
  revalidatePath("/");
}