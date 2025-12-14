import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../routes/routePaths";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute component that checks for authentication token, redirects to /login if user is not authenticated
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  if (!token) return <Navigate to={routes.login} state={{ from: location }} replace />;

  return <>{children}</>;
}
