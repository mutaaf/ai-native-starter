Read [AGENTS.md](AGENTS.md) before changing anything.

## Environment nuances

Add a row the day something surprises you. The next agent inherits it.

| Nuance | What to do |
|---|---|
| Merges made by a workflow token start no workflows | `main-ci-backstop.yml` dispatches CI on `main` |
| Local E2E can reuse another worktree's server on a shared port and pass against the wrong build | Give each run its own port |
