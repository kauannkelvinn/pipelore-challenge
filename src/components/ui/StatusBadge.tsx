import { cn } from "@/lib/utils";

const styles = {
  OPEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
  CANCELLED: "bg-rose-50 text-rose-600 border-rose-100 decoration-rose-400/50",
};

const labels = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

export function StatusBadge({ status }: { status: string }) {
  const s = status as keyof typeof styles;
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm", 
      styles[s] || styles.OPEN
    )}>
      {labels[s] || status}
    </span>
  );
}