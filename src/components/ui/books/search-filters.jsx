import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function SearchFilters({
  searchTerm = "",
  onSearchChange,
  selectedCategory = "all",
  onCategoryChange,
  categories = [],
}) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2">
            Search Books
          </Label>
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="search"
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9"
              aria-label="Search books by title, author, or ISBN"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <Label htmlFor="category" className="mb-2">
            Category
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
            aria-label="Filter books by category"
          >
            <SelectTrigger id="category">
              <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No categories available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
