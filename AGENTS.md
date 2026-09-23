<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cloud Agent development

- Install dependencies with `bash .cursor/install.sh` (creates `.env.local` from `.env.example` on first run).
- Start the dev server with `pnpm dev --hostname 0.0.0.0 --port 3000` (also configured in `.cursor/environment.json` terminals).
- Canonical checks: `pnpm lint`, `pnpm build`, `pnpm registry:build`.
- The site is fully static (`output: "export"`); no database or external services are required for local development.
