import packageJson from "../../../package.json";

// Static export can only prerender GET handlers that opt into static rendering.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    uptime: process.uptime(),
    version: packageJson.version,
  });
}
