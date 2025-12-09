import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../components/Loader";
import '../index.css'

export default function Layout() {
  return (
    <div className='flex min-h-lvh'>
        <main className='flex-1'>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
  );
}
