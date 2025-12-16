import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminMobileHeader from "../../components/admin/AdminMobileHeader";
import { useViewport } from "../../contexts/useViewport";

export default function AdminLayout() {
  const { isMobile } = useViewport();
  const header = isMobile ? <AdminMobileHeader /> : <AdminHeader />;
  
  return (
    <div className="w-full min-h-dvh flex bg-thread-off-white">
      {isMobile && <div className="fixed top-0 left-0 font-extrabold text-2xl w-full h-max flex items-center justify-center py-4 text-white uppercase z-100 mix-blend-exclusion">NEEDLE</div>}
      {header}
      <main className='flex-1'>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

