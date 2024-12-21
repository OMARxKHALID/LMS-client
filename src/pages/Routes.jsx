import Home from "./Home";
import Login from "./login";
import Register from "./Register";
import RequestPasswordReset from "./RequestPasswordReset";
import ResetPassword from "./ResetPassword";
import Dashboard from "@/admin/Dashboard";
import ManageBooks from "@/admin/components/book/ManageBooks";
import CreateBook from "@/admin/components/book/CreateBook";
import BookCatalog from "@/books/BookCatalog";
import SingleBook from "@/books/SingleBook";
import EditBook from "@/admin/components/book/EditBook";
import ManageCategories from "@/admin/components/category/ManageCategories";
import Profile from "@/admin/components/Profile";

export const publicRoutes = [
  { path: "/", element: <Home />, showFooter: true },
  { path: "/books", element: <BookCatalog />, showFooter: true },
  { path: "/books/:id", element: <SingleBook />, showFooter: true },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/request-password-reset", element: <RequestPasswordReset /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
];

export const adminRoutes = [
  { path: "", element: <Dashboard />, roles: ["buyer", "seller"] },
  { path: "manage-books", element: <ManageBooks />, roles: ["seller"] },
  { path: "create-book", element: <CreateBook />, roles: ["seller"] },
  { path: "edit-book/:id", element: <EditBook />, roles: ["seller"] },
  {
    path: "manage-categories",
    element: <ManageCategories />,
    roles: ["seller"],
  },
  { path: "profile", element: <Profile />, roles: ["buyer", "seller"] },
];
