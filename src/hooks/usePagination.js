import { useState, useMemo } from "react";

const usePagination = (items, itemsPerPage, options = { looping: true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const resetPagination = () => setCurrentPage(1);

  const goToPage = (page) => {
    let newPage = page;
    if (options.looping) {
      if (page < 1) newPage = totalPages;
      else if (page > totalPages) newPage = 1;
    } else {
      newPage = Math.min(Math.max(page, 1), totalPages);
    }
    setCurrentPage(newPage);
  };

  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    setCurrentPage: goToPage,
    resetPagination,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
};

export default usePagination;
