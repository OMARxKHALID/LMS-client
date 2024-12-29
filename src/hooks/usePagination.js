import { useState } from "react";

const usePagination = (items, itemsPerPage, options = { looping: true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetPagination = () => setCurrentPage(1);

  const goToPage = (page) => {
    const newPage = options.looping
      ? page < 1
        ? totalPages
        : page > totalPages
        ? 1
        : page
      : Math.min(Math.max(page, 1), totalPages);

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
    setCurrentPage,
    resetPagination,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
};

export default usePagination;
