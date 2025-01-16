import { Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUser } from "@/redux/slice/authSlice";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.status === "inactive") {
      dispatch(clearUser());
    }
  }, [user, dispatch]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.status === "inactive") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
