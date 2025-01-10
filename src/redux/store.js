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
    const stateToPersist = {
      auth: state.auth,
    };
    localStorage.setItem("reduxState", JSON.stringify(stateToPersist));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const preloadedState = loadPreloadedState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    categories: categoryReducer,
    borrow: borrowReducer,
    earning: earningReducer,
    transactions: transactionReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Save state to localStorage on updates
store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});
