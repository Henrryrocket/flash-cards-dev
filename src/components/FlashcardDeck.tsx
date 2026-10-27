import { useEffect, useMemo, useState } from 'react';
import {
  filterByLevel, loadProgress, saveProgress, setStatus, summarize,
  type Level, type LevelFilter, type Progress,
} from '../lib/progress';

interface Card { id: string; level: Level; question: string; answer: string }
interface Labels {
  all: string; show: string; hide: string; known: string; review: string;
  prev: string; next: string; of: string; mastered: string; empty: string;
  level: Record<Level, string>;
}
interface Props { topic: string; cards: Card[]; labels: Labels }

const FILTERS: LevelFilter[] = ['all', 'beginner', 'intermediate', 'advanced'];

export default function FlashcardDeck({ topic, cards, labels }: Props) {
  const [level, setLevel] = useState<LevelFilter>('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try { setProgress(loadProgress(window.localStorage, topic)); } catch { /* storage blocked */ }
  }, [topic]);

  const visible = useMemo(() => filterByLevel(cards, level), [cards, level]);
  const card = visible[index];
  const { known, total } = summarize(visible, progress);

  const go = (next: number) => {
    setFlipped(false);
    setIndex(Math.min(Math.max(next, 0), visible.length - 1));
  };

  const mark = (status: 'known' | 'review') => {
    if (!card) return;
    const updated = setStatus(progress, card.id, status);
    setProgress(updated);
    try { saveProgress(window.localStorage, topic, updated); } catch { /* storage blocked */ }
    if (index < visible.length - 1) go(index + 1); else setFlipped(false);
  };

  const pick = (l: LevelFilter) => { setLevel(l); setIndex(0); setFlipped(false); };
  const btn = 'rounded-lg border border-line px-3 py-2 text-sm transition hover:border-brand ';

  return (
    <section aria-label={topic}>
      <div role="group" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={level === f} onClick={() => pick(f)}
            className={`${btn} ${level === f ? 'border-brand bg-brand-soft text-brand' : 'text-mute'}`}>
            {f === 'all' ? labels.all : labels.level[f]}
          </button>
        ))}
      </div>

      <progress value={known} max={Math.max(total, 1)} aria-label={labels.mastered}
        className="mt-4 block h-1.5 w-full overflow-hidden rounded bg-surface2 [&::-moz-progress-bar]:bg-brand [&::-webkit-progress-bar]:bg-surface2 [&::-webkit-progress-value]:bg-brand [&::-webkit-progress-bar]:rounded [&::-webkit-progress-value]:rounded" />
      <p className="mt-1 text-xs text-mute">{known}/{total} {labels.mastered}</p>

      {!card ? (
        <p className="mt-8 text-mute">{labels.empty}</p>
      ) : (
        <article className="mt-6 rounded-2xl border border-line bg-surface p-6 card-shadow">
          <div className="flex justify-between text-xs text-mute">
            <span className="text-brand">{labels.level[card.level]}</span>
            <span>{index + 1} {labels.of} {visible.length}</span>
          </div>
          <p className="mt-4 text-lg font-semibold">{card.question}</p>
          {flipped && <p className="mt-4 border-t border-line pt-4 text-ink" aria-live="polite">{card.answer}</p>}
          <button type="button" onClick={() => setFlipped(!flipped)} className={`${btn} mt-6 w-full`}>
            {flipped ? labels.hide : labels.show}
          </button>
          {flipped && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => mark('review')} className={`${btn} text-caution`}>{labels.review}</button>
              <button type="button" onClick={() => mark('known')} className={`${btn} text-brand`}>{labels.known}</button>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className={`${btn} disabled:opacity-30`}>{labels.prev}</button>
            <button type="button" onClick={() => go(index + 1)} disabled={index >= visible.length - 1} className={`${btn} disabled:opacity-30`}>{labels.next}</button>
          </div>
        </article>
      )}
    </section>
  );
}
