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

const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowDate: "2024-12-28",
    dueDate: "2025-01-28",
    pdfUrl: "/books/great-gatsby.pdf",
    status: "borrowed",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowDate: "2024-12-15",
    dueDate: "2025-01-15",
    returnDate: "2024-12-30",
    pdfUrl: "/books/mockingbird.pdf",
    status: "returned",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    borrowDate: "2024-12-01",
    dueDate: "2024-12-31",
    pdfUrl: "/books/1984.pdf",
    status: "overdue",
  },
];

export default function BorrowedBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
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

  const filteredBooks = filterBooks(books, searchQuery);
  const sortedBooks = sortBooks(filteredBooks, sortBy);
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const currentBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Borrowed Books</h1>
          <p className="text-muted-foreground">
            View and access your borrowed book PDFs
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
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
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <CardHeader className="space-y-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <Badge
                      className={getStatusColor(book.status)}
                      variant="secondary"
                    >
                      {book.status.charAt(0).toUpperCase() +
                        book.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Borrowed:</span>
                      <span>
                        {new Date(book.borrowDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span>{new Date(book.dueDate).toLocaleDateString()}</span>
                    </div>
                    {book.returnDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Returned:</span>
                        <span>
                          {new Date(book.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => window.open(book.pdfUrl, "_blank")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {currentBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg bg-muted/10">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No books found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {totalPages > 1 && (
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentBooks
              .filter((book) => book.status === "returned")
              .map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardHeader className="space-y-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">
                        {book.title}
                      </CardTitle>
                      <Badge
                        className={getStatusColor(book.status)}
                        variant="secondary"
                      >
                        {book.status.charAt(0).toUpperCase() +
                          book.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Borrowed:</span>
                        <span>
                          {new Date(book.borrowDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Returned:</span>
                        <span>
                          {new Date(book.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => window.open(book.pdfUrl, "_blank")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View PDF
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
