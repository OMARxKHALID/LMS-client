import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Clock } from "lucide-react";
import { format, isPast } from "date-fns";

const BorrowedBooksTable = ({
  currentBorrows,
  handleReturnBook,
  isReturning,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Borrow Price</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBorrows.map((borrow, index) => {
            const {
              _id,
              borrowed_book,
              expected_return_date,
              total_borrow_price,
              total_price,
              borrowed_by,
            } = borrow;

            const isOverdue = isPast(new Date(expected_return_date));

            return (
              <TableRow key={_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {borrowed_book ? borrowed_book?.title : "Loading..."}
                </TableCell>
                <TableCell>${total_price}</TableCell>
                <TableCell>${total_borrow_price}</TableCell>
                <TableCell>
                  {expected_return_date
                    ? format(new Date(expected_return_date), "MMM dd")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {isOverdue ? (
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                      <span className="text-destructive">Overdue</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">Due soon</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      handleReturnBook(_id, borrowed_by);
                    }}
                    disabled={isReturning === _id || status === "returned"}
                  >
                    {isReturning === _id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Return"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowedBooksTable;
