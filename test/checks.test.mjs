import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'checks-'));
const good = { paused: false, expires: '2027-02-05', frozen_paths: ['.github/workflows/', 'agents/control.json', 'scripts/gate.sh'], agents: { builder: { max_merges_per_day: 8 } } };
function agents(c) {
  const p = join(dir, 'c.json'); writeFileSync(p, JSON.stringify(c));
  return spawnSync('node', ['scripts/check-agents.mjs', p], { encoding: 'utf8' });
}

test('a complete control file passes', () => assert.equal(agents(good).status, 0));
test('removing the expiry fails', () => { const { expires, ...c } = good; assert.equal(agents(c).status, 1); });
test('unfreezing the workflows fails', () => assert.equal(agents({ ...good, frozen_paths: ['agents/control.json', 'scripts/gate.sh'] }).status, 1));
test('the shipped tickets are valid', () => assert.equal(spawnSync('node', ['scripts/check-backlog.mjs']).status, 0));
test('a duplicate ticket id fails', () => {
  const d = mkdtempSync(join(tmpdir(), 'bl-'));
  const t = '---\nid: 0001\ntitle: "t"\nstatus: proposed\npriority: P1\nsize: S\nlens: growth\ncreated: 2026-01-01\nby: scout\n---\n## Why\n## What\n## Acceptance criteria\n## Test plan\n';
  writeFileSync(join(d, '0001-a.md'), t); writeFileSync(join(d, '0001-b.md'), t);
  assert.equal(spawnSync('node', ['scripts/check-backlog.mjs', d]).status, 1);
});
