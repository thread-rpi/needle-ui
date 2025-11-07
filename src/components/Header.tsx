import { useNavigate } from "react-router-dom";
import headerBg from "../assets/header-bg.svg";
import headerLogo from "../assets/header-logo.svg";

export default function Header() {
  const navigate = useNavigate();

  // one source of truth for the nav items
  const items: { label: string; to: string; offset: string }[] = [
    { label: "About Us", to: "/about", offset: "12%" },
    { label: "Featured", to: "/features", offset: "36%" },
    { label: "Calendar", to: "/calendar", offset: "58%" },
    { label: "Publications", to: "/publications", offset: "78%" },
  ];

  return (
    <header className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden">
      {/* background ribbon svg */}
      <img
        src={headerBg}
        alt="Header background shape"
        className="absolute z-0 object-contain"
        style={{
          top: "0%",
          right: "0",
          width: "50vw",
          height: "auto",
        }}
      />

      {/* logo */}
      <img
        src={headerLogo}
        alt="Thread logo"
        className="absolute z-20 object-contain"
        style={{
          left: "2%",
          width: "58px",
          height: "60px",
          top: "10%",
        }}
      />

      {/* curved nav text */}
      <svg
        className="absolute z-30 pointer-events-auto"
        viewBox="87 45 800 200"
        style={{
          top: 0,
          right: "-8%",
          width: "50vw",
          height: "100%",
        }}
      >
        {/* path the text follows */}
        <path
          id="header-curve"
          fill="none"
          stroke="transparent"
          strokeWidth="50"
          d="M25.4723 -14.0002C105.972 121 458.801 45.6849 568.972 60.4998C679.143 75.3147 684.472 105 747.972 105"
        />

        <text
          className="select-none"
          style={{
            fontSize: "14px",
            fill: "#FFFFFF",
            fontWeight: 600,
            transform: "translateY(12px)",
          }}
        >
          {items.map((item) => (
            <textPath
              key={item.label}
              href="#header-curve"
              startOffset={item.offset}
              onClick={() => navigate(item.to)}
              style={{ cursor: "pointer" }}
            >
              {item.label}
            </textPath>
          ))}
        </text>
      </svg>
    </header>
  );
}
