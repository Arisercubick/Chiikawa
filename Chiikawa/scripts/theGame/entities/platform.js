// It builds our platforms!!!
// the = sign measn ground block
// Peers mentioned to add movable platforms, maybe later, idk, I dont want to shoot myself in the foot
// TODO: Add movable platforms

'use strict';
export function buildPlatforms(level, tileSize) {
    const platforms = [];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === '=') {
                platforms.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize });
            }
        }
    }
    return platforms;
}