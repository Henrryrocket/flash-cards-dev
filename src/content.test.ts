import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (lang: string, file: string) =>
  JSON.parse(readFileSync(`src/content/topics/${lang}/${file}`, 'utf8'));

const files = readdirSync('src/content/topics/es').filter((f) => f.endsWith('.json'));

describe('topic content parity (es/en)', () => {
  it('has the same topic files in both languages', () => {
    expect(readdirSync('src/content/topics/en').sort()).toEqual([...files].sort());
  });

  it.each(files)('%s: same card ids, levels and resources in both languages', (file) => {
    const es = read('es', file);
    const en = read('en', file);
    const shape = (t: any) => t.cards.map((c: any) => `${c.id}:${c.level}`);
    expect(shape(en)).toEqual(shape(es));
    expect(en.resources.map((r: any) => r.url)).toEqual(es.resources.map((r: any) => r.url));
    expect(en.order).toBe(es.order);
    expect(en.diagram).toBe(es.diagram);
  });

  it.each(files)('%s: covers every level at least once', (file) => {
    const levels = new Set(read('es', file).cards.map((c: any) => c.level));
    expect(levels).toEqual(new Set(['beginner', 'intermediate', 'advanced']));
  });

  it('has unique topic orders', () => {
    const orders = files.map((f) => read('es', f).order);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
