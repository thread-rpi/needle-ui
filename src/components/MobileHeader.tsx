import { useNavigate } from "react-router-dom";
import { headerRoutes, routes } from "../routes/routePaths";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

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
    console.log('hamburgerMenuOpen: ', hamburgerMenuOpen);
  }, [hamburgerMenuOpen]);

  return (
    <header 
      className={`z-200 w-full fixed top-0 left-0 flex items-center justify-between p-7 transition-all duration-300 ease-in-out mix-blend-exclusion
        
     `}
     >
      {/* menu icon button */}
      <button
        onClick={handleMenuClick}
        className={`relative z-30 flex items-center justify-center transition-all duration-300
          ${hamburgerMenuOpen ? 'w-9.5 h-9.5' : 'w-8 h-8'} 
        `}
        aria-label="Toggle menu"
      >
      
        <div className='relative w-full h-full'>
          {/* hamburger menu icon */}
          <Icon 
            icon="icon-park-outline:hamburger-button" width="100%" height="100%" color='white'
            className={`absolute transition-all duration-300 mix-blend-exclusion ${
              hamburgerMenuOpen 
                ? 'opacity-0 rotate-90 scale-0' 
                : 'opacity-100 rotate-0 scale-100'
            }`}
          />

          {/* close icon */}
          <Icon 
            icon="entypo:cross" width="100%" height="100%" color='black' 
            className={`absolute transition-all duration-300 object-center ${
              hamburgerMenuOpen 
                ? 'opacity-100 rotate-0 scale-100'  
                : 'opacity-0 -rotate-90 scale-0'
            }`}
          />
        </div>
      </button>

      {/* THE THREAD text */}
      <div 
        className={`z-50 font-bold text-2xl text-white tracking-[1.28px] whitespace-nowrap relative font-futura transition-all duration-300 mix-blend-exclusion`}
        onClick={() => handleNavClick(routes.root)}
      >THE THREAD</div>

      {/* dropdown menu */}
      <div className={`fixed top-0 left-0 pb-20 px-10 w-full h-full bg-white z-25 flex flex-col items-start justify-end transition-all duration-300 ease-in-out mix-blend-normal ${
        hamburgerMenuOpen 
          ? 'translate-y-0 opacity-100' 
          : 'opacity-0 pointer-events-none duration-500 ease-in-out'
      }`}>
        <nav className="flex flex-col z-25">
          <button
            key='home'
            onClick={() => handleNavClick(routes.root)}
            className={`py-7 text-left text-black font-bold text-2xl transition-all duration-600 ease-in-out ${
              hamburgerMenuOpen 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
            style={{
              transitionDelay: hamburgerMenuOpen ? `${menuTransitionDelay}ms` : '0ms'
            }}
          >
            {'HOME'}
          </button>
          {(headerRoutes).map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`py-7 text-left text-black font-bold text-2xl transition-all duration-600 ease-in-out ${
                hamburgerMenuOpen 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{
                transitionDelay: hamburgerMenuOpen ? `${((index+1) * 50) + menuTransitionDelay}ms` : '0ms'
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

