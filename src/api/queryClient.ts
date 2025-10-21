import { QueryClient } from "@tanstack/react-query";

const QUERY_STALE_TIME = 1000 * 60 * 30; // Data is 'fresh' for 30 mins
const QUERY_GC_TIME = 1000 * 60 * 90; // Unused queries are garbage collected after 90 mins

// Query client initalization
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      refetchOnWindowFocus: false,
      retry: 2
    },
  },
});
