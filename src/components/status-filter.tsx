'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const statusOptions = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Abertos', value: 'OPEN' },
  { label: 'Em Progresso', value: 'IN_PROGRESS' },
  { label: 'Concluídos', value: 'COMPLETED' },
  { label: 'Cancelados', value: 'CANCELLED' },
];

export function StatusFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFilter = searchParams.get('status') || 'ALL';

  function handleFilter(status: string) {
    const params = new URLSearchParams(searchParams);
    if (status === 'ALL') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilter(option.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${currentFilter === option.value || (option.value === 'ALL' && !searchParams.get('status'))
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}