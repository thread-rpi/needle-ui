import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { adminHeaderRoutes } from "../../routes/routePaths";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function AdminMobileHeader() {
  const { user, logout } = useAuth();
  const [activeRoute, setActiveRoute] = useState(adminHeaderRoutes[0].path);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="z-200 w-full h-max fixed bottom-0 left-0 flex justify-center overflow-visible">
      <div className="w-full h-16 bg-thread-off-white border-t-1 border-black px-3 py-3 flex items-center justify-center overflow-visible">
        <div className="w-full h-full flex flex-row items-center justify-between gap-3">

          {/* header left - navbar */}
          <div className="w-full h-full flex flex-row items-center justify-center gap-4.5 pr-3 border-r-1 border-black">
            {adminHeaderRoutes.map((route) => (
              <Link className="w-max h-full" to={route.path} key={route.label} onClick={() => setActiveRoute(route.path)}>
                <div className={`z-10 relative text-3xl font-bold text-black px-3 py-1.5 flex items-center justify-center transition-all duration-300
                  ${activeRoute === route.path ? 'text-thread-red scale-125' : 'text-black'}`}>
                  <div className={`flex items-center justify-center transition-all duration-300`}>
                    <Icon inline={true} icon={route.icon}/>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* header right - current user info ticker */}
          <div 
            className="relative w-max max-w-4/10 h-max flex flex-col-reverse self-end items-end justify-start overflow-visible"
            onMouseEnter={() => setLogoutVisible(true)}
            onMouseLeave={() => setLogoutVisible(false)}
          >
            <div className="w-full h-full overflow-hidden">
              <div className="w-full h-full flex flex-row">
                <div className={`w-max h-full flex flex-row items-end gap-3 whitespace-nowrap px-1.5 animate-admin-mobile-header-ticker-1`}>
                  <div className="w-max h-full text-3xl font-extrabold text-thread-red whitespace-nowrap"> {user?.name} </div>
                  <div className="w-max text-2xl font-bold"> {user?.role.toLowerCase()} </div>
                </div>
                <div className={`w-max h-full flex flex-row items-end gap-3 whitespace-nowrap px-1.5 animate-admin-mobile-header-ticker-2`}>
                  <div className="w-max h-full text-3xl font-extrabold text-thread-red whitespace-nowrap"> {user?.name} </div>
                  <div className="w-max text-2xl font-bold"> {user?.role.toLowerCase()} </div>
                </div>
              </div>
            </div>
            {/* Logout dropdown */}
            <div 
              className={`w-full mb-9 bg-white border-1 border-black py-2 transition-all duration-250 ease-in-out ${
                logoutVisible ? 'z-0 opacity-100 translate-y-0' : 'z-[-10] opacity-0 translate-y-10 pointer-events-none'
              }`}
            >
              <button
                onClick={handleLogout}
                className="w-full px-4 py-1 text-left text-md font-bold text-black flex items-center gap-2 cursor-pointer"
              >
                <Icon icon="basil:logout-solid" className="w-5 h-5" />
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
