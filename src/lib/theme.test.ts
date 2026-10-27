import { describe, expect, it } from 'vitest';
import { THEME_KEY, nextTheme, parseStored, resolveTheme } from './theme';

describe('parseStored', () => {
  it('accepts only light or dark', () => {
    expect(parseStored('light')).toBe('light');
    expect(parseStored('dark')).toBe('dark');
    expect(parseStored('purple')).toBeNull();
    expect(parseStored(null)).toBeNull();
  });
});

describe('resolveTheme', () => {
  it('uses the stored choice over the system preference', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
  it('falls back to the system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
});

describe('nextTheme', () => {
  it('toggles between light and dark', () => {
    expect(nextTheme('light')).toBe('dark');
    expect(nextTheme('dark')).toBe('light');
  });
});

describe('THEME_KEY', () => {
  it('is namespaced', () => {
    expect(THEME_KEY).toBe('sf:theme');
  });
});
