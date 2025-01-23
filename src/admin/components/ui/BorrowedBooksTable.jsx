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
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const BorrowedBooksTable = ({
  currentBorrows,
  handleReturnBook,
  isReturning,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);

  const handleReturnClick = (_id, borrowed_by) => {
    if (borrowed_by.user_name !== user.user_name) {
      setSelectedBorrow({ _id, borrowed_by });
      setOpen(true);
    } else {
      handleReturnBook(_id, borrowed_by);
    }
  };

  const confirmReturn = () => {
    if (selectedBorrow) {
      handleReturnBook(selectedBorrow._id, selectedBorrow.borrowed_by);
      setOpen(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Borrow Price</TableHead>
            <TableHead>Borrowed By</TableHead>
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
                <TableCell>{borrowed_by.user_name}</TableCell>
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
                    className="cursor"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReturnClick(_id, borrowed_by)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Return</DialogTitle>
            <DialogDescription>
              Do you really want to return the book borrowed by{" "}
              {selectedBorrow?.borrowed_by.user_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReturn}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowedBooksTable;
