import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PDFViewer from "./PDFViewer";

const ReadBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { borrows } = useSelector((state) => state.borrow);
  const book = borrows.find(
    (borrow) => borrow.borrowed_book?._id === id || borrow._id === id
  );
  const pdfURL = book?.borrowed_book?.pdf_files?.[0];

  if (!pdfURL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>PDF Not Available</AlertTitle>
          <AlertDescription>
            The PDF file for this book is not available.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {book?.borrowed_book?.title || "Untitled"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {book?.borrowed_book?.author || "Unknown Author"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <PDFViewer pdfURL={pdfURL} />
    </>
  );
};

export default ReadBooks;
