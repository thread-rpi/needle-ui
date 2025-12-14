import ky, { HTTPError } from "ky";
import type { RefreshTokenResponse } from "../types/queryTypes";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = 5000

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
          // Clear tokens if refresh fails
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          return;
        }
    
        try {
          // Use API_BASE_URL for refresh endpoint
          const refreshResponse = await ky
            .post(`${API_BASE_URL}/auth/refresh`, { 
              json: { refresh_token: refreshToken },
              timeout: API_TIMEOUT,
            })
            .json<{ data: RefreshTokenResponse }>();
          
          const refreshRes = refreshResponse.data;
          
          if (!refreshRes?.access_token) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            return;
          }
    
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
        } catch {
          // Refresh failed - clear tokens and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
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


