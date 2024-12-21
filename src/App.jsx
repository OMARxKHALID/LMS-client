import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/utils/ProtectedRoute";
import AuthRoute from "@/utils/AuthRoute";
import AdminLayout from "@/admin/components/AdminLayout";
import { publicRoutes, authRoutes, adminRoutes } from "@/pages/Routes";
import Layout from "./Layout";

function App() {
  return (
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
  );
}

export default App;
