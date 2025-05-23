import { useDispatch } from "react-redux";
import {
  setBooks,
  addBook,
  removeBook,
  setLoading,
  updateBook,
  purchasedBook,
} from "@/redux/slice/bookSlice";

export function useBook() {
  const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/books`;
  const dispatch = useDispatch();

  const getBooks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(BASE_URL);
      const books = await response.json();
      dispatch(setBooks(books));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createBook = async (bookData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Error creating book");
      }

      const newBook = await response.json();
      dispatch(addBook(newBook));
      return newBook;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`${BASE_URL}/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting book");
      }

      dispatch(removeBook(bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  };

  const editBook = async (bookId, bookData) => {
    console.log("Starting book edit for ID:", bookId);
    console.log("Book data to send:", bookData);

    try {
      const response = await fetch(`${BASE_URL}/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      console.log("Edit book response status:", response.status);

      if (!response.ok) {
        throw new Error("Error updating book");
      }

      const updatedBook = await response.json();
      console.log("Response from server:", updatedBook);
      console.log("Dispatching updateBook action...");
      dispatch(updateBook(updatedBook));
      return updatedBook;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  };

  const purchaseBook = async (purchasedBookData) => {
    try {
      const response = await fetch(`${BASE_URL}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchasedBookData),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.message) {
          throw new Error(result.message);
        } else {
          throw new Error(
            "An unexpected error occurred while purchasing the book."
          );
        }
      }

      const updatedBook = result;

      dispatch(purchasedBook(updatedBook));
      return updatedBook;
    } catch (error) {
      console.error("Error purchasing a book:", error);
      throw error;
    }
  };

  return { getBooks, createBook, deleteBook, editBook, purchaseBook };
}
