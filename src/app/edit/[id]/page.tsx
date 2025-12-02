import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RepairOrderForm } from "@/components/ui/RepairOrderForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) return notFound();

  const [order] = await db.select().from(repairOrders).where(eq(repairOrders.id, orderId));

  if (!order) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Editar Ordem #{orderId}</h1>
        <p className="text-slate-500 mt-1">Atualize as informações ou mude o status.</p>
      </div>

      <RepairOrderForm initialData={order} />
    </div>
  );
}