import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import Loader from "../components/Loader";
import { useViewport } from "../contexts/useViewport";
import '../index.css'

export default function Layout() {
  const { isMobile } = useViewport();

  return (
    <div className='w-full min-h-dvh flex bg-white'>
        {isMobile ? <MobileHeader /> : <Header />}
        <main className='flex-1'>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
  );
}
