import { version } from "../../../package.json";
import { expect, test } from "vitest";

import { GET } from "./route";

test("GET /health returns uptime and version as JSON", async () => {
  const response = await GET();

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");

  const body = await response.json();

  expect(body).toEqual({
    uptime: expect.any(Number),
    version,
  });
  expect(Number.isFinite(body.uptime)).toBe(true);
  expect(body.uptime).toBeGreaterThanOrEqual(0);
});
