import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [order] = await db.select().from(repairOrders).where(eq(repairOrders.id, parseInt(id)));
  return NextResponse.json(order || { error: "Not found" }, { status: order ? 200 : 404 });
}