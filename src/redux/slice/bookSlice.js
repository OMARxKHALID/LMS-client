import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
    updateBook: (state, action) => {
      console.log("Redux: Updating book in state:", action.payload);
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      console.log("Found book at index:", index);
      if (index !== -1) {
        state.books[index] = action.payload;
        console.log("Book updated in redux state");
      }
    },
    purchasedBook: (state, action) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        // Update total_copies and available_copies based on the purchase quantity
        const purchasedQuantity = action.payload.quantity;

        state.books[index].total_copies -= purchasedQuantity;
        state.books[index].available_copies -= purchasedQuantity;

        // Update other properties if necessary (price, etc.)
        state.books[index] = {
          ...state.books[index],
          ...action.payload,
        };
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setBooks,
  addBook,
  removeBook,
  setLoading,
  updateBook,
  purchasedBook,
} = bookSlice.actions;

export default bookSlice.reducer;
