import { version } from "../../../package.json";

export async function GET() {
  return Response.json({
    uptime: process.uptime(),
    version,
  });
}
