import { useState } from "react";
import { FileText, Eye, Search, RefreshCcw } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useBook } from "@/hooks/useBook";
import PaginationControls from "../../components/ui/pagination-controls";
import { useNavigate } from "react-router";

export default function BorrowedBooks() {
  const { borrows } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);
  const { role } = user || [];
  const { getBooks } = useBook();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("current");
  const itemsPerPage = 6;

  const filteredborrowedBooks =
    role === "admin"
      ? borrows
      : borrows.filter((b) => user?.borrowed_books.includes(b._id));

  const filterBooks = (books, query) => {
    return books.filter(
      (book) =>
        book.borrowed_book?.title
          ?.toLowerCase()
          ?.includes(query?.toLowerCase()) ||
        book.borrowed_book?.author
          ?.toLowerCase()
          ?.includes(query?.toLowerCase())
    );
  };

  const sortBooks = (books, sortBy) => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return (
            new Date(a.expected_return_date).getTime() -
            new Date(b.expected_return_date).getTime()
          );
        case "title":
          return a?.borrowed_book?.title?.localeCompare(
            b?.borrowed_book?.title
          );
        case "author":
          return a?.borrowed_book?.author?.localeCompare(
            b?.borrowed_book?.author
          );
        default:
          return 0;
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "borrowed":
        return "bg-blue-500/10 text-blue-500";
      case "returned":
        return "bg-green-500/10 text-green-500";
      case "overdue":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const filteredBooks = filterBooks(filteredborrowedBooks, searchQuery);
  const sortedBooks = sortBooks(filteredBooks, sortBy);
  const filteredByTab =
    activeTab === "current"
      ? sortedBooks.filter((book) => !book.return_date)
      : sortedBooks.filter((book) => book.return_date);
  const totalPages = Math.ceil(filteredByTab.length / itemsPerPage);
  const currentBooks = filteredByTab.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Borrowed Books</h1>
          <p className="text-muted-foreground">
            View and access your borrowed book PDFs
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => getBooks()}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          <a>Refresh</a>
        </Button>
      </div>

      <Tabs
        defaultValue="current"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
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
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="current" className="space-y-4">
          <BooksGrid books={currentBooks} getStatusColor={getStatusColor} />
          {currentBooks.length === 0 && <NoBooksFound />}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <BooksGrid books={currentBooks} getStatusColor={getStatusColor} />
          {currentBooks.length === 0 && <NoBooksFound />}
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
const BooksGrid = ({ books, getStatusColor }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card key={book._id} className="overflow-hidden flex flex-col">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-1 text-base sm:text-lg">
                {book.borrowed_book.title}
              </CardTitle>
              <Badge
                className={getStatusColor(book.status)}
                variant="secondary"
              >
                {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {book.borrowed_book.author}
            </p>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Borrowed:</span>
                <span>{new Date(book.borrowed_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span>
                  {new Date(book.expected_return_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              {!book.return_date &&
              book.borrowed_book.pdf_files &&
              book.borrowed_book.pdf_files.length > 0 ? (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/admin/read/${book._id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View PDF
                </Button>
              ) : null}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const NoBooksFound = () => (
  <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg bg-muted/10">
    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium">No books found</h3>
    <p className="text-sm text-muted-foreground">
      Try adjusting your search or filters
    </p>
  </div>
);
