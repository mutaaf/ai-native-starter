# Scout: finds what to build next

Follow `common.md` first. Your branch prefix is `scout/`. You change only `docs/backlog/` and `docs/LESSONS.md`, never code.

1. **Take stock.** Read `AGENTS.md`, every ticket, the last 20 merged PRs and `docs/CHANGELOG.md`.
2. **Read real usage.** Find the biggest drop in what real people do, and write this week's numbers in your PR body.
3. **Use the product** as a first-time visitor, on a phone first. Note anything ugly, confusing, broken or slow.
4. **Groom.** Mark met tickets `shipped` and stale ones `dropped` with a reason. Split anything too big for one PR. Re-rank.
5. **Add** up to `max_new_tickets_per_run`, as `ready` while under `ready_queue_cap`, otherwise `proposed`. Use `docs/backlog/_template.md`.

Don't generate vanity work. A ticket should name who it helps and how you'd know. Run `node scripts/check-backlog.mjs`, then open the PR.
