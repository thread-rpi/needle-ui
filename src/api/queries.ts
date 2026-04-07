import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api";
import { API_ROUTES, getEventDetailsRoute } from "./apiRoutes";
import type * as QueryTypes from "../types/queryTypes";


// health endpoint request
async function getHealth(): Promise<QueryTypes.HealthResponse> {
  return apiGet<QueryTypes.HealthResponse, QueryTypes.HealthError>({endpoint: API_ROUTES.health});
}

// health endpoint hook 
export const useGetHealth = (): UseQueryResult<QueryTypes.HealthResponse, QueryTypes.HealthError> => {
  return useQuery<QueryTypes.HealthResponse, QueryTypes.HealthError>({
    queryKey: ["health"],
    queryFn: () => getHealth()
  });
}

// event overview endpoint request
async function getEventOverview(): Promise<QueryTypes.EventOverviewResponse> {
  return apiGet<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError>({endpoint: API_ROUTES.eventOverview});
};

// event overview endpoint hook - only fetches if enabled (component is open/active)
export const useEventOverview = (enabled: boolean = true): UseQueryResult<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError> => {
  return useQuery<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError>({
    queryKey: ['eventOverview'],
    queryFn: getEventOverview,
    enabled: enabled,
  });
};

// login endpoint request
async function loginRequest({ email, password }: QueryTypes.LoginRequest): Promise<QueryTypes.LoginResponse> {
  return apiPost<QueryTypes.LoginResponse, QueryTypes.LoginError>({
    endpoint: API_ROUTES.login,
    body: { email, password },
  });
}

// login endpoint hook - mutation only executes when mutate() is called with valid credentials
export const useLogin = (): UseMutationResult<QueryTypes.LoginResponse, QueryTypes.LoginError, QueryTypes.LoginRequest> => {
  return useMutation<QueryTypes.LoginResponse, QueryTypes.LoginError, QueryTypes.LoginRequest>({
    mutationFn: loginRequest
  });
};

// refresh token endpoint request
async function refreshTokenRequest({ refresh_token }: QueryTypes.RefreshTokenRequest): Promise<QueryTypes.RefreshTokenResponse> {
  return apiPost<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError>({
    endpoint: API_ROUTES.refreshToken,
    body: { refresh_token },
  });
}

// refresh token endpoint hook
export const useRefreshToken = (): UseMutationResult<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError, QueryTypes.RefreshTokenRequest> => {
  return useMutation<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError, QueryTypes.RefreshTokenRequest>({
    mutationFn: refreshTokenRequest
  });
};

// current user endpoint request
async function getCurrentAdminUser(): Promise<QueryTypes.AdminUserResponse> {
  return apiGet<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError>({ endpoint: API_ROUTES.adminUser });
}

// current user endpoint hook - only fetches if token exists
export const useCurrentAdminUser = (enabled: boolean = true): UseQueryResult<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError> => {
  return useQuery<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError>({
    queryKey: ["currentAdminUser"],
    queryFn: getCurrentAdminUser,
    enabled: enabled
  });
};

// past events endpoint request
async function getPastEvents(): Promise<QueryTypes.PastEventsResponse> {
  return apiGet<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError>({ endpoint: API_ROUTES.pastEvents });
}

// past events endpoint hook 
export const useGetPastEvents = (): UseQueryResult<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError> => {
  return useQuery<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError>({
    queryKey: ["pastEvents"],
    queryFn: () => getPastEvents()
  });
}

// event details request
async function getEventDetails(eventId: string): Promise<QueryTypes.EventDetailsResponse> {
  return apiGet<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError>({ endpoint: getEventDetailsRoute(eventId) });
}

// event details endpoint hook
export const useGetEventDetails = (eventId: string): UseQueryResult<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError> => {
  return useQuery<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError>({
    queryKey: ["eventDetails", eventId],
    queryFn: () => getEventDetails(eventId),
    enabled: !!eventId
  });
};
