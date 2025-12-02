import Link from "next/link";
import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { RepairOrderCard } from "@/components/ui/RepairOrderCard";
import { ClipboardList, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const orders = await db.select().from(repairOrders).orderBy(desc(repairOrders.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl">
            <ClipboardList className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ordens de Serviço</h1>
            <p className="text-slate-500 text-sm">Gerencie e acompanhe todas as solicitações.</p>
          </div>
        </div>
        <Link 
          href="/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nova Ordem
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <ClipboardList className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma ordem encontrada</h3>
            <p className="text-slate-400 max-w-sm mt-2">Parece que está tudo tranquilo por aqui. Crie uma nova ordem para começar.</p>
          </div>
        ) : (
          orders.map((order) => (
            <RepairOrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}



