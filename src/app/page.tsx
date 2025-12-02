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
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-blue-50 p-3 rounded-xl shrink-0">
            <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Ordens de Serviço</h1>
            <p className="text-slate-500 text-xs sm:text-sm">Gerencie suas solicitações.</p>
          </div>
        </div>
        
        <Link 
          href="/new" 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nova Ordem
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-4">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <ClipboardList className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma ordem encontrada</h3>
            <p className="text-slate-400 max-w-sm mt-2 text-sm">Parece que está tudo tranquilo por aqui. Crie uma nova ordem para começar.</p>
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