import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairOrders } from "@/db/schema";

export async function GET() {
  const orders = await db.select().from(repairOrders);
  return NextResponse.json(orders);
}