#!/usr/bin/env node
// Fails if the control file loses a safety setting, so an agent's edit or a bad merge can't quietly remove one.
import { existsSync, readFileSync } from 'node:fs';

const path = process.argv[2] || 'agents/control.json';
const REQUIRED_FROZEN = ['.github/workflows/', 'agents/control.json', 'scripts/gate.sh'];
const problems = [];
let c;
try { c = JSON.parse(readFileSync(path, 'utf8')); } catch (e) { console.error(`check-agents: ${path}: ${e.message}`); process.exit(1); }
if (typeof c.paused !== 'boolean') problems.push('paused must be true or false');
if (!/^\d{4}-\d{2}-\d{2}$/.test(c.expires || '')) problems.push('expires must be a YYYY-MM-DD date');
for (const f of REQUIRED_FROZEN) if (!(c.frozen_paths || []).includes(f)) problems.push(`frozen_paths must include ${f}`);
if (!c.agents?.builder?.max_merges_per_day) problems.push('agents.builder.max_merges_per_day is required');
for (const a of ['common', 'scout', 'builder', 'critic', 'keeper']) {
  if (process.argv[2] === undefined && !existsSync(`agents/prompts/${a}.md`)) problems.push(`agents/prompts/${a}.md is missing`);
}
if (problems.length) { console.error(`check-agents: ${problems.length} problem(s)\n  ` + problems.join('\n  ')); process.exit(1); }
console.log(`check-agents: OK (expires ${c.expires}${c.paused ? ', PAUSED' : ''})`);
