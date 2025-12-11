import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../routes/routePaths";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that checks for authentication token.
 * Redirects to /login if user is not authenticated.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  if (!token) {
    // Redirect to login page, preserving the attempted location
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
