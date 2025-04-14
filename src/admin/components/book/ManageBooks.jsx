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
import { Edit, Trash, Plus, Loader2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
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

  const getCurrentBooks = () => {
    if (!books || books.length === 0) return [];

    // Show all books for admin, or filter by uploaded_by for regular users
    const filteredBooks =
      user.role === "admin"
        ? books
        : books.filter((book) => book.uploaded_by === user._id);

    // Paginate the filtered books
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  };

  const totalPages = Math.max(
    1,
    Math.ceil(
      (user.role === "admin"
        ? books.length
        : books.filter((book) => book.uploaded_by === user._id).length) /
        itemsPerPage
    )
  );

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
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {user.role === "admin" ? "Manage All Books" : "Manage My Books"}
        </h2>
        <div className="flex justify-end">
          <Button size="sm" variant="outline" asChild>
            <Link to="/admin/create-book" className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              <span>Add New Book</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-4 overflow-hidden border-2 border-gray-200 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentBooks().length === 0 ? (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No books available.
                </TableCell>
              </TableRow>
            ) : (
              getCurrentBooks().map((book, index) => (
                <TableRow key={book._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.price}$</TableCell>
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
                          className="w-8 h-8 p-0"
                          aria-label="Open product actions menu"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[150px]">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-between w-full cursor-pointer"
                              disabled={isPending}
                            >
                              {isPending ? "Deleting..." : "Delete"}
                              <Trash className="w-4 h-4" />
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
                            className="flex items-center justify-between w-full cursor-pointer"
                          >
                            Edit <Edit className="w-4 h-4" />
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

      <div className="flex justify-center mt-4">
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
