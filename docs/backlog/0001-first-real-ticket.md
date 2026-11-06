---
id: 0001
title: "Replace npm run check with this product's real tests"
status: ready
priority: P0
size: S
lens: tech-health
created: 2026-11-05
pr:
by: operator
---

## Why
The gate is only as good as the check behind it. The starter's check tests the loop, not your product.

## What
Add your build and tests to `npm run check`. Keep the existing checks.

## Acceptance criteria
- [ ] Breaking the product makes `npm run check` fail.

## Test plan
Break something on a branch and watch CI go red.
