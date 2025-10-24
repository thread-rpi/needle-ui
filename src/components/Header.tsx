import { useNavigate } from "react-router-dom";
import headerBg from "../assets/header-bg.svg";
import headerLogo from "../assets/header-logo.svg";
import buttonText from "../assets/buttons-text.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden">
      {/*bg vector*/}
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

      {/*logo*/}
      <img
        src={headerLogo}
        alt="Thread logo"
        className="absolute z-10 object-contain"
        style={{
          left: "2%",
          width: "58px",
          height: "60px",
          top: "10%",
        }}
      />

      {/*buttons text*/}
      <div
        className="absolute z-20 cursor-pointer"
        style={{
          top: "18%",
          left: "63%",
          width: "30vw",
        }}
        onClick={() => navigate("/about")}
      >
        <img
          src={buttonText}
          alt="Curved text"
          className="object-contain w-full h-auto"
        />
      </div>
    </header>
  );
}
