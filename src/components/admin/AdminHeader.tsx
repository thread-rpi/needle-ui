import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { adminHeaderRoutes } from "../../routes/routePaths";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const [activeRoute, setActiveRoute] = useState(adminHeaderRoutes[0].path);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="z-200 w-full h-max fixed top-0 left-0 flex justify-center overflow-visible ">
    <div className="w-full h-14 flex items-center justify-center bg-thread-off-white border-b-1 border-black px-5 py-2.5 overflow-visible">
      <div className="w-full h-full flex flex-row items-center justify-between gap-3">

        {/* header left - navbar */}
        <div className="w-max min-w-0 flex flex-row items-center justify-start gap-0.5 shrink-0">
          <div className="font-extrabold text-2xl h-max py-4 pr-2 text-thread-red uppercase">NEEDLE</div>
          {adminHeaderRoutes.map((route) => (
            <Link className="w-max h-full" to={route.path} key={route.label} onClick={() => setActiveRoute(route.path)}>
              <div className={`z-10 relative text-xl font-bold text-black px-2 py-1.5 flex items-center justify-center transition-all duration-300
                ${activeRoute === route.path ? 'text-thread-red scale-125' : 'text-black'}`}>
                <div className={`flex items-center justify-center transition-all duration-300`}>
                  <Icon inline={true} icon={route.icon}/>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* header middle - current user info (centered) */}
        <div 
          className="relative flex flex-col items-center self-start overflow-visible min-w-0"
          onMouseEnter={() => setLogoutVisible(true)}
          onMouseLeave={() => setLogoutVisible(false)}
        >
          <div className="w-auto h-10 flex flex-row items-center gap-1.5 justify-center">
            <div className="font-bold text-lg align-text-bottom w-max"> {user?.role.toLowerCase()} </div>
            <div className="font-extrabold text-xl text-thread-red w-max"> {user?.name} </div>
          </div>
          
          {/* Logout dropdown */}
          <div 
            className={`w-max mt-5 bg-white border-1 border-black py-1.5 transition-all duration-250 ease-in-out ${
              logoutVisible ? 'z-0 opacity-100 translate-y-0' : 'z-[-10] opacity-0 -translate-y-5 pointer-events-none'
            }`}
          >
            <button
              onClick={handleLogout}
              className="w-full px-4 py-1 text-left text-md font-bold text-black hover:text-thread-red transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="basil:logout-solid" className="w-5 h-5" />
              logout
            </button>
          </div>
        </div>

        {/* header right - search bar */}
        <div className="w-max min-w-0 flex flex-row items-center gap-2 shrink-0">
          <div className="flex items-center border-b border-black bg-transparent">
            <Icon icon="fluent:search-24-filled" className="w-6 h-6 text-black shrink-0" />
            <input
              type="text"
              placeholder=""
              className="w-40 pl-2 py-1.5 bg-transparent border-none outline-none text-base placeholder:text-black/50"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
