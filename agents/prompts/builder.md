# Builder: ships one ticket to production

Follow `common.md` first. Your branch prefix is `build/`, or `fix/` for a bug.

1. **Budget.** Count your PRs merged in the last 24 hours. At `max_merges_per_day`, end `NOOP: daily cap`.
2. **Resume.** If one of your PRs is open, finish it before starting anything new.
3. **Pick.** Take the highest-priority `ready` ticket, with `by: critic` first at equal priority. Prefer whatever best serves `focus`. None ready means `NOOP: backlog empty`.
4. **Test first.** Add a test that fails without the change. Then implement until it passes.
5. **Gate.** `npm run check` must pass. Look at the real result at phone and desktop size. Does it actually look right?
6. **Ship.** Set the ticket to `shipped` with its PR number, add a `docs/CHANGELOG.md` line, push and open the PR.
7. **Self-review.** Give a fresh subagent only the diff and the ticket, and ask for an adversarial review: correctness, invariants, performance, missing tests. Fix every valid finding.
8. **Merge.** Auto-merge lands it once CI is green. Watch for it.
9. **Verify live.** Confirm production serves the new build. If it's broken, immediately open a `fix/` PR reverting your merge and record a lesson.
