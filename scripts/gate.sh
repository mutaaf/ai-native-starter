#!/usr/bin/env bash
# The merge decision. Prints one verdict: expired, paused, frozen, draft or arm.
# Usage: scripts/gate.sh <control.json> <is-draft true|false> [today YYYY-MM-DD] < changed-files
# Order matters: a stopped loop stays stopped whatever the PR contains.
set -euo pipefail
control=$1; draft=$2; today=${3:-$(date -u +%F)}
expires=$(jq -r '.expires // empty' "$control")
paused=$(jq -r '.paused' "$control")
if [ -n "$expires" ] && [[ "$today" > "$expires" ]]; then echo expired; exit 0; fi
if [ "$paused" = "true" ]; then echo paused; exit 0; fi
while IFS= read -r file; do
  [ -n "$file" ] || continue
  while IFS= read -r frozen; do
    case "$file" in "$frozen"*) echo frozen; exit 0 ;; esac
  done < <(jq -r '.frozen_paths[]' "$control")
done
if [ "$draft" = "true" ]; then echo draft; exit 0; fi
echo arm
