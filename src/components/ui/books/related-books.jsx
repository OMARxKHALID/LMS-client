import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookCard from "./book-card";
import { BookOpen } from "lucide-react";

export default function RelatedBooks({ books = [], currentBookId }) {
  // Filter out current book and get up to 4 related books
  const relatedBooks = books
    ?.filter((book) => book._id !== currentBookId)
    .slice(0, 4);

  if (!books?.length || relatedBooks.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="py-16 bg-gradient-to-b from-background to-muted/50"
    >
      <div className="container px-4">
        <Card className="backdrop-blur-sm border-border/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Related Books
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
