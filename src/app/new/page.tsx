import { RepairOrderForm } from "@/components/ui/RepairOrderForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewOrderPage() {
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
        <h1 className="text-3xl font-bold text-slate-800">Nova Solicitação</h1>
        <p className="text-slate-500 mt-1">Abra uma nova ordem de serviço para manutenção.</p>
      </div>

      <RepairOrderForm />
    </div>
  );
}