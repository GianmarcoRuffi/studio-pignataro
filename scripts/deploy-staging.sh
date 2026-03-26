#!/usr/bin/env bash
set -euo pipefail

# Deploys the current branch to Vercel (preview) and re-points staging aliases.
# Requires: logged-in Vercel CLI, linked project (.vercel/project.json).

ALIASES=(
  "archpignataro-staging.vercel.app"
  "studio-pignataro-stg.vercel.app"
)

echo "Deploying preview..."
TMP_OUT=$(mktemp)
trap 'rm -f "$TMP_OUT"' EXIT

vercel --yes | tee "$TMP_OUT"

DEPLOY_URL=$(grep -o 'https://[^ ]*\.vercel\.app' "$TMP_OUT" | tail -n1)

if [ -z "$DEPLOY_URL" ]; then
  echo "❌ Unable to capture deployment URL from vercel output."
  exit 1
fi

echo "Deployment: $DEPLOY_URL"
for ALIAS in "${ALIASES[@]}"; do
  echo "Pointing alias $ALIAS ..."
  vercel alias set "$DEPLOY_URL" "$ALIAS"
done

echo "✅ Staging aliases updated:"
printf ' - https://%s\n' "${ALIASES[@]}"
