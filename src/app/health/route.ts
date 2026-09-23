import { version } from "../../../package.json";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    uptime: process.uptime(),
    version,
  });
}
