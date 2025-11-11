// game.js - Basic game data and arrays for world1.js

// Example: tile size, player defaults, and asset paths
export const tileSize = 40;
export const playerDefaults = {
    w: 40,
    h: 40,
    speed: 3,
    jump: -10,
    startX: 2 * 40,
    startY: 8 * 40
};

export const assetPaths = {
    bg: '../images/bd3410e44a72b4baa918181e82271ee3-400.jpg',
    player: '../images/AdorableCutieChiikawa.png',
    ground: '../images/gameAssets/ByIjUv.png',
    broccoli: '../images/pngtree-sticker-vector-png-image_6818893.png'
};

// Example: function to build platforms and enemies from level data
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

export function buildBroccolis(level, tileSize) {
    const broccolis = [];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 'G') {
                broccolis.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize, dir: 1, alive: true });
            }
        }
    }
    return broccolis;
}
