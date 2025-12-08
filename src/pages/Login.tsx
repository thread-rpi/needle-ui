import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("[please fill in both fields]");
      return;
    }
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f2f2] flex items-center justify-center">
      <div className="flex flex-col w-[390px] items-center gap-[20px]">
        {/* NEEDLE */}
        <div
          className="relative flex items-center justify-center self-stretch
                     font-gabarito font-black
                     text-[#af1e2d] text-[64px] text-center leading-[normal]"
        >
          NEEDLE
        </div>

        {/* error message */}
        {error && (
          <p
            className="text-[12px] text-[#af1e2d] text-center -mt-2 mb-2
                       font-gabarito font-bold"
          >
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
              className="relative z-10 w-full h-[44px] bg-transparent
                         font-gabarito font-bold
                         text-[#af1e2d] placeholder:text-[#af1e2d]
                         text-[16px] outline-none"
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
              className="relative z-10 w-full h-[44px] bg-transparent
                         font-gabarito font-bold
                         text-[#af1e2d] placeholder:text-[#af1e2d]
                         text-[16px] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* enter button */}
        <button
          onClick={handleLogin}
          className="mt-2 flex w-52 h-12 items-center justify-center px-[17px]
                     bg-[#af1e2d] rounded-[20px]"
        >
          <span
            className="font-gabarito font-bold
                       text-white text-[16px] leading-[normal]"
          >
            enter
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
