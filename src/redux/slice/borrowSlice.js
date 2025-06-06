import { createSlice } from "@reduxjs/toolkit";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    borrows: [],
    loading: false,
  },
  reducers: {
    addBorrow: (state, action) => {
      state.borrows.push(action.payload);
    },
    setBorrows: (state, action) => {
      state.borrows = action.payload;
      state.loading = false;
    },
    updateReturnDate: (state, action) => {
      const index = state.borrows.findIndex(
        (borrow) => borrow._id === action.payload._id
      );
      if (index !== -1) {
        state.borrows[index] = {
          ...state.borrows[index],
        };
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBorrows, addBorrow, updateReturnDate, setLoading } =
  borrowSlice.actions;
export default borrowSlice.reducer;
