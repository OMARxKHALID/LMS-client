import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useBook } from "@/hooks/useBook";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard } from "lucide-react";
import { updateBook } from "@/redux/slice/bookSlice";
import { updateUser } from "@/redux/slice/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Payment() {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { purchaseBook } = useBook();
  const { user } = useSelector((state) => state.auth);
  const book = location.state?.book;

  if (!book) {
    navigate("/books");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !cardInfo.cardNumber ||
      !cardInfo.cardHolder ||
      !cardInfo.expiryDate ||
      !cardInfo.cvv
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all card details",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      const { _id: purchased_by } = user;
      const { _id: purchased_book } = book;

      await purchaseBook({
        purchased_book,
        purchased_by,
        quantity: 1,
      });

      const updatedBook = {
        ...book,
        available_copies: book.available_copies - 1,
        total_copies: book.total_copies - 1,
      };

      dispatch(updateBook(updatedBook));
      dispatch(
        updateUser({
          ...user,
          purchased_books: [...user.purchased_books, book._id],
        })
      );

      toast({
        title: "Purchase Successful",
        description: `${book.title} has been purchased successfully.`,
      });
      navigate("/admin/purchased-books");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description: error.message || "An error occurred during purchase",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="container max-w-2xl px-4 py-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Purchase</CardTitle>
          <CardDescription>
            Enter your card details to purchase {book.title} for ${book.price}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardInfo.cardNumber}
                onChange={handleInputChange}
                maxLength={16}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardHolder">Card Holder Name</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="John Doe"
                value={cardInfo.cardHolder}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardInfo.expiryDate}
                  onChange={handleInputChange}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardInfo.cvv}
                  onChange={handleInputChange}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPurchasing}>
              {isPurchasing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ${book.price}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
