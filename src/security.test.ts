import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const headers = readFileSync('public/_headers', 'utf8');

describe('public/_headers', () => {
  it.each([
    'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    "Content-Security-Policy: frame-ancestors 'none'",
    'Cross-Origin-Opener-Policy: same-origin',
  ])('sets %s', (line) => {
    expect(headers).toContain(line);
  });

  it('denies powerful browser features', () => {
    expect(headers).toMatch(/Permissions-Policy:.*camera=\(\).*microphone=\(\).*geolocation=\(\)/);
  });

  it('applies to every path', () => {
    expect(headers.split('\n')[0]).toBe('/*');
  });
});
