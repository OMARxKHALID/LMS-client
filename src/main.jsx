import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
