export type Level = 'beginner' | 'intermediate' | 'advanced';
export type LevelFilter = Level | 'all';
export type Status = 'known' | 'review';
export type Progress = Record<string, Status>;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const keyFor = (topic: string) => `sf:progress:${topic}`;

export const filterByLevel = <T extends { level: Level }>(cards: readonly T[], level: LevelFilter): T[] =>
  level === 'all' ? [...cards] : cards.filter((c) => c.level === level);

export const setStatus = (progress: Progress, id: string, status: Status): Progress => ({
  ...progress,
  [id]: status,
});

export const summarize = (cards: readonly { id: string }[], progress: Progress) => ({
  known: cards.filter((c) => progress[c.id] === 'known').length,
  total: cards.length,
});

export function loadProgress(storage: StorageLike, topic: string): Progress {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(keyFor(topic)) ?? '{}');
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    const clean: Progress = {};
    for (const [id, status] of Object.entries(parsed)) {
      if (status === 'known' || status === 'review') clean[id] = status;
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveProgress(storage: StorageLike, topic: string, progress: Progress): void {
  try {
    storage.setItem(keyFor(topic), JSON.stringify(progress));
  } catch {
    // Storage can be blocked (private mode); progress simply isn't persisted.
  }
}
