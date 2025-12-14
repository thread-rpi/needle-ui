import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api";
import type { 
  HealthError, 
  HealthResponse, 
  LoginResponse, 
  LoginError, 
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RefreshTokenError,
  AdminUserResponse,
  AdminUserError,
  EventOverviewResponse,
  EventOverviewError,
} from "../types/queryTypes";

// health endpoint request
async function getHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse, HealthError>({endpoint: 'health'});
}

// health endpoint hook 
export const useGetHealth = (): UseQueryResult<HealthResponse, HealthError> => {
  return useQuery<HealthResponse, HealthError>({
    queryKey: ["health"],
    queryFn: () => getHealth()
  });
}

// event overview endpoint request
async function getEventOverview(): Promise<EventOverviewResponse> {
  return apiGet<EventOverviewResponse, EventOverviewError>({endpoint: "events/overview"});
};

// event overview endpoint hook - only fetches if enabled (component is open/active)
export const useEventOverview = (enabled: boolean = true): UseQueryResult<EventOverviewResponse, EventOverviewError> => {
  return useQuery<EventOverviewResponse, EventOverviewError>({
    queryKey: ['eventOverview'],
    queryFn: getEventOverview,
    enabled: enabled,
  });
};

// login endpoint request
async function loginRequest({ email, password }: LoginRequest): Promise<LoginResponse> {
  return apiPost<LoginResponse, LoginError>({
    endpoint: "auth/login",
    body: { email, password },
  });
}

// login endpoint hook - mutation only executes when mutate() is called with valid credentials
export const useLogin = (): UseMutationResult<LoginResponse, LoginError, LoginRequest> => {
  return useMutation<LoginResponse, LoginError, LoginRequest>({
    mutationFn: loginRequest
  });
};

// refresh token endpoint request
async function refreshTokenRequest({ refresh_token }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  return apiPost<RefreshTokenResponse, RefreshTokenError>({
    endpoint: "auth/refresh",
    body: { refresh_token },
  });
}

// refresh token endpoint hook
export const useRefreshToken = (): UseMutationResult<RefreshTokenResponse, RefreshTokenError, RefreshTokenRequest> => {
  return useMutation<RefreshTokenResponse, RefreshTokenError, RefreshTokenRequest>({
    mutationFn: refreshTokenRequest
  });
};

// current user endpoint request
async function getCurrentAdminUser(): Promise<AdminUserResponse> {
  return apiGet<AdminUserResponse, AdminUserError>({ endpoint: "auth/me" });
}

// current user endpoint hook - only fetches if token exists
export const useCurrentAdminUser = (enabled: boolean = true): UseQueryResult<AdminUserResponse, AdminUserError> => {
  return useQuery<AdminUserResponse, AdminUserError>({
    queryKey: ["currentAdminUser"],
    queryFn: getCurrentAdminUser,
    enabled: enabled
  });
};
