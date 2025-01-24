import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookReducer from "./slice/bookSlice";
import categoryReducer from "./slice/categorySlice";
import borrowReducer from "./slice/borrowSlice";
import earningReducer from "./slice/earningSlice";
import transactionReducer from "./slice/transactionSlice";

const loadPreloadedState = () => {
  try {
    const savedState = localStorage.getItem("reduxState");
    return savedState ? JSON.parse(savedState) : undefined;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const preloadedState = loadPreloadedState();

const combinedReducer = {
  auth: authReducer,
  books: bookReducer,
  categories: categoryReducer,
  borrow: borrowReducer,
  earning: earningReducer,
  transactions: transactionReducer,
};

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    // Clear localStorage
    localStorage.removeItem("reduxState");
    // Reset state of all reducers
    state = undefined;
  }
  return Object.keys(combinedReducer).reduce((acc, key) => {
    acc[key] = combinedReducer[key](state?.[key], action);
    return acc;
  }, {});
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Save entire state to localStorage on updates
store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});
