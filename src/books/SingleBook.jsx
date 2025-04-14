import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BookCopy,
  User,
  Building2,
  MapPin,
  Loader2,
  DollarSign,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useBorrow } from "@/hooks/useBorrow";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/utils/utils";
import { updateBook } from "@/redux/slice/bookSlice";
import { useBook } from "@/hooks/useBook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import RelatedBooks from "@/components/ui/books/related-books";
import { updateUser } from "@/redux/slice/authSlice";

export default function SingleBook() {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState();

  const params = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookId = params.id;
  const { books, isLoading } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const { borrows } = useSelector((state) => state.borrow);
  const { categories } = useSelector((state) => state.categories);

  const { borrowBook, getBorrowRecords } = useBorrow();

  const book = books.find((book) => book._id === bookId);
  const category = categories.find(
    (category) => category._id === book?.category
  );
  const calculateDueDate = () => {
    return selectedDueDate ? selectedDueDate.toISOString() : null;
  };

  useEffect(() => {
    getBorrowRecords();
  }, []);

  const hasAlreadyBorrowed = borrows.some(
    (borrow) =>
      borrow.borrowed_book._id === bookId &&
      borrow.borrowed_by._id === user?._id &&
      borrow.status === "borrowed"
  );

  const handleBorrow = async () => {
    if (!book) {
      toast({
        variant: "destructive",
        title: "Book Not Found",
        description: "The book you're trying to borrow does not exist.",
      });
      return;
    }

    if (!user || !user?._id) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to borrow a book.",
      });
      return;
    }

    if (book.available_copies <= 0) {
      toast({
        variant: "destructive",
        title: "Unavailable",
        description: "This book is not available for borrowing at the moment.",
      });
      return;
    }
    if (hasAlreadyBorrowed) {
      toast({
        variant: "destructive",
        title: "Already Borrowed",
        description: "You have already borrowed this book. Return it first.",
      });
      return;
    }

    if (!selectedDueDate) {
      toast({
        variant: "destructive",
        title: "Return Date Required",
        description: "Please select a valid return date.",
      });
      return;
    }

    const { _id: borrowed_by } = user || {};
    const { _id: borrowed_book, title } = book;

    const expected_return_date = calculateDueDate();

    setIsBorrowing(true);
    try {
      const response = await borrowBook({
        borrowed_book,
        expected_return_date,
        borrowed_by,
      });

      // Success case
      const updatedBook = {
        ...book,
        available_copies: book.available_copies - 1,
      };

      dispatch(updateBook(updatedBook));
      dispatch(
        updateUser({
          ...user,
          borrowed_books: [...user.borrowed_books, response?.borrow?._id],
        })
      );
      toast({
        title: "Borrow Successful",
        description: `${title} has been borrowed successfully. Total cost: $${response?.borrow?.total_borrow_price}.`,
      });
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsBorrowing(false);
    }
  };

  const handlePurchase = () => {
    if (!book) {
      toast({
        variant: "destructive",
        title: "Book Not Found",
        description: "The book you're trying to purchase does not exist.",
      });
      return;
    }

    if (!user || !user?._id) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to purchase a book.",
      });
      return;
    }

    navigate("/payment", { state: { book } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold">Book not found</h2>
          <p className="text-muted-foreground">
            The book you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => navigate("/books")} className="mt-4">
            Back to Books
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-16 bg-gradient-to-b from-background to-muted/50">
        <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] opacity-50" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container relative z-10 px-4 mx-auto"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Book Cover Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="transition-shadow duration-300 shadow-lg lg:col-span-1 backdrop-blur-sm border-border/50 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md">
                    <img
                      src={book.cover_image_url || "/images/placeholder.jpg"}
                      alt={book.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background/80 to-transparent hover:opacity-100" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Book Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-lg backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-transparent sm:text-3xl lg:text-4xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <BookCopy className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ISBN:</span>
                        <span>{book.isbn}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Publisher:
                        </span>
                        <span>{book.publisher}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Published:
                        </span>
                        <span>
                          {book.publication_date &&
                            format(
                              new Date(book.publication_date),
                              "MMMM d, yyyy"
                            )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Price:</span>
                        <span>
                          {book.price
                            ? `$${book.price.toFixed(2)}/book`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Categories:
                        </span>
                        <span>{category?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span>{book.location || "Not specified"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground ">
                          Late Fine:
                        </span>
                        <span>
                          {book.borrowed_fine
                            ? `$${book.borrowed_fine.toFixed(2)}/day`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base font-semibold sm:text-lg">
                      About this book
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {book.description || "No description available."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="text-xs sm:text-sm">{`${book.available_copies} Available`}</Badge>
                    {hasAlreadyBorrowed ? (
                      <Badge
                        variant="destructive"
                        className="text-xs sm:text-sm"
                      >
                        <AlertCircle className="w-3 h-3 mr-1 sm:h-4 sm:w-4" />
                        Already Borrowed
                      </Badge>
                    ) : (
                      <Badge variant="success" className="text-xs sm:text-sm">
                        <CheckCircle className="w-3 h-3 mr-1 sm:h-4 sm:w-4" />
                        Available for Borrowing
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal text-sm sm:text-base",
                            !selectedDueDate && "text-muted-foreground"
                          )}
                        >
                          {selectedDueDate ? (
                            format(selectedDueDate, "PPP")
                          ) : (
                            <span>Pick a return date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDueDate}
                          onSelect={setSelectedDueDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>

                    <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto">
                      <Button
                        onClick={handleBorrow}
                        disabled={isBorrowing}
                        className="text-sm sm:text-base"
                      >
                        {isBorrowing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Borrowing...
                          </>
                        ) : (
                          "Borrow"
                        )}
                      </Button>
                      <Button
                        onClick={handlePurchase}
                        className="text-sm sm:text-base"
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                  {hasAlreadyBorrowed && (
                    <Alert variant="destructive">
                      <AlertTriangle className="w-3 h-3 sm:h-4 sm:w-4" />
                      <AlertTitle className="text-sm sm:text-base">
                        Already Borrowed
                      </AlertTitle>
                      <AlertDescription className="text-xs sm:text-sm">
                        You have already borrowed this book. Please return it
                        before borrowing again.
                      </AlertDescription>
                    </Alert>
                  )}
                  {!hasAlreadyBorrowed && book.available_copies > 0 && (
                    <Alert>
                      <BookOpen className="w-3 h-3 sm:h-4 sm:w-4" />
                      <AlertTitle className="text-sm sm:text-base">
                        Available for Borrowing
                      </AlertTitle>
                      <AlertDescription className="text-xs sm:text-sm">
                        This book is available for borrowing! Choose a return
                        date and borrow now.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <RelatedBooks
        books={books.filter(
          (b) => b.category === book.category && b._id !== book._id
        )}
        currentBookId={book._id}
      />
    </div>
  );
}
