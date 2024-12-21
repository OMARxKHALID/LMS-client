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

const TotalBorrowedBooksTable = ({ currentTotalBorrowedBooks }) => {
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book</TableHead>
            <TableHead>Borrowed Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTotalBorrowedBooks.map((borrow) => {
            const { _id, borrowed_book, expected_return_date, return_date } =
              borrow;
            return (
              <TableRow key={_id}>
                <TableCell>
                  {borrowed_book ? borrowed_book?.title : "Loading..."}
                </TableCell>
                <TableCell>
                  {format(new Date(expected_return_date), "MMM dd, yyyy")}
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
