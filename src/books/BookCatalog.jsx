import { useState, useEffect } from "react";
import BookCard from "@/components/ui/books/book-card";
import SearchFilters from "@/components/ui/books/search-filters";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useBook } from "@/hooks/useBook";
import { useCategory } from "@/hooks/useCategory";
import PaginationControls from "@/components/ui/pagination-controls";

export default function BookCatalog() {
  const { getBooks } = useBook();
  const { getCategories } = useCategory();

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  const { books: allBooks, isLoading } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 4;

  // Fetch and filter books based on user inputs
  const fetchBooks = () => {
    let filteredBooks = [...allBooks];

    // Filter by search term
    if (searchTerm) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === selectedCategory
      );
    }

    // Pagination
    const totalItems = filteredBooks.length;
    setTotalPages(Math.ceil(totalItems / booksPerPage));

    const startIndex = (currentPage - 1) * booksPerPage;
    setBooks(filteredBooks.slice(startIndex, startIndex + booksPerPage));
  };

  // Re-run filtering when dependencies change
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedCategory, currentPage, allBooks]);

  // Handlers for user interactions
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="container px-4 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: booksPerPage }).map((_, index) => (
            <Card
              key={`skeleton-${index}`}
              className="h-[400px] animate-pulse bg-muted"
            />
          ))}
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <Card className="p-12">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold">No books found</h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book._id || book.book_id} book={book} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
