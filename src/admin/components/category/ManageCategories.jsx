import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";
import { useCategory } from "@/hooks/useCategory";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ManageCategories() {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getCategories, createCategory, updateCategory, deleteCategory } =
    useCategory();
  const { categories } = useSelector((state) => state.categories);
  const { toast } = useToast();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Category name cannot be empty.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateCategory(editingCategory._id, { name: newCategory });
        toast({
          title: "Success",
          description: "Category updated successfully.",
        });
      } else {
        await createCategory({ name: newCategory });
        toast({
          title: "Success",
          description: "New category created successfully.",
        });
      }
      resetForm();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Unable to delete category.",
      });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setNewCategory("");
    setEditingCategory(null);
  };

  return (
    <div className="container mx-auto py-10">
      {/* Header Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Organize your categories with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
            <Input
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  {isEditing ? "Update" : "Create"}
                </>
              )}
            </Button>
            {isEditing && (
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </form>

          {/* Categories Table */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan="2" className="text-center">
                          No categories available.
                        </TableCell>
                      </TableRow>
                    ) : (
                      categories.map((category) => (
                        <TableRow key={category._id}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell className="flex justify-end gap-2 mr-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(category)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(category._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
