'use strict';

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

export function updateBroccolis(delta, broccolis, platforms, player, rectsCollide, triggerGameOver) {
    const broccoliSpeed = 80; // pixels per second
    for (const g of broccolis) {
        if (!g.alive) continue;
        g.x += g.dir * broccoliSpeed * delta;
        let onPlatform = false;
        for (const plat of platforms) {
            if (
                g.x + g.w / 2 > plat.x &&
                g.x + g.w / 2 < plat.x + plat.w &&
                g.y + g.h === plat.y
            ) {
                onPlatform = true;
            }
            if (rectsCollide(g, plat)) {
                if (g.dir > 0) {
                    g.x = plat.x - g.w;
                }
                if (g.dir < 0) {
                    g.x = plat.x + plat.w;
                }
                g.dir *= -1;
            }
        }
        if (!onPlatform) g.dir *= -1;
        if (
            rectsCollide(player, g) &&
            player.vy > 0 &&
            player.y + player.h - g.y < 20
        ) {
            g.alive = false;
            player.vy = player.jump / 1.5;
            break; // breaks the for loop to prevent multiple kills at once
        } else if (rectsCollide(player, g) && g.alive) {
            triggerGameOver();
            return;
        }
    }
}