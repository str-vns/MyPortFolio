import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@_/components/ui/pagination";
import { useState, Children, isValidElement } from "react";
import { motion } from "framer-motion";
import { useColorsTheme } from "../colors";
import { useDarkMode } from "@_/stores/useDarkMode";

export default function Paginate({
  children,
  itemsPerPage = 4,
  maxVisiblePages = 5,
}: {
  children: React.ReactNode;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}) {
  const { isDarkMode } = useDarkMode();
  const allItems = Children.toArray(children).filter(isValidElement);
  const [currentPage, setCurrentPage] = useState(1);
  const colorTheme = useColorsTheme();

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  const column1 = currentItems.slice(0, 2);
  const column2 = currentItems.slice(2, 4);

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }


  return (
    <div className="space-y-6">
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {column1.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {column2.map((item, i) => (
              <motion.div
                key={i + 2}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="text-center"
          style={{
            color: "#FFDEDE",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          No items to display.
        </div>
      )}

      {/* Pagination */}
      <Pagination style={{ color: colorTheme.SEMIBLACK }}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`text-[14px] mr-0 md:mr-6 lg:mr-6 ${isDarkMode ? 'hover:text-[#CF0F47]' : 'hover:text-[#123458]'}`}
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.max(1, prev - 1));
                setCurrentPage?.(Math.max(1, currentPage - 1));
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
                  onClick={(e: any) => {
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
              className={`text-[14px] mr-0 md:ml-3 lg:ml-3 ${isDarkMode ? 'hover:text-[#CF0F47]' : 'hover:text-[#123458]'}`}
              href="#"
              onClick={(e: any) => {
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
