"use client";

import { useActionState } from "react";
import { createRepairOrder } from "@/app/actions";

export function RepairForm() {
  const [state, action, isPending] = useActionState(createRepairOrder, null);

  return (
    <form action={action} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Vazamento na pia"
        />
        {state?.errors?.title && <p className="text-red-500 text-sm mt-1">{state.errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Detalhes do problema..."
        />
        {state?.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
        <input
          id="location"
          name="location"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Torre B - Apto 402"
        />
        {state?.errors?.location && <p className="text-red-500 text-sm mt-1">{state.errors.location}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridade</label>
          <select
            id="priority"
            name="priority"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="LOW"
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
            <option value="URGENT">Urgente</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Prazo</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {state?.errors?.dueDate && <p className="text-red-500 text-sm mt-1">{state.errors.dueDate}</p>}
        </div>
      </div>

      {state?.message && (
        <div className="p-3 rounded bg-red-50 text-red-600 text-sm">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Salvando...' : 'Criar Ordem de Serviço'}
      </button>
    </form>
  );
}