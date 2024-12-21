import { useEffect, useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { format } from "date-fns";
import { Edit, Trash, Plus, Loader2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useBook } from "@/hooks/useBook";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
export default function ManageBooks() {
  const { toast } = useToast();
  const { deleteBook, getBooks } = useBook();
  const { books, isLoading } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);

  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil((books?.length || 0) / itemsPerPage)
  );

  const getCurrentBooks = () => {
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const filteredBooks = books.filter((book) => book.uploaded_by === user._id);
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (!bookId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid book ID.",
      });
      return;
    }

    startTransition(async () => {
      try {
        await deleteBook(bookId);
        toast({
          title: "Book deleted successfully",
          description: "The book has been removed from the catalog.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error deleting book",
          description:
            error.message || "Something went wrong. Please try again.",
        });
      }
    });
  };

  const getBookStatus = (book) => {
    return book.total_copies > 0 ? "Available" : "Unavailable";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Manage Books
        </h2>
        <div className="flex justify-end">
          <Button size="sm" variant="outline" asChild>
            <Link to="/admin/create-book" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Book</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentBooks().length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No books available.
                </TableCell>
              </TableRow>
            ) : (
              getCurrentBooks().map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    {book.publication_date &&
                      format(new Date(book.publication_date), "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={book.total_copies > 0 ? "default" : "secondary"}
                    >
                      {getBookStatus(book)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          aria-label="Open product actions menu"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[150px]">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-between cursor-pointer w-full"
                              disabled={isPending}
                            >
                              {isPending ? "Deleting..." : "Delete"}
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this book? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteBook(book._id)}
                                disabled={isPending}
                              >
                                {isPending ? "Deleting..." : "Confirm"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Link to={`/admin/edit-book/${book._id}`}>
                          <Button
                            variant="ghost"
                            className="flex items-center justify-between cursor-pointer w-full"
                          >
                            Edit <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  aria-label={`Page ${index + 1}`}
                  className={`cursor-pointer `}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`cursor-pointer `}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Toaster />
    </div>
  );
}
