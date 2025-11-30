'use strict';

export function collisionX(player, platforms, float, delta, rectsCollide) {
// Try to move horizontally, check for block
    player.x += player.vx * delta; // vx is pixels/sec, delta is seconds
    let blockedX = false;
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {

            if (player.vx > 0) {
                player.x = plat.x - player.w;
            }

            if (player.vx < 0) {
                player.x = plat.x + plat.w;
            }

            blockedX = true;
        }

    }

    for (const plat of float) {
        if (rectsCollide(player, plat)) {

            if (player.vx > 0) {
                player.x = plat.x - player.w;
            }

            if (player.vx < 0) {
                player.x = plat.x + plat.w;
            }

            blockedX = true;
        }

    }

    return blockedX
}

export function collisionY(player, platforms, float, delta, rectsCollide) {
    player.y += player.vy * delta; // vy is pixels/sec, delta is seconds
    player.onGround = false;
    let blockedY = false;
    let blockDirY = 0;
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {
            if (player.vy > 0) {
                player.y = plat.y - player.h;
                player.vy = 0;
                player.onGround = true;
                blockedY = true;
                blockDirY = 1; // Blocked below
            }
            if (player.vy < 0) {
                player.y = plat.y + plat.h;
                player.vy = 0;
                blockedY = true;
                blockDirY = -1; // Blocked above
            }
        }
    }

    for (const plat of float) {
        if (rectsCollide(player, plat)) {
            if (player.vy > 0) {
                player.y = plat.y - player.h;
                player.vy = 0;
                player.onGround = true;
                blockedY = true;
                blockDirY = 1; // Blocked below
            }
            if (player.vy < 0) {
                player.y = plat.y + plat.h;
                player.vy = 0;
                blockedY = true;
                blockDirY = -1; // Blocked above
            }
        }
    }

    return [blockDirY, blockedY];
}