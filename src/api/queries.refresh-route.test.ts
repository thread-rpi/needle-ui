import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("queries refresh route wiring", () => {
  it("uses API_ROUTES.refreshToken rather than hardcoded path", () => {
    const source = readFileSync(new URL("./queries.ts", import.meta.url), "utf8");
    expect(source).toMatch(/endpoint:\s*API_ROUTES\.refreshToken/);
  });
});
