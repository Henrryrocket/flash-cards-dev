export interface DiagramNode { id: string; label: string; x: number; y: number }
export interface DiagramStep { from: string; to: string; label: string; description: string }
export interface DiagramData { nodes: DiagramNode[]; steps: DiagramStep[] }
export interface Point { x: number; y: number }
export interface Segment { x1: number; y1: number; x2: number; y2: number }

const ARROW_OFFSET = 7;
const round = (n: number) => Math.round(n * 100) / 100;

export const clampStep = (index: number, count: number): number =>
  count <= 0 ? 0 : Math.min(Math.max(index, 0), count - 1);

/** Point where the line from `center` towards `target` leaves a w×h rectangle centered on `center`. */
export function edgePoint(center: Point, target: Point, w: number, h: number): Point {
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  const tx = dx === 0 ? Infinity : w / 2 / Math.abs(dx);
  const ty = dy === 0 ? Infinity : h / 2 / Math.abs(dy);
  const t = Math.min(tx, ty);
  if (!Number.isFinite(t)) return { ...center };
  return { x: round(center.x + dx * t), y: round(center.y + dy * t) };
}

/** Arrow between two nodes, shifted sideways so A→B and B→A never overlap. */
export function arrowPath(from: DiagramNode, to: DiagramNode, w: number, h: number): Segment {
  const start = edgePoint(from, to, w, h);
  const end = edgePoint(to, from, w, h);
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const ox = (-(to.y - from.y) / len) * ARROW_OFFSET;
  const oy = ((to.x - from.x) / len) * ARROW_OFFSET;
  return { x1: round(start.x + ox), y1: round(start.y + oy), x2: round(end.x + ox), y2: round(end.y + oy) };
}

export function validateDiagram(diagram: DiagramData): string[] {
  const ids = new Set(diagram.nodes.map((n) => n.id));
  const errors: string[] = [];
  diagram.steps.forEach((step, i) => {
    for (const ref of [step.from, step.to]) {
      if (!ids.has(ref)) errors.push(`step ${i} references unknown node "${ref}"`);
    }
  });
  return errors;
}
