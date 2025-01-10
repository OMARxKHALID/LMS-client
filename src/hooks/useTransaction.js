import { useDispatch } from "react-redux";
import {
  setTransactions,
  addTransaction,
  removeTransaction,
  updateTransaction,
  setLoading,
} from "@/redux/slice/transactionSlice";

export function useTransaction() {
  const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/transactions`;
  const dispatch = useDispatch();

  const getTransactions = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(BASE_URL);
      const transactions = await response.json();
      dispatch(setTransactions(transactions));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error("Error creating transaction");
      }

      const newTransaction = await response.json();
      dispatch(addTransaction(newTransaction));
      return newTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${BASE_URL}/${transactionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting transaction");
      }

      dispatch(removeTransaction(transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  const editTransaction = async (transactionId, transactionData) => {
    try {
      const response = await fetch(`${BASE_URL}/${transactionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error("Error updating transaction");
      }

      const updatedTransaction = await response.json();
      dispatch(updateTransaction(updatedTransaction));
      return updatedTransaction;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };

  return {
    getTransactions,
    createTransaction,
    deleteTransaction,
    editTransaction,
  };
}
