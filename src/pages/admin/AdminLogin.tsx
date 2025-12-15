import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin, useCurrentAdminUser } from "../../api/queries";
import { useAuth } from "../../contexts/useAuth";
import { routes } from "../../routes/routePaths";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    // Clear previous errors
    setError("");

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError("please fill in both fields!");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError("please enter a valid email address!");
      return;
    }

    // Only trigger mutation if validation passes
    loginMutate({ email: email.trim(), password });
  };

  // Handle successful login
  useEffect(() => {
    console.log("loginData: ", loginData);
    if (isLoginSuccess && loginData) {
      // Store tokens
      localStorage.setItem("token", loginData.access_token);
      if (loginData.refresh_token) {
        localStorage.setItem("refresh_token", loginData.refresh_token);
      }
      // Invalidate and refetch user query after tokens are stored
      // This ensures the query runs with the new token
      queryClient.invalidateQueries({ queryKey: ["currentAdminUser"] });
    }
  }, [isLoginSuccess, loginData, queryClient]);

  // Handle user data after login
  useEffect(() => {
    console.log("userData: ", userData);
    if (userData) {
      setUser(userData);
      // Redirect to admin page after user data is loaded
      navigate(routes.adminRoot, { replace: true });
    }
  }, [userData, setUser, navigate]);

  // Handle login errors
  useEffect(() => {
    if (isLoginError && loginError) {
      setError(loginError.error || "An error occurred. Please try again.");
    }
  }, [isLoginError, loginError]);

  return (
    <div className="min-h-screen w-full bg-thread-off-white flex items-center justify-center">
      <div className="flex flex-col w-1/2 min-w-max max-w-[400px] items-center gap-5">
        {/* NEEDLE */}
        <div
          className="relative flex items-center justify-center self-stretch font-black text-6xl text-thread-red text-[64px] text-center"
        >
          NEEDLE
        </div>

        {/* error message */}
        {error && (
          <p className="text-md text-thread-red text-center -mt-2 mb-2 font-semibold">
            {error}
          </p>
        )}

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
          <div className="relative w-full h-[60px] flex items-center px-[17px]">
            <div className="absolute inset-0 bg-white rounded-[15px] shadow-[inset_0px_3px_6px_#0000004c]"/>
            <input
              type="email"
              placeholder="email"
              className="relative z-10 w-full h-[44px] bg-transparent font-bold text-lg text-thread-red placeholder:text-thread-red focus:placeholder-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div className="relative w-full h-[60px] flex items-center px-[17px]">
            <div className="absolute inset-0 bg-white rounded-[15px] shadow-[inset_0px_3px_6px_#0000004c]"/>
            <input
              type="password"
              placeholder="password"
              className="relative z-10 w-full h-[44px] bg-transparent font-bold text-lg text-thread-red placeholder:text-thread-red focus:placeholder-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* enter button */}
          <button
            type="submit"
            form="login-form"
            disabled={isLoginPending}
            className="mt-2 flex w-auto h-auto items-center justify-center py-3 px-8 bg-thread-red rounded-full hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="font-bold text-white text-lg">{isLoginPending ? "logging in..." : "enter"}</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
