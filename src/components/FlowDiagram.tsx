import { useEffect, useState } from 'react';
import { arrowPath, clampStep, type DiagramData } from '../lib/diagram';

interface Labels {
  prev: string; next: string; play: string; pause: string; reset: string;
  step: string; of: string; aria: string;
}
interface Props { diagram: DiagramData & { title: string }; labels: Labels }

const NODE_W = 108;
const NODE_H = 46;
const STEP_MS = 1800;

export default function FlowDiagram({ diagram, labels }: Props) {
  const { nodes, steps, title } = diagram;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const current = steps[index]!;
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (index >= last) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setIndex((i) => clampStep(i + 1, steps.length)), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last, steps.length]);

  const btn = 'rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:opacity-30';
  const go = (i: number) => { setPlaying(false); setIndex(clampStep(i, steps.length)); };

  return (
    <figure className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <figcaption className="mb-2 text-sm font-semibold text-zinc-300">{title}</figcaption>
      <svg viewBox="0 0 800 320" role="img" aria-label={`${labels.aria}: ${title}`} className="h-auto w-full">
        <defs>
          <marker id="arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="fill-emerald-400" />
          </marker>
          <marker id="arrow-off" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="fill-zinc-700" />
          </marker>
        </defs>
        {steps.map((s, i) => {
          const from = byId.get(s.from)!;
          const to = byId.get(s.to)!;
          const seg = arrowPath(from, to, NODE_W, NODE_H);
          const active = i === index;
          const done = i < index;
          return (
            <g key={i}>
              <line {...seg} strokeWidth={active ? 3 : 1.5}
                markerEnd={`url(#${active ? 'arrow-on' : 'arrow-off'})`}
                className={`transition-colors duration-300 ${active ? 'stroke-emerald-400' : done ? 'stroke-zinc-500' : 'stroke-zinc-800'}`} />
              {active && (
                <text x={(seg.x1 + seg.x2) / 2} y={(seg.y1 + seg.y2) / 2 - 12} textAnchor="middle" fontSize="12"
                  className="fill-emerald-300 font-mono">{s.label}</text>
              )}
            </g>
          );
        })}
        {nodes.map((n) => {
          const on = n.id === current.from || n.id === current.to;
          return (
            <g key={n.id}>
              <rect x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx="10"
                className={`transition-colors duration-300 ${on ? 'fill-emerald-400/15 stroke-emerald-400' : 'fill-zinc-950 stroke-zinc-700'}`} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="15" className="fill-zinc-100 font-semibold">{n.label}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 min-h-[3rem] text-sm text-zinc-300" aria-live="polite">
        <span className="text-emerald-400">{labels.step} {index + 1} {labels.of} {steps.length}.</span> {current.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={btn} onClick={() => go(index - 1)} disabled={index === 0}>{labels.prev}</button>
        <button type="button" className={btn} onClick={() => (index >= last ? (setIndex(0), setPlaying(true)) : setPlaying(!playing))}>
          {playing ? labels.pause : labels.play}
        </button>
        <button type="button" className={btn} onClick={() => go(index + 1)} disabled={index >= last}>{labels.next}</button>
        <button type="button" className={btn} onClick={() => go(0)}>{labels.reset}</button>
      </div>
    </figure>
  );
}
