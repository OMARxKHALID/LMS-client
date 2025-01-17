import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const UploadedBooksTable = ({ currentUploadedBooks }) => {
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
          {currentUploadedBooks.map((borrow) => {
            const {
              _id,
              borrowed_book,
              borrowed_by,
              borrowed_date,
              expected_return_date,
              return_date,
              total_price,
              total_borrow_price,
              late_fine,
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
                <TableCell>{borrowed_by?.user_name || "Unknown"}</TableCell>
                <TableCell>
                  {borrowed_date
                    ? format(new Date(borrowed_date), "MMM dd")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {expected_return_date
                    ? format(new Date(expected_return_date), "MMM dd")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {return_date
                    ? format(new Date(return_date), "MMM dd")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  ${late_fine ? late_fine.toFixed(2) : "0.00"}
                </TableCell>
                <TableCell>
                  {return_date ? (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Returned
                    </span>
                  ) : (
                    <span className=" inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-700">
                      Borrowed
                    </span>
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
