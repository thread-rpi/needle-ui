import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "./api";
import type { EndpointError, HealthResponse, RecentContentResponse } from "../types/queryTypes";
import recentContent from "../helpers/recentContent.json";
import type { RecentContent } from "../types/eventTypes";

// REQUESTS ////////////////////////////////////////////////////////////

// health endpoint request
async function getHealth(): Promise<HealthResponse> {
  try {
    return apiGet<HealthResponse, EndpointError>({endpoint: 'health'});
  } catch (err) {
    throw err as EndpointError;
  }
}

// recentContent endpoint request
async function getRecentContent(): Promise<RecentContentResponse> {
  try {
    // return apiGet<RecentContentResponse, EndpointError>({endpoint: 'events/recentContent'});
    return { data: recentContent as unknown as RecentContent[] };
  } catch (err) {
    throw err as EndpointError;
  }
}

// HOOKS //////////////////////////////////////////////////////////////

// Health endpoint hook 
export const useGetHealth = (): UseQueryResult<HealthResponse, EndpointError> => {
  return useQuery<HealthResponse, EndpointError>({
    queryKey: ["health"],
    queryFn: () => getHealth()
  });
}

// recentContent endpoint hook 
export const useGetRecentContent = (): UseQueryResult<RecentContentResponse, EndpointError> => {
  return useQuery<RecentContentResponse, EndpointError>({
    queryKey: ["recentContent"],
    queryFn: () => getRecentContent()
  });
}