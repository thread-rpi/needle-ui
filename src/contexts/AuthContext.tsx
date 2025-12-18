import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./useAuth";
import { useCurrentAdminUser } from "../api/queries";
import type { AdminUser } from "../types/adminTypes";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<AdminUser | null>(() => {
    // Try to load user from localStorage on initialization
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data: userData, isLoading, isError } = useCurrentAdminUser(!!token);

  // Update user when data is fetched
  useEffect(() => {
    if (userData) {
      setUserState(userData);
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } else if (isError) {
      // If fetching user fails, clear everything
      setUserState(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }, [userData, isError]);

  // Set user manually (useful after login)
  const setUser = useCallback((newUser: AdminUser | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && !!token,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

