interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-6 text-sm text-neutral-300">
      <span>Page {currentPage}</span>
      <span className="text-neutral-600">/</span>
      <span>{totalPages}</span>
    </div>
  );
}
