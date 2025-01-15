import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate, useParams } from "react-router";
import { useBook } from "@/hooks/useBook";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import Dropzone from "@/components/ui/dropzone";
import { useCloudinary } from "@/hooks/useCloudinary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCategory } from "@/hooks/useCategory";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  publisher: z.string().min(1, "Publisher is required"),
  publication_date: z.string().min(1, "Publication date is required"),
  description: z.string().min(1, "Description is required"),
  cover_image_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  total_copies: z.coerce
    .number()
    .min(1, "Must have at least one copy")
    .max(100, "Cannot exceed 100 copies"),
  category: z.string().min(1, "Category is required"),
  pdf_files: z.array(z.any()).optional(),
  price: z.coerce.number().optional(),
  borrow_fine: z.coerce.number().optional(),
  borrow_price: z.coerce.number().optional(),
});

export default function EditBook() {
  const [isPending, startTransition] = useTransition();
  const { categories } = useSelector((state) => state.categories);
  const { books } = useSelector((state) => state.books);
  const { editBook } = useBook();
  const { createCategory, getCategories } = useCategory();
  const navigate = useNavigate();
  const { id } = useParams();

  const { toast } = useToast();
  const { uploadToCloudinary, isUploading } = useCloudinary();
  const [pdfs, setPdfs] = useState([]);

  const book = books.find((book) => {
    return book._id === id;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publication_date: "",
      description: "",
      pdf_files: [],
      cover_image_url: "",
      total_copies: 1,
      category: "",
      price: 0,
      borrow_fine: 0,
      borrow_price: 0,
    },
  });

  useEffect(() => {
    if (book && !form.getValues().title) {
      form.reset({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publisher: book.publisher,
        publication_date: book.publication_date,
        description: book.description,
        pdf_files: book.pdf_files || [],
        cover_image_url: book.cover_image_url || "",
        total_copies: book.total_copies,
        category: book.category || "",
        price: book.price || 0,
        borrow_fine: book.borrow_fine || 0,
        borrow_price: book.borrow_price || 0,
      });

      if (book.pdf_files && book.pdf_files.length > 0) {
        const existingPdfs = book.pdf_files.map((url, index) => {
          const fileName =
            url.split("/").pop() || `existing-pdf-${index + 1}.pdf`;

          return {
            name: fileName,
            preview: url,
            size: 0,
            type: "application/pdf",
            isExisting: true,
          };
        });

        setPdfs(existingPdfs);
      }
    }
  }, [book, form]);

  const onSubmit = async (data) => {
    startTransition(async () => {
      try {
        const newPdfs = pdfs.filter((pdf) => !pdf.isExisting);
        let pdfUrls = data.pdf_files || [];

        if (newPdfs.length > 0) {
          const newPdfUrls = await uploadToCloudinary(newPdfs);
          pdfUrls = [
            ...pdfs.filter((pdf) => pdf.isExisting).map((pdf) => pdf.preview),
            ...newPdfUrls,
          ];
        } else {
          pdfUrls = pdfs.map((pdf) => pdf.preview);
        }

        const formData = {
          ...data,
          pdf_files: pdfUrls,
        };

        if (!data.title || !data.author) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Title and Author are required fields.",
          });
          return;
        }

        await editBook(id, formData);
        toast({
          title: "Book updated successfully",
          description: "The book has been updated in the catalog.",
        });
        navigate("/admin/manage-books");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update book. Please try again.",
        });
        console.error("Error updating book:", error);
      }
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      await createCategory({ name: newCategory });
      toast({
        title: "Category added successfully",
        description: "The new category has been created.",
      });
      setNewCategory("");
      setDialogOpen(false);
      await getCategories();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to create category. Please try again.",
      });
    }
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-x-6">
        <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter publisher name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publication_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date.toISOString());
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex gap-2">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter category name"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddCategory();
                                }
                              }}
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={handleAddCategory}
                            className="w-full"
                          >
                            Add Category
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter book price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="borrow_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Borrow Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter borrow price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="borrow_fine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Borrow Fine</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter borrow fine"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter book description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover_image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cover image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Book Data (PDF)</FormLabel>
            <Dropzone
              pdfs={pdfs}
              setPdfs={setPdfs}
              handleDrop={(acceptedFiles) => {
                setPdfs((prev) => [...prev, ...acceptedFiles]);
              }}
              isUploading={isUploading}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/admin/manage-books">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Book...
                </>
              ) : (
                "Update Book"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
