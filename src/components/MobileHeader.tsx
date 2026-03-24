import { useNavigate } from "react-router-dom";
import { headerRoutes, routes } from "../routes/routePaths";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import mobileHeaderLogo from "../assets/mobile-header-logo.svg";

export default function MobileHeader() {
  const navigate = useNavigate();
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const menuTransitionDelay = 100;

  const handleMenuClick = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setHamburgerMenuOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    if (hamburgerMenuOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [hamburgerMenuOpen]);

  return (
    <>
      <header className="z-200 w-full h-26 fixed top-0 left-0 py-6 px-8 pointer-events-none mix-blend-exclusion">
        <div className="w-full h-full flex items-center justify-between pointer-events-auto">
          {/* menu button container */}
          <button
            onClick={handleMenuClick}
            className={`relative z-30 flex items-center justify-center transition-all duration-300 
              ${hamburgerMenuOpen ? 'w-9.5 h-9.5' : 'w-8 h-8'}`}
            aria-label="Toggle menu"
          >
            <div className='relative w-full h-full'>
              {/* hamburger menu icon */}
              <Icon
                icon="icon-park-outline:hamburger-button" width="100%" height="100%" color='white'
                className={`absolute transition-all duration-300 ${
                  hamburgerMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
              />

              {/* close icon */}
              <Icon
                icon="entypo:cross" width="100%" height="100%" color='white'
                className={`absolute transition-all duration-300 object-center ${
                  hamburgerMenuOpen ? 'opacity-100 rotate-0 scale-105' : 'opacity-0 -rotate-90 scale-0'}`}
              />
            </div>
          </button>

           {/* THE THREAD logo */}
          <img
            src={mobileHeaderLogo}
            alt="Thread logo"
            className="z-50 w-auto h-full object-contain cursor-pointer"
            onClick={() => navigate(routes.root)}
          />
        </div>
      </header>

      {/* dropdown menu */}
      <div className={`fixed top-0 left-0 px-10 w-full h-full bg-white z-190 flex flex-col items-start justify-end transition-all duration-300 ease-in-out mix-blend-normal ${
        hamburgerMenuOpen ? 'translate-y-0 opacity-100' : 'opacity-0 pointer-events-none duration-500 ease-in-out'}`}>
        <nav className="flex flex-col z-25">
          <button
            key='home'
            onClick={() => handleNavClick(routes.root)}
            className={`py-7 text-left text-black font-bold text-2xl transition-all duration-600 ease-in-out ${
              hamburgerMenuOpen ? 'opacity-100': 'opacity-0'}`}
            style={{transitionDelay: hamburgerMenuOpen ? `${menuTransitionDelay}ms` : '0ms'}}
          >
            {'HOME'}
          </button>
          {(headerRoutes).map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`py-7 text-left text-black font-bold text-2xl transition-all duration-600 ease-in-out ${
                hamburgerMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              style={{transitionDelay: hamburgerMenuOpen ? `${((index+1) * 50) + menuTransitionDelay}ms` : '0ms'}}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
