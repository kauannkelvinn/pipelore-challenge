import { RepairOrderForm } from "@/components/ui/RepairOrderForm";
import Link from "next/link";

export default function NewOrderPage() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-2xl">
      <Link href="/" className="text-gray-500 mb-4 block">← Voltar</Link>
      <h1 className="text-2xl font-bold mb-6">Nova Ordem</h1>
      <RepairOrderForm />
    </main>
  );
}