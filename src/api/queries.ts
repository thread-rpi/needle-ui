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
// doesn't actually query a valid api yet since the getRecentEvents endpoint hasn't been created yet
async function getRecentEvents(): Promise<RecentEvent[]> {
  return apiGet<RecentEvent[], { message: string }>({
    endpoint: "api/getRecentEvents", 
  });
};

// getRecentEvents endpoint hook
export const useRecentEvents = (isOpen: boolean) => { // query only if RecentEventsPopup is open/active
  return useQuery<RecentEvent[], Error>({
    queryKey: ['getRecentEvents'],
    queryFn: getRecentEvents,
    enabled: isOpen,
  });
};
