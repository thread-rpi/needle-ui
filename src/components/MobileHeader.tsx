import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/header-logo.svg";
import { headerRoutes } from "../routes/routePaths";
import { useState } from "react";

export default function MobileHeader() {
  const navigate = useNavigate();
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  return (
    <header className="z-200 w-full h-[130px] fixed top-0 left-0 flex flex-row items-start justify-between overflow-hidden ">
      {/* logo */}
      <img src={headerLogo} alt="Thread logo" className="z-20 w-max h-auto object-contain object-center px-5 py-4.5"/>
      
      <div className="w-max h-auto relative">
        {/* background ribbon svg */}
        <svg xmlns="http://www.w3.org/2000/svg" width="167" height="119" viewBox="0 0 167 119" fill="none">
        <path id="header-thread-mobile" d="M31.7656 -8C40.7656 78.5 191.266 83 191.266 83" stroke="#AF1E2D" stroke-width="50"/>
            <text className="select-none" style={{ fontSize: "14px", fill: "#FFFFFF", fontWeight: 800, dominantBaseline: "middle" }}>
            <textPath
                  href="#header-thread-mobile"
                  onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
                  className="cursor-pointer"
                  startOffset="30%"
                >
                {hamburgerMenuOpen ? "Close" : "Menu"}
                </textPath>
            </text>
        </svg>
      </div>
    </header>
  );
}

