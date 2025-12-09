// src/routes/routeController.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import {
  routes,
} from "./routePaths";
import Layout from "../pages/Layout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Features = lazy(() => import("../pages/Features"));
const Publications = lazy(() => import("../pages/Publications"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Health = lazy(() => import("../pages/Health"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function RouteController() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routes.root} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.features} element={<Features />} />
          <Route path={routes.publications} element={<Publications />} />
          <Route path={routes.calendar} element={<Calendar />} />
          <Route path={routes.health} element={<Health />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
