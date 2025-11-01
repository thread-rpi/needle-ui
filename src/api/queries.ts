import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "./api";
import type { HealthError, HealthResponse } from "../types/queryTypes";


export interface RecentEvent { // types for each recent event object returned from api
  id: string
  title: string
  date: string
  type: string
}

// health endpoint request
async function getHealth(): Promise<HealthResponse> {
  try {
    return apiGet<HealthResponse, HealthError>({endpoint: 'health'});
  } catch (err) {
    throw err as HealthError;
  }
}

// Health endpoint hook 
export const useGetHealth = (): UseQueryResult<HealthResponse, HealthError> => {
  return useQuery<HealthResponse, HealthError>({
    queryKey: ["health"],
    queryFn: () => getHealth()
  });
}

// query getRecentEvents api
async function getRecentEvents(): Promise<RecentEvent[]> {
  try{
    return await apiGet<RecentEvent[], { message: string }>({
      endpoint: "api/events/recents", // route for recent events
    });
 } catch (err){
  throw new Error("Could not query API.");
 }
};

// getRecentEvents endpoint hook
export const useRecentEvents = (isOpen: boolean) => { // query only if RecentEventsPopup is open/active
  return useQuery<RecentEvent[], Error>({
    queryKey: ['getRecentEvents'],
    queryFn: getRecentEvents,
    enabled: isOpen,
  });
};


export const getRecentEvents2 = async (isOpen: boolean) => {
  if (!isOpen) return [];

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "evt-001",
      title: "System rebooted",
      date: new Date().toISOString(),
      type: "info",
    },
    {
      id: "evt-002",
      title: "New user registered",
      date: new Date(Date.now() - 3600 * 1000).toISOString(),
      type: "success",
    },
    {
      id: "evt-003",
      title: "High memory usage detected",
      date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      type: "warning",
    },
    {
      id: "evt-004",
      title: "Database connection failed",
      date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      type: "error",
    },
    {
    id: "evt-004",
      title: "Database connection failed",
      date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      type: "error",
    },
    {
    id: "evt-004",
      title: "Database connection failed",
      date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      type: "error",
    },
    {
    id: "evt-004",
      title: "Database connection failed",
      date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      type: "error",
    },
  ];
};

export const useRecentEvents2 = (isOpen: boolean) => {
  return useQuery({
    queryKey: ["getRecentEvents2"],
    queryFn: () => getRecentEvents2(isOpen),
    enabled: isOpen,
  });
};