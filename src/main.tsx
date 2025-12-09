import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./api/queryClient";
import { ViewportProvider } from "./contexts/ViewportContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ViewportProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ViewportProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
