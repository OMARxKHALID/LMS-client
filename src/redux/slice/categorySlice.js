import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action) {
      const { id, category } = action.payload;
      const index = state.categories.findIndex((cat) => cat._id === id);
      if (index !== -1) {
        state.categories[index] = category;
      }
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const { setCategories, addCategory, updateCategory, removeCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
