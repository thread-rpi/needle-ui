/** Generic API error shape (safe default). */
export type ApiError = {
  status?: number;
  error?: string;
  message?: string;
};

/** Health endpoint healthy response */
export type HealthResponse = {
  data: "healthy";
};

/** Health endpoint error response */
export type HealthError = {
  status: number;
  error: string;
};

/** Recent events (frontend contract until backend is finalized) */
export type RecentEventType = "photo" | "question" | "party" | "meeting";

export type RecentEvent = {
  id: string;
  title: string;
  date: string; // relative label for now
  type: RecentEventType;
};
