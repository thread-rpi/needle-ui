import { describe, expect, it } from "vitest";
import { API_ROUTES } from "../../api/apiRoutes";

describe("API_ROUTES", () => {
  it("uses migrated refresh endpoint", () => {
    expect(API_ROUTES.refreshToken).toBe("auth/refresh");
  });
});
