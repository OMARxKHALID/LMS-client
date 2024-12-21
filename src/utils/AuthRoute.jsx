import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
