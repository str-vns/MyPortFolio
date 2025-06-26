import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@_/components/ui/pagination";
import { useState, Children, isValidElement } from "react";
import FadeRight from "@_/hooks/FadeRight";
export default function Paginate({
  children,
  itemsPerPage = 4,
  maxVisiblePages = 5,
}: {
  children: React.ReactNode;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}) {
  const allItems = Children.toArray(children).filter(isValidElement);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-2">
        <FadeRight currentItems={currentItems} currentPage={currentPage} />
        {currentItems.length === 0 && (
          <div className="text-center text-gray-500">
            No items to display.
          </div>
        )}
        </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.max(1, prev - 1));
              }}
            />
          </PaginationItem>

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
