import { useDispatch } from "react-redux";
import {
  setBorrows,
  addBorrow,
  setLoading,
  updateReturnDate,
} from "@/redux/slice/borrowSlice";

export function useBorrow() {
  const BASE_URL = "http://localhost:5000/api/borrow";
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

      if (!response.ok) {
        throw new Error("Error borrowing book");
      }

      const newBorrow = await response.json();
      dispatch(addBorrow(newBorrow.borrow));
      return newBorrow;
    } catch (error) {
      console.error("Error borrowing book:", error);
      throw error;
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

      const updatedBorrow = await response.json();
      console.log("🚀 ~ returnBook ~ updatedBorrow:", updatedBorrow)
      dispatch(updateReturnDate(updatedBorrow.borrow));
      return updatedBorrow;
    } catch (error) {
      console.error("Error returning book:", error);
      throw error;
    }
  };

  return { getBorrowRecords, borrowBook, returnBook };
}
