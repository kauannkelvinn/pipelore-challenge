'use client'

import { deleteRepairOrder } from "@/app/actions";

export function DeleteButton({ id }: { id: number }) {
  const deleteWithId = deleteRepairOrder.bind(null, id);

  return (
    <form
      action={deleteWithId}
      onSubmit={(e) => {
        if (!confirm("Tem certeza que deseja excluir esta ordem?")) {
          e.preventDefault();
        }
      }}
    >
      <button 
        type="submit" 
        className="text-red-600 hover:text-red-900 text-sm font-medium"
      >
        Excluir
      </button>
    </form>
  );
}