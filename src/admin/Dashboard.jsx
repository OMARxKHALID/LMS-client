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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "../components/ui/pagination-controls";

const calculateProgress = (borrowed, total) => {
  return total > 0 ? (borrowed / total) * 100 : 0;
};

export default function Dashboard() {
  const [isReturning, setIsReturning] = useState(false);
  const { getBorrowRecords, returnBook } = useBorrow();
  const { toast } = useToast();
  const { borrows, loading } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);
  const { role } = user;

  const sortedborrows = [...borrows]
    .filter((borrow) => {
      if (role === "admin") {
        return true;
      }
      return borrow.borrowed_by._id === user._id;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  const totalBooks = sortedborrows.length;
  const borrowedBooks = sortedborrows.filter(
    (borrow) => !borrow.return_date
  ).length;

  const overdueBooks = sortedborrows.filter(
    (borrow) =>
      !borrow.return_date && isPast(new Date(borrow.expected_return_date))
  ).length;

  const dueSoonBooks = sortedborrows.filter((borrow) => {
    const dueDate = new Date(borrow.expected_return_date);
    const now = new Date();
    return (
      !borrow.return_date &&
      dueDate > now &&
      dueDate - now < 3 * 24 * 60 * 60 * 1000
    );
  }).length;

  const paginationOptions = [
    {
      label: "currentBorrows",
      items: sortedborrows.filter((borrow) => !borrow.return_date),
    },
    {
      label: "totalBorrowedBooks",
      items: sortedborrows,
    },
  ];

  // Pagination logic for each section
  const {
    paginatedItems: currentBorrows,
    currentPage: currentBorrowedPage,
    totalPages: totalBorrowedPages,
    setCurrentPage: setCurrentBorrowedPage,
  } = usePagination(paginationOptions[0].items, 8);

  const {
    paginatedItems: currentTotalBorrowedBooks,
    currentPage: currentTotalBorrowedPage,
    totalPages: totalBorrowedBooksPages,
    setCurrentPage: setCurrentTotalBorrowedPage,
  } = usePagination(paginationOptions[1].items, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">
              {user.role === "admin" ? "Admin Dashboard" : "Dashboard Overview"}
            </CardTitle>
            <CardDescription>
              {user.role === "admin"
                ? "Monitor all borrowing activity"
                : "Your borrowing activity at a glance"}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={getBorrowRecords}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrowed Books
              </CardTitle>
              <Library className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
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
              <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
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
              <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
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
              <BookX className="w-4 h-4 text-red-600 dark:text-red-400" />
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
            <AlertTriangle className="w-4 h-4" />
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
              <X className="w-4 h-4" />
            </button>
          </Alert>
        )}

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="justify-start w-full overflow-x-auto">
            <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
            <TabsTrigger value="history">Borrowing History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            {currentBorrows.length === 0 ? (
              <Card>
                <div className="py-6 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
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
            {currentTotalBorrowedBooks.length === 0 ? (
              <Card>
                <div className="py-6 text-center">
                  <Library className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">
                    No borrowing history
                  </h3>
                </div>
              </Card>
            ) : (
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
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
