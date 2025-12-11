import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import { rootPath, aboutPath, featuresPath, publicationsPath, calendarPath, healthPath, loginPath } from "./routePaths";
import Layout from "../pages/Layout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Features = lazy(() => import("../pages/Features"));
const Publications = lazy(() => import("../pages/Publications"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Health = lazy(() => import("../pages/Health"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/admin/Login"));

export default function RouteController() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={loginPath} element={<Login />} />
          <Route path={rootPath} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={aboutPath} element={<About />} />
            <Route path={featuresPath} element={<Features />} />
            <Route path={publicationsPath} element={<Publications />} />
            <Route path={calendarPath} element={<Calendar />} />
            
            <Route path={healthPath} element={<Health />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
