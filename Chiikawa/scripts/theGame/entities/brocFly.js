

// Build flying broccoli enemies
export function buildBrocFlys(level, tileSize) {
    const brocFlys = [];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 'T') {
                brocFlys.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize, dir: 1, alive: true });
            }
        }
    }
    return brocFlys;
}

export function updateBrocFlys(delta, brocFlys, level, tileSize, levelWidth, player, rectsCollide, triggerGameOver) {
    const brocFlySpeed = 150; // pixels per second
    for (const f of brocFlys) {
        if (!f.alive) {
            continue;
        }
        // Move horizontally in current direction
        f.x += f.dir * brocFlySpeed * delta;
        // Check for edge of map
        if (f.x < 0) {
            f.x = 0;
            f.dir = 1;
        } else if (f.x + f.w > levelWidth) {
            f.x = levelWidth - f.w;
            f.dir = -1;
        }
        // Check for block in front (at same y)
        let nextX = f.dir > 0 ? f.x + f.w : f.x - 1;
        let gridY = Math.floor(f.y / tileSize);
        let gridX = Math.floor(nextX / tileSize);
        if (
            gridY >= 0 && gridY < level.length &&
            gridX >= 0 && gridX < level[0].length &&
            level[gridY][gridX] === '='
        ) {
            f.dir *= -1;
        }
        // Player dies instantly on brocFly collision
        if (rectsCollide(player, f)) {
            triggerGameOver();
            return;
        }
    }
}