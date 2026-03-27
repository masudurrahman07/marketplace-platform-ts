'use client';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const btnBase = "px-4 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed";
  const btnInactive = `${btnBase} border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={btnInactive}>
        ← Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`${btnBase} ${p === page
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className={btnInactive}>
        Next →
      </button>
    </div>
  );
}
