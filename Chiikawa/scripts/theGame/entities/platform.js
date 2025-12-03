// It builds our platforms!!!
// the = sign measn ground block
// Peers mentioned to add movable platforms, maybe later, idk, I dont want to shoot myself in the foot
// TODO: Add movable platforms: Done!

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


// Movable platforms:DDD
export function buildFloats(level, titleSize) {
    const floats = [];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++){
            if (level[y][x] === '+') {
                floats.push({x: x * titleSize, y: y * titleSize, w: titleSize, h: titleSize, dir: 1})
            } else if (level[y][x] === '^') {
                floats.push({x: x * titleSize, y: y * titleSize, w: titleSize, h: titleSize, dir: 1})
            }
        }
    }
    return floats;
}

export function updateFloats(delta, floats, level, tileSize, levelWidth) {
    const floatSpeed = 100;
    for (const pl of floats) {
        pl.x += pl.dir * floatSpeed * delta;
        // Check for edge of map
        if (pl.x < 0) {
            pl.x = 0;
            pl.dir = 1;
        } else if (pl.x + pl.w > levelWidth) {
            pl.x = levelWidth - pl.w;
            pl.dir = -1;
        }
        // Check for block in front (at same y)
        let nextX = pl.dir > 0 ? pl.x + pl.w : pl.x - 1;
        let gridY = Math.floor(pl.y / tileSize);
        let gridX = Math.floor(nextX / tileSize);
        if ((gridY >= 0 && gridY < level.length &&
            gridX >= 0 && gridX < level[0].length &&
            level[gridY][gridX] === '=')
            ||
            (gridY >= 0 && gridY < level.length &&
            gridX >= 0 && gridX < level[0].length &&
            level[gridY][gridX] === '-')) {
            pl.dir *= -1;
        }
    }
}

export function drawFloats(ctx, floats, cameraX, cameraY, floatImg, scale = 1) {
    for (const pl of floats) {
        ctx.save();
        if (pl.dir < 0) {
            ctx.translate(pl.x - cameraX + pl.w * scale, pl.y - cameraY);
            ctx.scale(-1, 1);
            ctx.drawImage(floatImg, 0, 0, pl.w * scale, pl.h * scale);
        } else {
            ctx.drawImage(floatImg, pl.x - cameraX, pl.y - cameraY, pl.w * scale, pl.h * scale);
        }
        ctx.restore();
    }
}