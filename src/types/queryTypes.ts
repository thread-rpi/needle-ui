import type { RecentContent } from "./eventTypes";

// generic endpoint error response
export interface EndpointError {
  status: number;
  error: string;
};

// Health endpoint healthy response
export type HealthResponse = {
    data: 'healthy';
};

// recentContent healthy response
export type RecentContentResponse = {
  data: RecentContent[];
}

