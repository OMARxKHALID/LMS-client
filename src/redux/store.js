import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookReducer from "./slice/bookSlice";
import categoryReducer from "./slice/categorySlice";
import borrowReducer from "./slice/borrowSlice";
import earningReducer from "./slice/earningSlice";

const preloadedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    categories: categoryReducer,
    borrow: borrowReducer,
    earning: earningReducer,
  },
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
});
