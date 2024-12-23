import { useDispatch } from "react-redux";
import {
  setCategories,
  addCategory,
  updateCategory as updateCategoryAction,
  removeCategory,
} from "@/redux/slice/categorySlice";

export function useCategory() {
  const BASE_URL = "http://localhost:5000/api/categories";
  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      const response = await fetch(BASE_URL);
      const categories = await response.json();
      dispatch(setCategories(categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Error creating category");
      }

      const newCategory = await response.json();
      dispatch(addCategory(newCategory));
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await fetch(`${BASE_URL}/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Error updating category");
      }

      const updatedCategory = await response.json();
      dispatch(
        updateCategoryAction({ id: categoryId, category: updatedCategory })
      );
      return updatedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting category");
      }

      dispatch(removeCategory(categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  return { getCategories, createCategory, deleteCategory, updateCategory };
}
