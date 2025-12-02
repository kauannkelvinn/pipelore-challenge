import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RepairOrderForm } from "@/components/ui/RepairOrderForm";
import Link from "next/link";

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id);
  
  if (isNaN(orderId)) return notFound();
  
  const [order] = await db.select().from(repairOrders).where(eq(repairOrders.id, orderId));
  if (!order) return notFound();

  return (
    <main className="container mx-auto py-10 px-4 max-w-2xl">
      <Link href="/" className="text-gray-500 mb-4 block">← Voltar</Link>
      <h1 className="text-2xl font-bold mb-6">Editar Ordem #{orderId}</h1>
      <RepairOrderForm initialData={order} />
    </main>
  );
}