import { format } from "date-fns";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionTable = ({ transactions, loading, user }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="mb-4 overflow-hidden border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>{user?.role === "admin" ? "User" : "Price"}</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{transaction._id}</TableCell>
              <TableCell>{transaction.book?.title || "N/A"}</TableCell>
              <TableCell>
                {user?.role === "admin"
                  ? transaction.user?.user_name
                  : `$${transaction.book?.price || 0}`}
              </TableCell>
              <TableCell>${transaction.total_price}</TableCell>
              <TableCell>
                {transaction.payment_details ? (
                  <span
                    className={`text-xs ${
                      transaction.payment_details.card_type === "Invalid Card"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.payment_details.card_type} ••••{" "}
                    {transaction.payment_details.last_four}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Payment information unavailable
                  </span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(transaction.transaction_date), "MMM dd")}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    transaction.status === "success"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
