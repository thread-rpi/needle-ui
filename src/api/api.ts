import ky, { HTTPError } from "ky";

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
    
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;
    
        const refreshRes = await ky.post("/auth/refresh", { json: { refreshToken } }).json<{ accessToken: string }>().catch(() => null);
        if (!refreshRes?.accessToken) return;
    
        localStorage.setItem("accessToken", refreshRes.accessToken);
    
        // clone original request with new header and retry
        const retryReq = new Request(request, {
          headers: new Headers(request.headers),
        });
        retryReq.headers.set("Authorization", `Bearer ${refreshRes.accessToken}`);
        
        // return new response in place of original 401
        return api(retryReq, { retry: { limit: 0 } });
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
    return await api.get(endpoint, {searchParams: params}).json<T>();
  } catch (e) {
    if (e instanceof HTTPError) {
      const body = await e.response.json().catch();
      throw { status: e.response.status, ...body } as K;
    }
    throw e;
  }
}
