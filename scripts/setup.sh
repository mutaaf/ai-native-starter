#!/bin/sh
# One-time setup for a repo made from this template. Safe to run again.
set -eu
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
EXPIRES=$(date -u -v+90d +%F 2>/dev/null || date -u -d '+90 days' +%F)

gh repo edit "$REPO" --enable-auto-merge --enable-squash-merge --delete-branch-on-merge >/dev/null

# Only a repo that isn't protected yet can take this commit directly. On a re-run, leave the date alone.
if ! gh api "repos/$REPO/branches/main/protection" >/dev/null 2>&1; then
  sed -i.bak "s/\"expires\": \"[0-9-]*\"/\"expires\": \"$EXPIRES\"/" agents/control.json && rm -f agents/control.json.bak
  if ! git diff --quiet -- agents/control.json; then
    git add agents/control.json
    git commit -qm "Agents expire on $EXPIRES"
    git push -q origin HEAD:main
  fi
fi

# Needs a public repo or a paid GitHub plan. Without it the gate has nothing to hold on to.
if ! gh api -X PUT "repos/$REPO/branches/main/protection" --input - >/dev/null <<JSON
{"required_status_checks":{"strict":false,"contexts":["check"]},"enforce_admins":true,"required_pull_request_reviews":null,"restrictions":null}
JSON
then
  echo "Could not protect main. Branch protection needs a public repo or a paid GitHub plan." >&2
  exit 1
fi
echo "$REPO: auto-merge on, check required on main, agents expire $EXPIRES."
echo "Next: fill in AGENTS.md, then docs/ROUTINES.md."
