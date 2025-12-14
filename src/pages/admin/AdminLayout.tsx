import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/Loader";

export default function AdminLayout() {
  return (
    <div className="min-h-dvh w-full bg-thread-off-white">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

