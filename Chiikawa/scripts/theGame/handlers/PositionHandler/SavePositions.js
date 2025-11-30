'use strict';

export function savePositions(broccolis, brocFlys, flames, float) {
    const broccoliStartStates = broccolis.map(g => ({ x: g.x, y: g.y, dir: g.dir }));
    const brocFlyStartStates = brocFlys.map(f => ({ x: f.x, y: f.y, dir: f.dir }));
    const flamesStartStates = flames.map(p => ({ x: p.x, y: p.y, dir: p.dir }));
    const floatStartStates = float.map(plp => ({ x: plp.x, y: plp.y, dir: plp.dir }));
    return [broccoliStartStates, brocFlyStartStates, flamesStartStates, floatStartStates];
}