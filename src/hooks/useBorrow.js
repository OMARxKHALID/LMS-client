import { useDispatch } from "react-redux";
import {
  setBorrows,
  addBorrow,
  setLoading,
  updateReturnDate,
} from "@/redux/slice/borrowSlice";

export function useBorrow() {
  const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/borrow`;
  const dispatch = useDispatch();

  const getBorrowRecords = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${BASE_URL}/records`);
      const records = await response.json();
      dispatch(setBorrows(records));
    } catch (error) {
      console.error("Error fetching borrow records:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const borrowBook = async (borrowData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.message) {
          throw new Error(result.message);
        } else {
          throw new Error(
            "An unexpected error occurred while borrowing the book."
          );
        }
      }

      dispatch(addBorrow(result.borrow));
      return result;
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  };

  const returnBook = async (borrowId) => {
    try {
      const response = await fetch(`${BASE_URL}/return/${borrowId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Error returning book");
      }

      const data = await response.json();

      // Ensure this is not called multiple times unnecessarily
      if (data.status !== "returned") return;
      dispatch(updateReturnDate(data));
      return data;
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  };

  return { getBorrowRecords, borrowBook, returnBook };
}
