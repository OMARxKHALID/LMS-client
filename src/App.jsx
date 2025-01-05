import { Routes, Route } from "react-router";
import ProtectedRoute from "@/utils/ProtectedRoute";
import AuthRoute from "@/utils/AuthRoute";
import AdminLayout from "@/admin/AdminLayout";
import { publicRoutes, authRoutes, adminRoutes } from "@/pages/Routes";
import Layout from "./Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {publicRoutes.map(({ path, element, showFooter }) => (
          <Route
            key={path}
            path={path}
            element={<Layout showFooter={showFooter}>{element}</Layout>}
          />
        ))}

        {authRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthRoute>
                <Layout>{element}</Layout>
              </AuthRoute>
            }
          />
        ))}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["buyer", "seller"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {adminRoutes.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
              }
            />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
