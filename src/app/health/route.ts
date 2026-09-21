import packageJson from "../../../package.json" with { type: "json" };

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    uptime: process.uptime(),
    version: packageJson.version,
  });
}
