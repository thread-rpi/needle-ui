import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import '../index.css'

export default function Layout() {
  return (
    <div className='flex min-h-dvh flex-col h-dvh'>
        <Header />
        <main className='flex-1 w-full min-h-0'>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
  );
}
