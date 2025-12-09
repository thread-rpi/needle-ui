import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ViewportContext, type ViewportContextType } from "./useViewport";
import { MOBILE_BREAKPOINT } from "./useViewport";

interface ViewportProviderProps {
  children: ReactNode;
}

export function ViewportProvider({ children }: ViewportProviderProps) {
  const [width, setWidth] = useState(() => {
    // Initialize with current window width, or 0 for SSR safety
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    // handler to update width on resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // set initial width
    handleResize();

    // add event listener
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value: ViewportContextType = {
    width,
    isMobile: width <= MOBILE_BREAKPOINT,
  };

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}
