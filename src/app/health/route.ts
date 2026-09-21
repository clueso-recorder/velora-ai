import packageJson from "../../../package.json" with { type: "json" };

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    uptime: Math.round(process.uptime() * 100) / 100,
    version: packageJson.version,
  });
}
