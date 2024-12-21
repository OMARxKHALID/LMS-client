import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { isPast } from "date-fns";
import {
  RotateCcw,
  BookOpen,
  BookX,
  Clock,
  Library,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBorrow } from "@/hooks/useBorrow";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BorrowedBooksTable from "./components/ui/BorrowedBooks";
import TotalBorrowedBooksTable from "./components/ui/TotalBorrowedBooks";
import UploadedBooksTable from "./components/ui/UploadedBooks";

const calculateProgress = (borrowed, total) => {
  return total > 0 ? (borrowed / total) * 100 : 0;
};

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [isReturning, setIsReturning] = useState(null);
  const { getBorrowRecords, returnBook } = useBorrow();
  const { toast } = useToast();
  const { borrows, loading } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);
  const { userType } = user;

  const [showOverdueNotice, setShowOverdueNotice] = useState(true);
  const [currentBorrowedPage, setCurrentBorrowedPage] = useState(1);
  const [currentUploadedPage, setCurrentUploadedPage] = useState(1);
  const [currentTotalBorrowedPage, setCurrentTotalBorrowedPage] = useState(1);

  useEffect(() => {
    getBorrowRecords();
  }, []);

  const refresh = () => {
    getBorrowRecords();
  };

  const handleReturnBook = async (borrowId, borrowedBy) => {
    if (borrowedBy._id !== user._id) {
      toast({
        title: "Error",
        description: "You cannot return a book you did not borrow",
        variant: "destructive",
      });
      return;
    }

    setIsReturning(borrowId);
    try {
      await returnBook(borrowId);
      toast({
        title: "Success",
        description: "Book returned successfully",
      });
      getBorrowRecords();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to return the book",
        variant: "destructive",
      });
    } finally {
      setIsReturning(null);
    }
  };
  const totalBooks = borrows.length;
  const borrowedBooks = borrows.filter(
    (borrow) => !borrow.return_date && borrow.borrowed_by._id === user._id
  ).length;

  const overdueBooks = borrows.filter(
    (borrow) =>
      !borrow.return_date &&
      isPast(new Date(borrow.expected_return_date)) &&
      borrow.borrowed_by._id === user._id
  ).length;

  const dueSoonBooks = borrows.filter((borrow) => {
    const dueDate = new Date(borrow.expected_return_date);
    const now = new Date();
    return (
      !borrow.return_date &&
      dueDate > now &&
      dueDate - now < 3 * 24 * 60 * 60 * 1000 &&
      borrow.borrowed_by._id === user._id
    );
  }).length;

  const currentBorrows = borrows
    .filter(
      (borrow) => borrow.borrowed_by._id === user._id && !borrow.return_date
    )
    .slice(
      (currentBorrowedPage - 1) * ITEMS_PER_PAGE,
      currentBorrowedPage * ITEMS_PER_PAGE
    );

  const totalBorrowedPages = Math.ceil(
    borrows.filter(
      (borrow) => borrow.borrowed_by._id === user._id && !borrow.return_date
    ).length / ITEMS_PER_PAGE
  );

  const totalUploadedPages = Math.ceil(
    borrows.filter((borrow) => borrow.borrowed_by._id === user._id).length /
      ITEMS_PER_PAGE
  );

  const currentTotalBorrowedBooks = borrows
    .filter((borrow) => borrow.borrowed_by._id === user._id)
    .slice(
      (currentTotalBorrowedPage - 1) * ITEMS_PER_PAGE,
      currentTotalBorrowedPage * ITEMS_PER_PAGE
    );

  const currentUploadedBooks = borrows.slice(
    (currentUploadedPage - 1) * ITEMS_PER_PAGE,
    currentUploadedPage * ITEMS_PER_PAGE
  );

  const totalBorrowedBooksPages = Math.ceil(borrows.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button variant="outline" onClick={refresh}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Borrowed Books
            </CardTitle>
            <Library className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                borrows.filter((borrow) => borrow.borrowed_by._id === user._id)
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Books borrowed by you
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Borrowed Books
            </CardTitle>
            <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{borrowedBooks}</div>
            <Progress
              value={calculateProgress(borrowedBooks, totalBooks)}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueSoonBooks}</div>
            <p className="text-xs text-muted-foreground">
              Books due in next 3 days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-red-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <BookX className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              Please return immediately
            </p>
          </CardContent>
        </Card>
      </div>

      {showOverdueNotice && overdueBooks > 0 && (
        <Alert variant="destructive" className="relative">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Overdue Books Notice</AlertTitle>
          <AlertDescription>
            You have {overdueBooks} overdue{" "}
            {overdueBooks === 1 ? "book" : "books"}. Please return them as soon
            as possible to avoid additional fees.
          </AlertDescription>
          <button
            className="absolute top-2 right-2 text-destructive"
            onClick={() => setShowOverdueNotice(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Borrowed Books</CardTitle>
          <CardDescription>Books that you have borrowed</CardDescription>
        </CardHeader>
        <CardContent>
          {currentBorrows.length === 0 ? (
            <div className="text-center py-6">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No books borrowed</h3>
              <p className="text-sm text-muted-foreground">
                Browse and borrow books from the catalog
              </p>
              <Button className="mt-4" asChild>
                <Link to="/books">Browse Books</Link>
              </Button>
            </div>
          ) : (
            <>
              <BorrowedBooksTable
                currentBorrows={currentBorrows}
                handleReturnBook={handleReturnBook}
                isReturning={isReturning}
              />
              {currentBorrows.length > 4 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentBorrowedPage((prev) =>
                            Math.max(prev - 1, 1)
                          )
                        }
                        disabled={currentBorrowedPage === 1}
                        className={`cursor-pointer `}
                      />
                    </PaginationItem>
                    {[...Array(totalBorrowedPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setCurrentBorrowedPage(i + 1)}
                          isActive={currentBorrowedPage === i + 1}
                          className={`cursor-pointer `}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentBorrowedPage((prev) =>
                            Math.min(prev + 1, totalBorrowedPages)
                          )
                        }
                        disabled={currentBorrowedPage === totalBorrowedPages}
                        className={`cursor-pointer `}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {userType === "seller" && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Books</CardTitle>
            <CardDescription>
              Books that you have uploaded for borrowing
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentUploadedBooks.length === 0 ? (
              <div className="text-center py-6">
                <Library className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">
                  No books uploaded
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload books to offer for borrowing
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/books/upload">Upload Books</Link>
                </Button>
              </div>
            ) : (
              <>
                <UploadedBooksTable
                  currentUploadedBooks={currentUploadedBooks}
                />
                {currentUploadedBooks.length > 4 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentUploadedPage((prev) =>
                              Math.max(prev - 1, 1)
                            )
                          }
                          disabled={currentUploadedPage === 1}
                          className={`cursor-pointer `}
                        />
                      </PaginationItem>
                      {[...Array(totalUploadedPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentUploadedPage(i + 1)}
                            isActive={currentUploadedPage === i + 1}
                            className={`cursor-pointer `}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentUploadedPage((prev) =>
                              Math.min(prev + 1, totalUploadedPages)
                            )
                          }
                          disabled={currentUploadedPage === totalUploadedPages}
                          className={`cursor-pointer `}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {(userType === "seller" || userType === "buyer") && (
        <Card>
          <CardHeader>
            <CardTitle>Total Borrowed Books</CardTitle>
            <CardDescription>
              Books that you have previously borrowed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentTotalBorrowedBooks.length === 0 ? (
              <div className="text-center py-6">
                <Library className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">
                  No books borrowed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse and borrow books from the catalog
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/books">Browse Books</Link>
                </Button>
              </div>
            ) : (
              <>
                <TotalBorrowedBooksTable
                  currentTotalBorrowedBooks={currentTotalBorrowedBooks}
                />
                {currentTotalBorrowedBooks.length > 4 ? (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentTotalBorrowedPage((prev) =>
                              Math.max(prev - 1, 1)
                            )
                          }
                          disabled={currentTotalBorrowedPage === 1}
                          className={`cursor-pointer `}
                        />
                      </PaginationItem>
                      {[...Array(totalBorrowedBooksPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentTotalBorrowedPage(i + 1)}
                            isActive={currentTotalBorrowedPage === i + 1}
                            className={`cursor-pointer `}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentTotalBorrowedPage((prev) =>
                              Math.min(prev + 1, totalBorrowedBooksPages)
                            )
                          }
                          disabled={
                            currentTotalBorrowedPage === totalBorrowedBooksPages
                          }
                          className={`cursor-pointer `}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      )}
      <Toaster />
    </div>
  );
}
