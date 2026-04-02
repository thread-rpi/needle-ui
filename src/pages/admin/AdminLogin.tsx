import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin, useCurrentAdminUser } from "../../api/queries";
import { useAuth } from "../../contexts/useAuth";
import { routes } from "../../routes/routePaths";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const { 
    isSuccess: isLoginSuccess,
    data: loginData, 
    isError: isLoginError,
    error: loginError, 
    isPending: isLoginPending,
    mutate: loginMutate,
  } = useLogin();

  // Fetch user data after successful login
  // Always enabled, but will only fetch when token exists
  const { data: userData } = useCurrentAdminUser(isLoginSuccess && !!loginData);
  

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in both fields.", { id: "admin-login-error" });
      return;
    }

    if (!isValidEmail(email.trim())) {
      toast.error("Please enter a valid email address.", { id: "admin-login-error" });
      return;
    }

    // Only trigger mutation if validation passes
    loginMutate({ email: email.trim(), password });
  };

  // Handle successful login
  useEffect(() => {
    if (isLoginSuccess && loginData) {
      // Store tokens
      localStorage.setItem("token", loginData.access_token);
      if (loginData.refresh_token) {
        localStorage.setItem("refresh_token", loginData.refresh_token);
      }
      // Invalidate and refetch user query after tokens are stored, ensures the query runs with the new token
      queryClient.invalidateQueries({ queryKey: ["currentAdminUser"] });
      toast.success("Logged in successfully!", { duration: 3000 });
    }
  }, [isLoginSuccess, loginData, queryClient]);

  // Handle user data after login
  useEffect(() => {
    if (userData) {
      setUser(userData);
      // Redirect to admin page after user data is loaded
      navigate(routes.adminRoot, { replace: true });
    }
  }, [userData, setUser, navigate]);

  // Handle login errors
  useEffect(() => {
    if (isLoginError && loginError) {
      toast.error(loginError.error || "An error occurred. Please try again.", {
        id: "admin-login-error",
      });
    }
  }, [isLoginError, loginError]);

  return (
    <div className="min-h-dvh w-full bg-thread-off-white flex items-center justify-center">
      <div className="flex flex-col w-1/2 min-w-max max-w-[400px] items-center gap-5">
        {/* NEEDLE */}
        <div
          className="relative flex items-center justify-center self-stretch font-black text-6xl text-thread-red text-[64px] text-center"
        >
          NEEDLE
        </div>

        {/* inputs */}
        <form 
          id="login-form" 
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }} 
          className="flex flex-col items-center gap-3 w-full"
        >
          {/* email */}
          <div className="relative w-full h-14 flex items-center px-[17px]">
            <div className="absolute inset-0 bg-thread-off-white border-b-1 border-black"/>
            <input
              type="email"
              placeholder="email"
              className="relative z-10 w-full h-full bg-transparent font-bold text-lg text-thread-red placeholder:text-thread-red focus:placeholder-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div className="relative w-full h-14 flex items-center px-[17px]">
            <div className="absolute inset-0 bg-thread-off-white border-b-1 border-black"/>
            <input
              type="password"
              placeholder="password"
              className="relative z-10 w-full h-full bg-transparent font-bold text-lg text-thread-red placeholder:text-thread-red focus:placeholder-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* enter button */}
          <button
            type="submit"
            form="login-form"
            disabled={isLoginPending}
            className="mt-2 flex w-auto h-auto items-center justify-center py-3 px-8 border-1 text-thread-red border-black hover:bg-thread-red hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="font-bold  text-lg">{isLoginPending ? "logging in..." : "enter"}</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
