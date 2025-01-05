import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function BookCard({ book }) {
  return (
    <Card className="h-full flex flex-col ">
      <div className="relative aspect-[3/4] w-full">
        <img
          src={book?.cover_image_url}
          alt={book?.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">
          {book?.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">by {book?.author}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {book?.description || "No description available"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/books/${book?._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
