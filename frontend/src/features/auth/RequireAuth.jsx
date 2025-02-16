import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.token) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={location} replace />;
};
