'use client'

import { RepairOrder } from "@/db/schema";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";
import { deleteRepairOrder } from "@/actions/repair-order/delete";
import { formatDate } from "@/lib/utils";
import { MapPin, Calendar, AlertTriangle, Edit2, Trash2, } from "lucide-react";

export function RepairOrderCard({ order }: { order: RepairOrder }) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Tem certeza que deseja excluir esta ordem?")) {
      await deleteRepairOrder(order.id);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
      
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1 max-w-[70%]">
          <h3 className="font-bold text-slate-800 text-lg leading-tight truncate group-hover:text-blue-600 transition-colors">
            {order.title}
          </h3>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">#{order.id.toString().padStart(4, '0')}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed h-10">
        {order.description}
      </p>

      <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="truncate">{order.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{formatDate(order.dueDate)}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md
            ${order.priority === 'URGENT' ? 'bg-red-50 text-red-600' : 
              order.priority === 'HIGH' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
            <AlertTriangle className="h-3 w-3" />
            {order.priority}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <Link 
          href={`/edit/${order.id}`} 
          className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-blue-200"
        >
          <Edit2 className="h-4 w-4" />
          Editar
        </Link>
        <button 
          onClick={handleDelete}
          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Excluir"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}



