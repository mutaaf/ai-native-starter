# AI-Native Starter

A working loop of AI agents for one repo. Agents find the work, ship it through CI, and judge what shipped. You steer from one file.

This is the copyable core of the [AI-Native Manifest](https://mutaafaziz.com/manifest/). It comes from a practice that has merged over 1,200 agent PRs, and its rules were mostly learned from things breaking.

## Start

```sh
gh repo create my-app --public --template mutaaf/ai-native-starter --clone
cd my-app
sh scripts/setup.sh
```

`setup.sh` turns on auto-merge, requires the `check` job on `main` (with no admin bypass) and sets your agents' expiry 90 days out. GitHub only offers branch protection on public repos or paid plans, and the gate depends on it.

Then:

1. Fill in the `<angle brackets>` in `AGENTS.md`. This is the contract, so it gets the most care.
2. Set `focus` in `agents/control.json` to what matters right now.
3. Point `npm run check` at your real tests.
4. Create the scheduled agents ([docs/ROUTINES.md](docs/ROUTINES.md)). Start with the Builder and the Critic.

## What you get

| File | What it does |
|---|---|
| `AGENTS.md` | The contract every agent reads from a fresh checkout |
| `agents/control.json` | Pause, expiry, focus, caps and frozen paths, editable from a phone |
| `agents/prompts/` | Scout finds work, Builder ships it, Critic judges it, Keeper keeps it healthy |
| `scripts/gate.sh` | The merge decision, in one tested script |
| `.github/workflows/agent-automerge.yml` | Runs the gate from `main`, so a PR can't loosen its own gate |
| `.github/workflows/agent-expiry.yml` | Opens an issue before the agents expire, so they can't stop silently |
| `.github/workflows/main-ci-backstop.yml` | Runs CI on `main`, because merges made by a workflow token start no workflows |
| `scripts/check-backlog.mjs` | Fails CI on a malformed ticket |
| `scripts/check-agents.mjs` | Fails CI if the control file loses a safety setting |
| `docs/LESSONS.md` | What went wrong, read at the start of every run |
| `docs/PARKED.md` | Anything that needs money, an account or a human |

## The merge gate

An agent's PR merges itself only when all of these hold:

```text
today <= expires   not paused   touches no frozen path   not a draft   CI green
```

`frozen_paths` holds the gate itself, the workflows and the control file, so agents can't edit their own leash. Branches outside `scout/ build/ fix/ keep/` never auto-merge.

## Move rules up the ladder

A rule is worth the rung it stands on:

| Rung | Enforced by | Example here |
|---|---|---|
| 5 | Construction or a test | `test/gate.test.mjs` |
| 4 | A required check | `check` on `main` |
| 3 | A workflow decision | `paused`, `expires`, `frozen_paths` |
| 2 | A prompt | `max_merges_per_day` |
| 1 | Writing it down | "Look at a real render" |

When a rule fails, move it up a rung.

## What this doesn't give you

Independent review stays weak: self-review by a fresh subagent plus a Critic after merge. The merge cap is only a prompt instruction. Add a required reviewer check when the risk justifies it. Scheduled agents also need a Claude plan or API budget.

MIT licensed.
