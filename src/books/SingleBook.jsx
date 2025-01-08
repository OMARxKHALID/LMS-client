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
  CalendarDays,
  MapPin,
  Loader2,
  DollarSign,
  AlertCircle,
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
import { cn } from "@/helpers/utils";
import { updateBook } from "@/redux/slice/bookSlice";
import { useBook } from "@/hooks/useBook";

export default function SingleBook() {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookId = params.id;
  const { books, isLoading } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const { borrows } = useSelector((state) => state.borrow);

  const { borrowBook, getBorrowRecords } = useBorrow();
  const { purchaseBook } = useBook();

  const book = books.find((book) => book._id === bookId);

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

      toast({
        title: "Borrow Successful",
        description: `${title} has been borrowed successfully. Total cost: $${response.total_borrow_price.toFixed(
          2
        )}.`,
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

  const handlePurchase = async () => {
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

    const { _id: purchased_by } = user || {};
    const { _id: purchased_book } = book;

    setIsPurchasing(true);
    try {
      const response = await purchaseBook({
        purchased_book,
        purchased_by,
        quantity: 1,
      });
      console.log("🚀 ~ handlePurchase ~ response:", response);

      const updatedBook = {
        ...book,
        available_copies: book.available_copies - 1,
        total_copies: book.total_copies - 1,
      };

      dispatch(updateBook(updatedBook));

      toast({
        title: "Purchase Successful",
        description: `${book.title} has been purchased successfully.`,
      });
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <p className="text-muted-foreground mt-2">
          The book you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button onClick={() => navigate("/books")} className="mt-4">
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden">
              <img
                src={book.cover_image_url || "/images/placeholder.jpg"}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Book Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl">{book.title}</CardTitle>
            <CardDescription className="text-lg">
              by {book.author}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BookCopy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ISBN:</span>
                  <span>{book.isbn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Publisher:</span>
                  <span>{book.publisher}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Published:</span>
                  <span>
                    {book.publication_date &&
                      format(new Date(book.publication_date), "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Price:</span>
                  <span>
                    {book.price ? `$${book.price.toFixed(2)}/book` : "N/A"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Categories:</span>
                  <span>{book.category?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span>{book.location || "Not specified"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Borrow Period:</span>
                  <span>User-defined</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Late Return Fine:
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About this book</h3>
              <p className="text-muted-foreground">
                {book.description || "No description available."}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge>{`${book.available_copies} Available`}</Badge>
            </div>

            <div className="flex gap-2 flex-col md:flex-row">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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

              <div className="flex gap-2 flex-col md:flex-row">
                <Button onClick={handleBorrow} disabled={isBorrowing}>
                  {isBorrowing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Borrowing...
                    </>
                  ) : (
                    "Borrow"
                  )}
                </Button>
                <Button onClick={handlePurchase} disabled={isPurchasing}>
                  {isPurchasing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Purchasing...
                    </>
                  ) : (
                    "Buy"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
