import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";

const TotalBorrowedBooksTable = ({ currentTotalBorrowedBooks = [] }) => {
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Borrow Price</TableHead>
            <TableHead>Borrowed By</TableHead>
            <TableHead>Borrowed Date</TableHead>
            <TableHead>Expected Return Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Fine</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTotalBorrowedBooks.map((borrow) => {
            const {
              _id,
              borrowed_book,
              borrowed_by,
              borrowed_date,
              expected_return_date,
              return_date,
              total_price,
              total_borrow_price,
              total_borrowed_fine,
            } = borrow;

            return (
              <TableRow key={_id}>
                <TableCell>{borrowed_book?.title || "Loading..."}</TableCell>
                <TableCell>
                  ${total_price ? total_price.toFixed(2) : "N/A"}
                </TableCell>
                <TableCell>
                  ${total_borrow_price ? total_borrow_price.toFixed(2) : "N/A"}
                </TableCell>
                <TableCell>{borrowed_by?.username || "Unknown"}</TableCell>
                <TableCell>
                  {borrowed_date
                    ? format(new Date(borrowed_date), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {expected_return_date
                    ? format(new Date(expected_return_date), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {return_date
                    ? format(new Date(return_date), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  $
                  {total_borrowed_fine
                    ? total_borrowed_fine.toFixed(2)
                    : "0.00"}
                </TableCell>
                <TableCell>
                  {return_date ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-500">Returned</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-yellow-500">Borrowed</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TotalBorrowedBooksTable;
