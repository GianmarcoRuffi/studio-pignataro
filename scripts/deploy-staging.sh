#!/usr/bin/env bash
set -euo pipefail

# Optional manual deployment for the legacy staging aliases.
# Automatic staging deployments use the native Vercel Git integration.

if [[ "$(git branch --show-current)" != "staging" ]]; then
  echo "Run this command from the staging branch." >&2
  exit 1
fi

if [[ ! -f .vercel/project.json ]] &&
  [[ -z "${VERCEL_ORG_ID:-}" || -z "${VERCEL_PROJECT_ID:-}" ]]; then
  echo "Link the existing Vercel project before deploying." >&2
  exit 1
fi

AUTH_ARGS=()
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  AUTH_ARGS=(--token "$VERCEL_TOKEN")
fi

vercel_command() {
  npx --no-install vercel "$@" "${AUTH_ARGS[@]}"
}

ALIASES=(
  "archpignataro-staging.vercel.app"
  "studio-pignataro-stg.vercel.app"
)

echo "Deploying preview..."
DEPLOY_URL=$(vercel_command deploy --target=preview --yes)

if [[ ! "$DEPLOY_URL" =~ ^https://[a-zA-Z0-9-]+\.vercel\.app$ ]]; then
  echo "Unable to capture a valid deployment URL from Vercel output." >&2
  exit 1
fi

echo "Deployment: $DEPLOY_URL"
for ALIAS in "${ALIASES[@]}"; do
  echo "Pointing alias $ALIAS ..."
  vercel_command alias set "$DEPLOY_URL" "$ALIAS"
done

echo "✅ Staging aliases updated:"
printf ' - https://%s\n' "${ALIASES[@]}"
