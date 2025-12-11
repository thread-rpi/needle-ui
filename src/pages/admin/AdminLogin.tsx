import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/queries";
import { routes } from "../../routes/routePaths";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { 
    isSuccess: isLoginSuccess,
    data: loginData, 
    isError: isLoginError,
    error: loginError, 
    isPending: isLoginPending,
    mutate: loginMutate,
  } = useLogin();

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
    if (isLoginSuccess && loginData) {
      // Store tokens
      localStorage.setItem("token", loginData.accessToken);
      if (loginData.refreshToken) {
        localStorage.setItem("refreshToken", loginData.refreshToken);
      }
      // Redirect to admin page after successful login
      navigate(routes.admin, { replace: true });
    }
  }, [isLoginSuccess, loginData, navigate]);

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
        <div className="flex flex-col items-start gap-3 w-full">
          {/* email */}
          <div className="relative w-full h-[60px] flex items-center px-[17px]">
            <div className="absolute inset-0 bg-white rounded-[15px] shadow-[inset_0px_3px_6px_#0000004c]" />
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
            <div className="absolute inset-0 bg-white rounded-[15px] shadow-[inset_0px_3px_6px_#0000004c]" />
            <input
              type="password"
              placeholder="password"
              className="relative z-10 w-full h-[44px] bg-transparent font-bold text-lg text-thread-red placeholder:text-thread-red focus:placeholder-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* enter button */}
        <button
          onClick={handleLogin}
          disabled={isLoginPending}
          className="mt-2 flex w-auto h-auto items-center justify-center py-3 px-8 bg-thread-red rounded-full hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-bold text-white text-lg">
            {isLoginPending ? "logging in..." : "enter"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
