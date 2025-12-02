import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RepairOrderForm } from "@/components/ui/RepairOrderForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) return notFound();

  const order = await db.query.repairOrders.findFirst({
    where: eq(repairOrders.id, orderId),
  });

  if (!order) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Ordem #{orderId}</h1>
      <RepairOrderForm initialData={order} />
    </main>
  );
}