import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./api/queryClient";
import { ViewportProvider } from "./contexts/ViewportContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        
        <ViewportProvider>
          <AuthProvider>
            <App />
            <SpeedInsights />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </ViewportProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
