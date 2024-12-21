import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock } from "lucide-react";

const UploadedBooksTable = ({ currentUploadedBooks }) => {
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book</TableHead>
            <TableHead>Borrowed By</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUploadedBooks.map((borrow) => {
            const { _id, borrowed_book, borrowed_by, return_date } = borrow;
            return (
              <TableRow key={_id}>
                <TableCell>
                  {borrowed_book ? borrowed_book?.title : "Loading..."}
                </TableCell>
                <TableCell>{borrowed_by.username}</TableCell>
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

export default UploadedBooksTable;
