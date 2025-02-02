import { useEffect, useState } from "react";
import { FileText, Eye, Download, RefreshCcw, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useBook } from "@/hooks/useBook";
import PaginationControls from "@/components/ui/pagination-controls";
import { downloadPDF } from "@/utils/downloadPDF";
import { useNavigate } from "react-router";

export default function PurchasedBooks() {
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ PurchasedBooks ~ user:", user);
  const { books } = useSelector((state) => state.books);
  console.log("🚀 ~ PurchasedBooks ~ books:", books);
  const { getBooks } = useBook();

  useEffect(() => {
    getBooks();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const purchasedBooks = books.filter((book) => {
    if (user.role === "admin") {
      // Admin sees all purchased books
      return book.is_purchased;
    }
    // Users see only their purchased books
    return book.is_purchased && user?.purchased_books.includes(book._id);
  });

  const filterBooks = (books, query) => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
  };

  const sortBooks = (books, sortBy) => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });
  };

  const sortedBooks = sortBooks(
    filterBooks(purchasedBooks, searchQuery),
    sortBy
  );
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const currentBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container p-4 mx-auto sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {user.role === "admin"
              ? "All Purchased Books"
              : "My Purchased Books"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {user.role === "admin"
              ? "View all books purchased by users"
              : "View and download your purchased book PDFs"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => {
            setSearchQuery("");
            setSortBy("title");
            setCurrentPage(1);
          }}
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 mb-4 sm:flex-row">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentBooks.length === 0 ? (
        <NoBooksFound />
      ) : (
        <>
          <BooksGrid books={currentBooks} />
          {totalPages > 1 && (
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
const BooksGrid = ({ books }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card key={book._id} className="flex flex-col overflow-hidden">
          <CardHeader className="space-y-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base line-clamp-1">
                {book.title}
              </CardTitle>
              <Badge
                className="text-blue-500 bg-blue-500/10"
                variant="secondary"
              >
                Purchased
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-col space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchased On:</span>
                <span>
                  {new Date(book.purchased_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full space-y-2">
              {book.pdf_files && book.pdf_files.length > 0 ? (
                <>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/admin/read/${book._id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </Button>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      downloadPDF(book.pdf_files[0], book.title);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No PDF available
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const NoBooksFound = () => (
  <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg bg-muted/10">
    <FileText className="w-10 h-10 mb-4 text-muted-foreground" />
    <h3 className="text-lg font-medium">No books found</h3>
    <p className="text-sm text-muted-foreground">
      Try adjusting your search or filters
    </p>
  </div>
);
