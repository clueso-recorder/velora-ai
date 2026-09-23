#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  cp .env.example .env.local
  sed -i 's|https://velora.colorlib.com|http://localhost:3000|g' .env.local
fi

pnpm install --frozen-lockfile
