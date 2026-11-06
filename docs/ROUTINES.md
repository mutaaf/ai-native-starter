# Setting up the scheduled agents

Each agent is a scheduled Claude Code cloud routine with this repo attached. Create them at [claude.ai/code/routines](https://claude.ai/code/routines). Each prompt is a thin pointer, so the instructions stay versioned here:

```text
You are the Builder. Follow agents/prompts/builder.md exactly.
```

| Agent | Start at | Why |
|---|---|---|
| Builder | Every few hours | Ships one ticket a run |
| Critic | Twice a day | Finds what's wrong and checks what shipped |
| Scout | Daily | Keeps the queue stocked |
| Keeper | Weekly | Keeps main, dependencies and the loop healthy |

Start with the Builder and Critic, and add the others once they're landing good PRs. Before scheduling, write a few tickets by hand: they show the agents what a good one looks like.

Keep an eye on effort per merged PR. If a role mostly ends in `NOOP`, slow its schedule, or put a free check in front of it so it only wakes when there's work. Idle runs are where the money goes.
