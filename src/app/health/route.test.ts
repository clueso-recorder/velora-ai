import { describe, expect, it } from "vitest";

import packageJson from "../../../package.json" with { type: "json" };

import { GET } from "./route";

describe("GET /health", () => {
  it("returns JSON with uptime and version", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/application\/json/);

    const body: unknown = await response.json();
    expect(body).toEqual({
      uptime: expect.any(Number),
      version: packageJson.version,
    });

    const { uptime } = body as { uptime: number };
    expect(Number.isFinite(uptime)).toBe(true);
    expect(uptime).toBeGreaterThanOrEqual(0);
    expect(uptime).toBe(Math.round(uptime * 100) / 100);
  });
});
