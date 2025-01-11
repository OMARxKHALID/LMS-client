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
import { Link } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BorrowedBooksTable from "./components/ui/BorrowedBooksTable";
import TotalBorrowedBooksTable from "./components/ui/TotalBorrowedBooks";
import UploadedBooksTable from "./components/ui/UploadedBooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "./components/ui/PaginationControls";

const calculateProgress = (borrowed, total) => {
  return total > 0 ? (borrowed / total) * 100 : 0;
};

export default function Dashboard() {
  const [isReturning, setIsReturning] = useState(null);
  const { getBorrowRecords, returnBook } = useBorrow();
  const { toast } = useToast();
  const { borrows, loading } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);

  const { role } = user;

  const [showOverdueNotice, setShowOverdueNotice] = useState(true);

  useEffect(() => {
    getBorrowRecords();
  }, []);

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

  const paginationOptions = [
    {
      label: "currentBorrows",
      items: borrows.filter(
        (borrow) => borrow.borrowed_by._id === user._id && !borrow.return_date
      ),
    },
    {
      label: "totalBorrowedBooks",
      items: borrows.filter((borrow) => borrow.borrowed_by._id === user._id),
    },
    { label: "uploadedBooks", items: borrows },
  ];

  // for currently borrowed books
  const {
    paginatedItems: currentBorrows,
    currentPage: currentBorrowedPage,
    totalPages: totalBorrowedPages,
    setCurrentPage: setCurrentBorrowedPage,
  } = usePagination(paginationOptions[0].items, 5);

  // for total borrowed books
  const {
    paginatedItems: currentTotalBorrowedBooks,
    currentPage: currentTotalBorrowedPage,
    totalPages: totalBorrowedBooksPages,
    setCurrentPage: setCurrentTotalBorrowedPage,
  } = usePagination(paginationOptions[1].items, 5);

  // for uploaded books
  const {
    paginatedItems: currentUploadedBooks,
    currentPage: currentUploadedPage,
    totalPages: totalUploadedPages,
    setCurrentPage: setCurrentUploadedPage,
  } = usePagination(paginationOptions[2].items, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">
              Dashboard Overview
            </CardTitle>
            <CardDescription>
              Your borrowing activity at a glance
            </CardDescription>
          </div>
          <Button variant="outline" onClick={getBorrowRecords}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
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
                  borrows.filter(
                    (borrow) => borrow.borrowed_by._id === user._id
                  ).length
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
                Currently Borrowed
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
              <CardTitle className="text-sm font-medium">
                Overdue Books
              </CardTitle>
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
          <Alert variant="destructive" className="relative mb-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Overdue Books Notice</AlertTitle>
            <AlertDescription>
              You have {overdueBooks} overdue{" "}
              {overdueBooks === 1 ? "book" : "books"}. Please return them as
              soon as possible to avoid additional fees.
            </AlertDescription>
            <button
              className="absolute top-2 right-2 text-destructive"
              onClick={() => setShowOverdueNotice(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
            <TabsTrigger value="history">Borrowing History</TabsTrigger>
            {role === "admin" && (
              <TabsTrigger value="uploaded">Uploaded Books</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="current">
            {currentBorrows.length === 0 ? (
              <Card>
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">
                    No books currently borrowed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse and borrow books from the catalog
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/books">Browse Books</Link>
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <BorrowedBooksTable
                  currentBorrows={currentBorrows}
                  handleReturnBook={handleReturnBook}
                  isReturning={isReturning}
                />
                {totalBorrowedPages > 1 && (
                  <PaginationControls
                    currentPage={currentBorrowedPage}
                    totalPages={totalBorrowedPages}
                    setCurrentPage={setCurrentBorrowedPage}
                  />
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="history">
            <>
              <TotalBorrowedBooksTable
                currentTotalBorrowedBooks={currentTotalBorrowedBooks}
              />
              {totalBorrowedBooksPages > 1 && (
                <PaginationControls
                  currentPage={currentTotalBorrowedPage}
                  totalPages={totalBorrowedBooksPages}
                  setCurrentPage={setCurrentTotalBorrowedPage}
                />
              )}
            </>
          </TabsContent>
          {role === "admin" && (
            <TabsContent value="uploaded">
              {currentUploadedBooks.length === 0 ? (
                <Card>
                  <div className="text-center py-6">
                    <Library className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">
                      No books uploaded
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload books to offer for borrowing
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/admin/create-book">Upload New Book</Link>
                    </Button>
                  </div>
                </Card>
              ) : (
                <>
                  <UploadedBooksTable
                    currentUploadedBooks={currentUploadedBooks}
                  />
                  {totalUploadedPages > 1 && (
                    <PaginationControls
                      currentPage={currentUploadedPage}
                      totalPages={totalUploadedPages}
                      setCurrentPage={setCurrentUploadedPage}
                    />
                  )}
                </>
              )}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <Toaster />
    </Card>
  );
}
