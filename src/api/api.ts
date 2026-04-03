import ky, { HTTPError } from "ky";
import { toast } from "sonner";
import type { RefreshTokenResponse } from "../types/queryTypes";
import { API_ROUTES } from "./apiRoutes";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = 5000
const AUTH_FAILURE_STATUSES = new Set([401, 403]);
const MAX_NON_AUTH_REFRESH_FAILURES = 3;
const FORCED_LOGOUT_TOAST_MESSAGE =
  "Session ended after repeated refresh failures. Please sign in again.";
let nonAuthRefreshFailures = 0;

// clear stored auth from localStorage
const clearStoredAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
};

const resetNonAuthRefreshFailures = () => {
  nonAuthRefreshFailures = 0;
};

const handleNonAuthRefreshFailure = (error?: unknown) => {
  nonAuthRefreshFailures += 1;
  if (nonAuthRefreshFailures >= MAX_NON_AUTH_REFRESH_FAILURES) {
    clearStoredAuth();
    resetNonAuthRefreshFailures();
    toast.error(FORCED_LOGOUT_TOAST_MESSAGE, { duration: 6000 });
    return;
  }

  console.error(
    `Token refresh failed due to non-auth error (attempt ${nonAuthRefreshFailures}/${MAX_NON_AUTH_REFRESH_FAILURES}).`,
    error
  );
};

// refresh with bearer token
async function refreshWithBearerToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response = await ky
    .post(`${API_BASE_URL}/${API_ROUTES.refreshToken}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      timeout: API_TIMEOUT,
    })
    .json<{ data: RefreshTokenResponse }>();

  return response.data;
}

// refresh with body token
async function refreshWithBodyToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response = await ky
    .post(`${API_BASE_URL}/${API_ROUTES.refreshToken}`, {
      json: { refresh_token: refreshToken },
      timeout: API_TIMEOUT,
    })
    .json<{ data: RefreshTokenResponse }>();

  return response.data;
}

// request token refresh handler
async function requestTokenRefresh(refreshToken: string): Promise<RefreshTokenResponse> {
  try {
    // Try bearer-first for the migrated contract.
    return await refreshWithBearerToken(refreshToken);
  } catch (error) {
    // Fallback supports older body-token refresh contract during migration.
    if (error instanceof HTTPError && AUTH_FAILURE_STATUSES.has(error.response.status)) {
      return refreshWithBodyToken(refreshToken);
    }
    throw error;
  }
}

// ky api initalization
const api = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  retry: { limit: 0, methods: ["get", "put", "post", "delete"] },
  hooks: {
    beforeRequest: [
      req => {
        const token = localStorage.getItem("token");
        if (token) req.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (request, _opts, res) => {
        // refresh and retry request if 401 status, return otherwise
        if (res.status !== 401) return;
    
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          // no valid recovery path without refresh token, clear auth
          clearStoredAuth();
          resetNonAuthRefreshFailures();
          return;
        }
    
        try {
          // request token refresh
          const refreshRes = await requestTokenRefresh(refreshToken);
          
          if (!refreshRes?.access_token) {
            // count malformed refresh responses towards forced logout threshold
            handleNonAuthRefreshFailure("Refresh response missing access_token.");
            return;
          }

          resetNonAuthRefreshFailures();
    
          // Store new tokens (use consistent naming)
          localStorage.setItem("token", refreshRes.access_token);
          if (refreshRes.refresh_token) {
            localStorage.setItem("refresh_token", refreshRes.refresh_token);
          } else {
            // Keep existing refresh token if new one not provided
            localStorage.setItem("refresh_token", refreshToken);
          }
    
          // Clone original request with new header and retry
          const retryReq = new Request(request, {
            headers: new Headers(request.headers),
          });
          retryReq.headers.set("Authorization", `Bearer ${refreshRes.access_token}`);
          
          // Return new response in place of original 401
          return api(retryReq, { retry: { limit: 0 } });
        } catch (error) {
          if (error instanceof HTTPError && AUTH_FAILURE_STATUSES.has(error.response.status)) {
            // only clear auth for true refresh authorization failures
            clearStoredAuth();
            resetNonAuthRefreshFailures();
            return;
          }
          // network/contract failures only force logout after repeated attempts
          handleNonAuthRefreshFailure(error);
          return;
        }
      }
    ]
  },
});

interface apiGetParams {
  endpoint: string
  params?: URLSearchParams | Record<string, string>
}

export async function apiGet<T, K>({endpoint, params}: apiGetParams): Promise<T> {
  try {
    const response = await api.get(endpoint, {searchParams: params}).json<{ data: T }>();
    return response.data;
  } catch (e) {
    if (e instanceof HTTPError) {
      const body = await e.response.json().catch();
      throw { status: e.response.status, ...body } as K;
    }
    throw e;
  }
}

interface apiPostParams {
  endpoint: string
  params?: URLSearchParams | Record<string, string>
  body?: unknown
}

export async function apiPost<T, K>({endpoint, params, body}: apiPostParams): Promise<T> {
  try {
    const response = await api.post(endpoint, {json: body, searchParams: params}).json<{ data: T }>();
    return response.data;
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorBody = await e.response.json().catch(() => ({}));
      throw { status: e.response.status, ...errorBody } as K;
    }
    throw e;
  }
}


