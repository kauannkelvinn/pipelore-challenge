import Link from "next/link";
import { db } from "@/db";
import { repairOrders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { StatusFilter } from "@/components/status-filter";
import { DeleteButton } from "@/components/delete-button";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const VALID_STATUSES = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
type ValidStatus = typeof VALID_STATUSES[number];

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const statusParam = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  
  const statusFilter: ValidStatus | undefined = 
    statusParam && VALID_STATUSES.includes(statusParam as ValidStatus) 
      ? (statusParam as ValidStatus)
      : undefined;

  const orders = statusFilter 
    ? await db.select().from(repairOrders).where(eq(repairOrders.status, statusFilter)).orderBy(desc(repairOrders.createdAt))
    : await db.select().from(repairOrders).orderBy(desc(repairOrders.createdAt));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
          <Link 
            href="/new" 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Nova Ordem
          </Link>
        </div>

        <div className="mb-6">
          <StatusFilter />
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <li className="px-6 py-12 text-center text-gray-500">
                Nenhuma ordem de serviço encontrada.
              </li>
            ) : (
              orders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition block">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {order.title}
                      </p>
                      <div className="ml-2 shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'OPEN' ? 'bg-green-100 text-green-800' : 
                            order.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 sm:flex sm:justify-between sm:items-center">
                      
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 mr-6">
                          📍 {order.location}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          📅 Prazo: {order.dueDate.toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:mt-0">
                        <p className="text-sm text-gray-500">
                          Prioridade: <span className="font-medium">{order.priority}</span>
                        </p>

                        <div className="flex gap-4 border-t pt-2 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-4 border-gray-200">
                            <Link 
                            href={`/${order.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                            >
                            Editar
                            </Link>
                            <DeleteButton id={order.id} />
                        </div>
                      </div>

                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}