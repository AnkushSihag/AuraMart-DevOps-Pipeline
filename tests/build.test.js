import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('Production build should generate index.html', () => {
  assert.ok(existsSync('dist/index.html'));
});

test('Production HTML should contain the application root', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /id="root"/);
});

test('Production HTML should reference bundled assets', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /\/assets\//);
});
