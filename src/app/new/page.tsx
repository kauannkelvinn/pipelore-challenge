import { RepairForm } from "@/components/repair-form";
import Link from "next/link";

export default function NewRepairOrderPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Nova Ordem de Serviço</h1>
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Voltar para listagem
          </Link>
        </div>
        
        <RepairForm />
      </div>
    </main>
  );
}