# AGENTS.md: the operating manual

Every agent reads this from a fresh checkout before acting. Keep it true. A wrong line here costs more than a missing one.

## Product

<What this is, who it's for, and the one thing it must do well.>

## Invariants (never break)

<Rules that hold no matter what. For each, say what enforces it: a test, a check or only this file.>

- <Example: same input gives the same score. Enforced by test/score.test.mjs.>

## System map

<Main modules and how data moves between them. Allowed network hosts.>

## Commands

- `npm run up`: one idempotent command to run everything locally.
- `npm run check`: what CI runs. Green here should mean green there.

## Definition of done

- [ ] A test fails without the change and passes with it.
- [ ] `npm run check` is green.
- [ ] You looked at the real result, not only the test output.
- [ ] Production shows the new build, checked after merge.
- [ ] `docs/CHANGELOG.md` has a line. `docs/LESSONS.md` has one if you learned something.

## Agents

Scout, Builder, Critic and Keeper run on schedules. See `agents/prompts/` and `docs/ROUTINES.md`.

## Never

- Never edit anything in `control.json` `frozen_paths`.
- Never weaken a test or gate to get green.
- Never add secrets, paid services, accounts or new network hosts.
- Anything involving money, an account or a store submission goes in `docs/PARKED.md`, with the exact next step.
