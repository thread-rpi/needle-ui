import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="w-full min-h-dvh flex bg-thread-off-white">
        <AdminHeader />
        <main className='flex-1'>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
    </div>
  );
}

