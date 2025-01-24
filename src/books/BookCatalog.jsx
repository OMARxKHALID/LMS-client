import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "@/components/ui/books/book-card";
import SearchFilters from "@/components/ui/books/search-filters";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useBook } from "@/hooks/useBook";
import { useCategory } from "@/hooks/useCategory";
import PaginationControls from "@/components/ui/pagination-controls";
import { BookOpen, Library } from "lucide-react";

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
  const booksPerPage = 8;

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
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-16"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Explore Our Collection
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover thousands of books across various categories in our
              digital library
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 bg-muted/30 backdrop-blur-md"
      >
        <div className="container px-4">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 py-8"
      >
        <div className="container px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: booksPerPage }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-[400px] animate-pulse bg-muted" />
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              {books.length === 0 ? (
                <Card className="p-12 backdrop-blur-sm border-border/50">
                  <div className="text-center space-y-3">
                    <Library className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-semibold">No books found</h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto">
                      Try adjusting your search or filters to find what
                      you&apos;re looking for.
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {books.map((book, index) => (
                    <motion.div
                      key={book._id || book.book_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookCard book={book} />
                    </motion.div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
}
