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

const TransactionTable = ({ transactions, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{transaction._id}</TableCell>
              <TableCell>{transaction.book.title}</TableCell>
              <TableCell>{transaction.user.user_name}</TableCell>
              <TableCell>${transaction.total_price}</TableCell>
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
