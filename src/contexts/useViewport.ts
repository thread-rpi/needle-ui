import { createContext, useContext } from "react";

export interface ViewportContextType {
  width: number;
  isMobile: boolean;
}

export const ViewportContext = createContext<ViewportContextType | undefined>(undefined);

export const MOBILE_BREAKPOINT = 768;

export function useViewport() {
  const context = useContext(ViewportContext);
  if (context === undefined) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
}

