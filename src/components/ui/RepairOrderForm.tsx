'use client'

import { useActionState } from "react";
import { createRepairOrder } from "@/actions/repair-order/create";
import { updateRepairOrder } from "@/actions/repair-order/update";
import { RepairOrder } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function RepairOrderForm({ initialData }: { initialData?: RepairOrder }) {
  const actionFn = initialData?.id 
    ? updateRepairOrder.bind(null, initialData.id) 
    : createRepairOrder;

  const [state, action, isPending] = useActionState(actionFn, null);
  const defaultDate = initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split("T")[0] : "";

  return (
    <form action={action} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">     
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {initialData ? "Editar Ordem" : "Detalhes da Solicitação"}
          </h2>
          <p className="text-sm text-slate-500">Preencha as informações do reparo necessário.</p>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Título do Reparo</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            placeholder="Ex: Vazamento no teto do salão de festas"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-700"
          />
          {state?.errors?.title && <p className="text-red-500 text-xs font-medium mt-1">{state.errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Descrição Detalhada</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            placeholder="Descreva o problema com detalhes..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"
          />
          {state?.errors?.description && <p className="text-red-500 text-xs font-medium mt-1">{state.errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Localização</label>
            <input
              name="location"
              defaultValue={initialData?.location}
              placeholder="Ex: Bloco A - Apto 101"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Prazo Estimado</label>
            <input
              type="date"
              name="dueDate"
              defaultValue={defaultDate}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700"
            />
            {state?.errors?.dueDate && <p className="text-red-500 text-xs font-medium mt-1">{state.errors.dueDate}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Prioridade</label>
            <div className="relative">
              <select
                name="priority"
                defaultValue={initialData?.priority || "LOW"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700 appearance-none bg-white"
              >
                <option value="LOW">🔵 Baixa</option>
                <option value="MEDIUM">🟡 Média</option>
                <option value="HIGH">🟠 Alta</option>
                <option value="URGENT">🔴 Urgente</option>
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          {initialData && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status Atual</label>
              <div className="relative">
                <select
                  name="status"
                  defaultValue={initialData.status}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700 appearance-none bg-white"
                >
                  <option value="OPEN">Aberto</option>
                  <option value="IN_PROGRESS">Em Andamento</option>
                  <option value="COMPLETED">Concluído</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
                <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</div>
              </div>
            </div>
          )}
        </div>

        {state?.message && (
          <div className={cn("p-4 rounded-xl text-sm font-medium flex items-center gap-2", 
            state.message.includes("Erro") ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
          )}>
            {state.message}
          </div>
        )}
      </div>

      <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Link href="/" className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Cancelar
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          {initialData ? "Salvar Alterações" : "Criar Ordem"}
        </button>
      </div>
    </form>
  );
}