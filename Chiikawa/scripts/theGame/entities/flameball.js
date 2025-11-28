'use strict';
// Build flying broccoli enemies
export function buildFlame(level, tileSize) {
    const flames = [];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 'P') {
                flames.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize, dir: 1, alive: true });
            }
        }
    }
    return flames;
}

export function updateFlame(delta, flames, level, tileSize, levelWidth, player, rectsCollide, triggerGameOver) {
    const flameSpeed = 450; // pixels per second
    for (const p of flames) {
        if (!p.alive) {
            continue;
        }
        // Move horizontally in current direction
        p.x += p.dir * flameSpeed * delta;
        // Check for edge of map
        if (p.x < 0) {
            p.x = 0;
            p.dir = 1;
        } else if (p.x + p.w > levelWidth) {
            p.x = levelWidth - p.w;
            p.dir = -1;
        }
        // Check for block in front (at same y)
        let nextX = p.dir > 0 ? p.x + p.w : p.x - 1;
        let gridY = Math.floor(p.y / tileSize);
        let gridX = Math.floor(nextX / tileSize);
        if (
            gridY >= 0 && gridY < level.length &&
            gridX >= 0 && gridX < level[0].length &&
            level[gridY][gridX] === '='
        ) {
            p.dir *= -1;
        }
        // Player dies instantly on brocFly collision
        if (rectsCollide(player, p)) {
            triggerGameOver();
            return;
        }
    }
}

export function drawFlames(ctx, flames, cameraX, cameraY, flameImg, scale = 1) {
    for (const p of flames) {
        if (!p.alive) continue;
        ctx.save();
        if (p.dir < 0) {
            ctx.translate(p.x - cameraX + p.w * scale, p.y - cameraY);
            ctx.scale(-1, 1);
            ctx.drawImage(flameImg, 0, 0, p.w * scale, p.h * scale);
        } else {
            ctx.drawImage(flameImg, p.x - cameraX, p.y - cameraY, p.w * scale, p.h * scale);
        }
        ctx.restore();
    }
}