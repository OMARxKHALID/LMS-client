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
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBooks, addBook, removeBook, setLoading, updateBook } =
  bookSlice.actions;
export default bookSlice.reducer;
