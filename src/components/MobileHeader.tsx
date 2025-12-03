import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/header-logo.svg";

export default function MobileHeader() {
  const navigate = useNavigate();

  //one source of truth for the nav items
  const items: { label: string; to: string }[] = [
    { label: "About Us", to: "/about" },
    { label: "Featured", to: "/features" },
    { label: "Calendar", to: "/calendar" },
    { label: "Publications", to: "/publications" },
  ];

  return (
    <header className="z-200 w-full h-max fixed top-0 left-0 flex h-[80px] bg-white border-b border-gray-200 shadow-sm">
      {/* logo */}
      <img
        src={headerLogo}
        alt="Thread logo"
        className="absolute z-20 object-contain"
        style={{
          left: "2%",
          width: "48px",
          height: "50px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      {/* Mobile navigation menu */}
      <nav className="flex-1 flex items-center justify-end pr-4">
        <div className="flex gap-4">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

