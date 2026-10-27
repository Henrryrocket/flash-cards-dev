import { describe, expect, it } from 'vitest';
import { filterByLevel, loadProgress, saveProgress, setStatus, summarize, type Progress } from './progress';

const cards = [
  { id: 'a', level: 'beginner' as const },
  { id: 'b', level: 'intermediate' as const },
  { id: 'c', level: 'advanced' as const },
];

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = { ...initial };
  return {
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => { data[k] = v; },
    data,
  };
};

describe('filterByLevel', () => {
  it('returns all cards for "all"', () => {
    expect(filterByLevel(cards, 'all')).toHaveLength(3);
  });
  it('returns only the selected level', () => {
    expect(filterByLevel(cards, 'advanced').map((c) => c.id)).toEqual(['c']);
  });
});

describe('setStatus', () => {
  it('marks a card without mutating the input', () => {
    const before: Progress = {};
    const after = setStatus(before, 'a', 'known');
    expect(after).toEqual({ a: 'known' });
    expect(before).toEqual({});
  });
});

describe('summarize', () => {
  it('counts known cards among the given ones', () => {
    expect(summarize(cards, { a: 'known', b: 'review', z: 'known' })).toEqual({ known: 1, total: 3 });
  });
});

describe('loadProgress / saveProgress', () => {
  it('round-trips through storage', () => {
    const s = memoryStorage();
    saveProgress(s, 'http', { a: 'known' });
    expect(loadProgress(s, 'http')).toEqual({ a: 'known' });
  });
  it('returns empty progress for corrupted JSON', () => {
    const s = memoryStorage({ 'sf:progress:http': '{not json' });
    expect(loadProgress(s, 'http')).toEqual({});
  });
  it('drops invalid statuses and non-object payloads', () => {
    expect(loadProgress(memoryStorage({ 'sf:progress:x': '[1]' }), 'x')).toEqual({});
    expect(loadProgress(memoryStorage({ 'sf:progress:x': '{"a":"hax","b":"known"}' }), 'x')).toEqual({ b: 'known' });
  });
  it('survives a storage that throws', () => {
    const broken = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } };
    expect(loadProgress(broken, 'http')).toEqual({});
    expect(() => saveProgress(broken, 'http', {})).not.toThrow();
  });
});
