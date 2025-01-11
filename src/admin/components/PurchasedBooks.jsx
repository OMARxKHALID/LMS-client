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

export default function PurchasedBooks() {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const { getBooks } = useBook();

  useEffect(() => {
    getBooks();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter books that are purchased and uploaded by the current user
  const purchasedBooks = books.filter(
    (book) => book.isPurchased && book.uploaded_by === user._id
  );

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

  const filteredBooks = filterBooks(purchasedBooks, searchQuery);
  const sortedBooks = sortBooks(filteredBooks, sortBy);
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const currentBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-xl font-bold tracking-tight">
            Purchased Books
          </h1>
          <p className="text-muted-foreground">
            View and download purchased book PDFs
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchQuery("");
            setSortBy("title");
            setCurrentPage(1);
          }}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <BooksGrid books={currentBooks} />
        {currentBooks.length === 0 && <NoBooksFound />}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

const BooksGrid = ({ books }) => (
  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {books.map((book) => (
      <Card key={book._id} className="overflow-hidden flex flex-col">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-1 text-base sm:text-lg">
              {book.title}
            </CardTitle>
            <Badge className="bg-blue-500/10 text-blue-500" variant="secondary">
              Purchased
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {book.author}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-col space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchased On:</span>
              <span>{new Date(book.purchased_date).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
            {book.pdf_files && book.pdf_files.length > 0 ? (
              <>
                <Button
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => window.open(book.pdf_files[0], "_blank")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View PDF
                </Button>
                <Button
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = book.pdf_files[0];
                    link.download = book.title + ".pdf";
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No PDF available</p>
            )}
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
);

const NoBooksFound = () => (
  <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg bg-muted/10">
    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium">No books found</h3>
    <p className="text-sm text-muted-foreground">
      Try adjusting your search or filters
    </p>
  </div>
);

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => (
  <div className="flex justify-center gap-2 mt-6">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    {[...Array(totalPages)].map((_, i) => (
      <Button
        key={i}
        variant={currentPage === i + 1 ? "default" : "outline"}
        size="sm"
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </Button>
    ))}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
);
