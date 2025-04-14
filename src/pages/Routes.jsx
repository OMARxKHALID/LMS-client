import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import About from "./AboutUs";
import Payment from "./Payment";

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
import Earnings from "@/admin/components/Earnings";
import Transactions from "@/admin/components/Transactions";
import BorrowedBooks from "@/admin/components/BorrowedBooks";
import PurchasedBooks from "@/admin/components/PurchasedBooks";
import ManageUsers from "@/admin/components/ManageUsers";
import ReadBook from "@/admin/components/read/ReadBooks";

export const publicRoutes = [
  { path: "/", element: <Home />, showFooter: true },
  { path: "/books", element: <BookCatalog />, showFooter: true },
  { path: "/books/:id", element: <SingleBook />, showFooter: true },
  { path: "/about-us", element: <About />, showFooter: true },
  { path: "/payment", element: <Payment />, showFooter: true },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/request-password-reset", element: <RequestPasswordReset /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
];

export const adminRoutes = [
  { path: "", element: <Dashboard />, roles: ["admin", "user"] },
  { path: "manage-books", element: <ManageBooks />, roles: ["admin"] },
  { path: "create-book", element: <CreateBook />, roles: ["admin"] },
  { path: "edit-book/:id", element: <EditBook />, roles: ["admin"] },
  {
    path: "manage-categories",
    element: <ManageCategories />,
    roles: ["admin"],
  },
  {
    path: "earnings",
    element: <Earnings />,
    roles: ["admin"],
  },
  {
    path: "transactions",
    element: <Transactions />,
    roles: ["admin", "user"],
  },
  {
    path: "borrowed-books",
    element: <BorrowedBooks />,
    roles: ["admin", "user"],
  },
  {
    path: "purchased-books",
    element: <PurchasedBooks />,
    roles: ["admin", "user"],
  },
  {
    path: "read/:id",
    element: <ReadBook />,
    roles: ["admin", "user"],
  },
  {
    path: "manage-users",
    element: <ManageUsers />,
    roles: ["admin"],
  },
  { path: "profile", element: <Profile />, roles: ["admin", "user"] },
];
