import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('public/_redirects', () => {
  it('redirects the root to the default locale with a real HTTP redirect', () => {
    const rules = readFileSync('public/_redirects', 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
    expect(rules).toContain('/ /en/ 302');
  });
});

describe('wrangler.jsonc', () => {
  const config = readFileSync('wrangler.jsonc', 'utf8');
  it('serves dist as static assets', () => {
    expect(config).toMatch(/"directory":\s*"\.\/dist"/);
  });
  it('serves the custom 404 page for unknown routes', () => {
    expect(config).toMatch(/"not_found_handling":\s*"404-page"/);
  });
});

describe('404 page source', () => {
  const page = readFileSync('src/pages/404.astro', 'utf8');
  it('offers a way back in both languages', () => {
    expect(page).toContain('/en/');
    expect(page).toContain('/es/');
  });
});
