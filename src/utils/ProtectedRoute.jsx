import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
