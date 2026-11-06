import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'gate-'));
function verdict({ paused = false, expires = '2027-02-05', files = 'src/app.js', draft = 'false', today = '2026-11-05' } = {}) {
  const control = join(dir, 'control.json');
  writeFileSync(control, JSON.stringify({ paused, expires, frozen_paths: ['.github/workflows/', 'agents/control.json', 'scripts/gate.sh'] }));
  return execFileSync('bash', ['scripts/gate.sh', control, draft, today], { input: files + '\n', encoding: 'utf8' }).trim();
}

test('an ordinary PR arms', () => assert.equal(verdict(), 'arm'));
test('paused stops every PR', () => assert.equal(verdict({ paused: true }), 'paused'));
test('a draft waits', () => assert.equal(verdict({ draft: 'true' }), 'draft'));
test('a workflow change is frozen', () => assert.equal(verdict({ files: '.github/workflows/ci.yml' }), 'frozen'));
test('the control file is frozen', () => assert.equal(verdict({ files: 'agents/control.json' }), 'frozen'));
test('the gate cannot change itself', () => assert.equal(verdict({ files: 'scripts/gate.sh' }), 'frozen'));
test('one frozen file among many is enough', () => assert.equal(verdict({ files: 'src/a.js\nagents/control.json\nsrc/b.js' }), 'frozen'));
test('the expiry day itself still arms', () => assert.equal(verdict({ today: '2027-02-05' }), 'arm'));
test('the day after expiry stops', () => assert.equal(verdict({ today: '2027-02-06' }), 'expired'));
test('expired outranks everything', () => assert.equal(verdict({ today: '2027-02-06', paused: true, files: 'agents/control.json', draft: 'true' }), 'expired'));
test('paused outranks frozen and draft', () => assert.equal(verdict({ paused: true, files: 'agents/control.json', draft: 'true' }), 'paused'));
