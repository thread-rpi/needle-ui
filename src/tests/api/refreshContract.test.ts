import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("api refresh contract handling", () => {
  it("supports both bearer-first and body-token refresh requests", () => {
    const source = readFileSync(new URL("../../api/api.ts", import.meta.url), "utf8");
    expect(source).toContain("Authorization: `Bearer ${refreshToken}`");
    expect(source).toContain("json: { refresh_token: refreshToken }");
  });

  it("only clears auth for true refresh auth failures", () => {
    const source = readFileSync(new URL("../../api/api.ts", import.meta.url), "utf8");
    expect(source).toContain("AUTH_FAILURE_STATUSES");
    expect(source).toContain("clearStoredAuth();");
    expect(source).toContain("MAX_NON_AUTH_REFRESH_FAILURES");
    expect(source).toContain("handleNonAuthRefreshFailure");
    expect(source).toContain("FORCED_LOGOUT_TOAST_MESSAGE");
  });
});
