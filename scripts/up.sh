#!/bin/sh
# One idempotent command to run everything locally. Replace the last line with your app.
set -eu
command -v jq >/dev/null || { echo "This needs jq: brew install jq, or apt-get install jq" >&2; exit 1; }
npm run --silent check
echo "Checks pass. Start your app here."
