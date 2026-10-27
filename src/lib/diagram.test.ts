import { describe, expect, it } from 'vitest';
import { clampStep, edgePoint, arrowPath, validateDiagram, type DiagramData } from './diagram';

const diagram: DiagramData = {
  nodes: [
    { id: 'a', label: 'A', x: 100, y: 100 },
    { id: 'b', label: 'B', x: 300, y: 100 },
  ],
  steps: [{ from: 'a', to: 'b', label: 'go', description: 'A calls B' }],
};

describe('clampStep', () => {
  it('keeps the index inside [0, last]', () => {
    expect(clampStep(-1, 4)).toBe(0);
    expect(clampStep(9, 4)).toBe(3);
    expect(clampStep(2, 4)).toBe(2);
  });
  it('returns 0 for an empty list', () => {
    expect(clampStep(3, 0)).toBe(0);
  });
});

describe('edgePoint', () => {
  it('lands on the right border when the target is to the right', () => {
    expect(edgePoint({ x: 100, y: 100 }, { x: 300, y: 100 }, 120, 50)).toEqual({ x: 160, y: 100 });
  });
  it('lands on the bottom border when the target is below', () => {
    expect(edgePoint({ x: 100, y: 100 }, { x: 100, y: 300 }, 120, 50)).toEqual({ x: 100, y: 125 });
  });
});

describe('arrowPath', () => {
  it('draws opposite directions of the same pair on different lines', () => {
    const [a, b] = diagram.nodes;
    const forward = arrowPath(a!, b!, 120, 50);
    const backward = arrowPath(b!, a!, 120, 50);
    expect(forward.y1).not.toBe(backward.y1);
  });
});

describe('validateDiagram', () => {
  it('accepts a consistent diagram', () => {
    expect(validateDiagram(diagram)).toEqual([]);
  });
  it('reports steps that reference unknown nodes', () => {
    const bad = { ...diagram, steps: [{ from: 'a', to: 'zzz', label: 'x', description: 'y' }] };
    expect(validateDiagram(bad)).toEqual(['step 0 references unknown node "zzz"']);
  });
});
