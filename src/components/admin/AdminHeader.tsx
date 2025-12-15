import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { adminHeaderRoutes } from "../../routes/routePaths";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function AdminHeader() {
  const { user } = useAuth();
  const [activeRoute, setActiveRoute] = useState(adminHeaderRoutes[0].path);

  return (
    <div className="w-full fixed top-5.5 left-0 z-200 flex justify-center">
      <div className="w-[93%] h-14 bg-white rounded-2xl shadow-[0px_5px_10px_0px_rgba(0,0,0,0.18)] px-6 py-3 flex items-center justify-between">
        {/* header left - navbar */}
        <div className="flex flex-row items-center gap-5">
          <div className="font-extrabold text-2xl text-thread-red uppercase">NEEDLE</div>
          <div className="relative w-max h-max flex items-center p-1.5 gap-.5">
            <div className="absolute inset-0 bg-thread-off-white rounded-2xl shadow-[inset_0px_3px_6px_#0000004c]"/>
            {adminHeaderRoutes.map((route) => (
            <Link to={route.path} key={route.label} onClick={() => setActiveRoute(route.path)}>
              <div className={`z-10 relative text-md font-bold text-thread-red px-3 py-1 rounded-xl flex items-center justify-center gap-1 transition-all duration-300
                ${activeRoute === route.path ? 'bg-thread-red text-white' : ''}`}>
                <div className={`flex items-center justify-center ${activeRoute === route.path ? 'opacity-100 w-5 h-5' : 'opacity-0 w-0 h-0'} transition-all duration-300`}>
                  <Icon icon={route.icon} color={'white'}/>
                </div>
                {route.label}
              </div>
            </Link>
            ))}
          </div>
        </div>

        {/* header right - current user info */}
        <div className="flex flex-row items-end gap-1.5 w-auto">
          <div className="font-bold text-lg align-text-bottom"> {user?.role.toLowerCase()} </div>
          <div className="font-extrabold text-2xl text-thread-red"> {user?.name.split(' ')[0].toUpperCase()} </div>
        </div>
      </div>
    </div>
  );
}
