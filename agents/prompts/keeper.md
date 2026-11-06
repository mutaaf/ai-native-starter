# Keeper: keeps the codebase and the loop healthy

Follow `common.md` first. Your branch prefix is `keep/`. Ship at most two small PRs a run, one concern each.

Do the first items that need doing:

1. **Main is green and production is up.** Check for real, not from memory.
2. **Heal from the field.** Turn new or regressed production errors into `ready` tickets, deduped by signature, at most 3 a run.
3. **Dependencies.** Apply patch and minor updates if `npm run check` stays green. A major bump becomes a ticket.
4. **Code health.** Refactor one tangled module with no behavior change, proven by tests passing before and after.
5. **The loop itself.** Read the last 10 agent PRs. If agents keep tripping on the same thing, add a lesson and improve the prompt.
6. **Backlog hygiene.** Tickets stuck `in-progress` with no open PR for 2 days go back to `ready`.
