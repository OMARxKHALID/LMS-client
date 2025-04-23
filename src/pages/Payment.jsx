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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Payment() {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentType, setPaymentType] = useState("full");
  const [installmentPlan, setInstallmentPlan] = useState("3months");

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
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/[^\d]/g, "");
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || "";
      formattedValue = formattedValue.substring(0, 19);
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/[^\d]/g, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2);
      }
      formattedValue = formattedValue.substring(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^\d]/g, "");
    }

    setCardInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const getCardType = (number) => {
    number = number.replace(/\D/g, "");

    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
    };

    if (patterns.visa.test(number)) return "Visa";
    if (patterns.mastercard.test(number)) return "Mastercard";
    if (patterns.amex.test(number)) return "American Express";
    return "Invalid Card";
  };

  const calculateTotalWithInstallment = (price, months) => {
    // Add 5% interest for installment plans
    const interest = 0.05;
    const totalWithInterest = price * (1 + interest);
    return {
      monthly: (totalWithInterest / months).toFixed(2),
      total: totalWithInterest.toFixed(2),
    };
  };

  const getPaymentAmount = () => {
    if (paymentType === "installment") {
      const { monthly } = calculateTotalWithInstallment(
        book.price,
        parseInt(installmentPlan)
      );
      return `${monthly}/mo`;
    }
    return book.price.toFixed(2);
  };

  const getTotalAmount = () => {
    if (paymentType === "installment") {
      const { total } = calculateTotalWithInstallment(
        book.price,
        parseInt(installmentPlan)
      );
      return total;
    }
    return book.price.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardNumberClean = cardInfo.cardNumber.replace(/\s/g, "");
    const cardType = getCardType(cardNumberClean);

    if (!cardInfo.cardHolder.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid card holder name",
        description: "Please enter the card holder name",
      });
      return;
    }

    if (cardType === "Invalid Card") {
      toast({
        variant: "destructive",
        title: "Invalid card number",
        description:
          "For testing, please use one of these numbers:\nVisa: 4111111111111111\nMastercard: 5555555555554444\nAmex: 371449635398431",
      });
      return;
    }

    const [month, year] = cardInfo.expiryDate.split("/");
    if (!month || !year || month > 12 || month < 1) {
      toast({
        variant: "destructive",
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date (MM/YY)",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      const { _id: purchased_by } = user;
      const { _id: purchased_book } = book;

      const purchaseData = {
        purchased_book,
        purchased_by,
        quantity: 1,
        payment_type: paymentType,
        installment_plan:
          paymentType === "installment" ? installmentPlan : null,
        payment_details: {
          last_four: cardNumberClean.slice(-4),
          card_holder: cardInfo.cardHolder,
          expiry_date: cardInfo.expiryDate,
          card_type: cardType,
        },
      };

      await purchaseBook(purchaseData);

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
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Payment Type</Label>
              <RadioGroup
                defaultValue="full"
                onValueChange={setPaymentType}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="full"
                    id="full"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="full"
                    className="flex flex-col h-full p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Full Payment</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        Recommended
                      </span>
                    </div>
                    <span className="text-2xl font-bold">${book.price}</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Pay once, own forever
                    </span>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem
                    value="installment"
                    id="installment"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="installment"
                    className="flex flex-col h-full p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <span className="text-sm font-medium">
                      Installment Plan
                    </span>
                    <span className="text-2xl font-bold">
                      From $
                      {calculateTotalWithInstallment(book.price, 12).monthly}/mo
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Split into easy monthly payments
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentType === "installment" && (
              <div className="p-4 space-y-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Choose Your Plan</h3>
                  <span className="text-xs text-muted-foreground">
                    5% interest applied
                  </span>
                </div>
                <RadioGroup
                  defaultValue="3months"
                  onValueChange={setInstallmentPlan}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  {["3months", "6months", "12months"].map((plan) => {
                    const months = parseInt(plan);
                    const { monthly, total } = calculateTotalWithInstallment(
                      book.price,
                      months
                    );
                    return (
                      <div key={plan} className="relative">
                        <RadioGroupItem
                          value={plan}
                          id={plan}
                          className="sr-only peer"
                        />
                        <Label
                          htmlFor={plan}
                          className="flex flex-col p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        >
                          <span className="text-sm font-medium">
                            {months} Months
                          </span>
                          <span className="mt-1 text-2xl font-bold">
                            ${monthly}
                          </span>
                          <span className="mt-1 text-xs text-muted-foreground">
                            Total: ${total}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <div className="p-4 mt-4 border rounded bg-background">
                  <h4 className="mb-2 text-sm font-medium">Payment Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        First payment today
                      </span>
                      <span className="font-medium">
                        $
                        {
                          calculateTotalWithInstallment(
                            book.price,
                            parseInt(installmentPlan)
                          ).monthly
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monthly payment
                      </span>
                      <span className="font-medium">
                        $
                        {
                          calculateTotalWithInstallment(
                            book.price,
                            parseInt(installmentPlan)
                          ).monthly
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total payment
                      </span>
                      <span className="font-medium">
                        $
                        {
                          calculateTotalWithInstallment(
                            book.price,
                            parseInt(installmentPlan)
                          ).total
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="For testing: 4111111111111111 (Visa)"
                value={cardInfo.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
              />
              <p className="text-xs text-muted-foreground">
                Test Cards:
                <br />
                Visa: 4111111111111111
                <br />
                Mastercard: 5555555555554444
                <br />
                Amex: 371449635398431
              </p>
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
                  Pay ${getPaymentAmount()}
                  {paymentType === "installment" && (
                    <span className="ml-1 text-xs">
                      (Total: ${getTotalAmount()})
                    </span>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
