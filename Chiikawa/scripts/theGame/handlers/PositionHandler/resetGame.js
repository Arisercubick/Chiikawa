'use strict';

import { savePositions } from './SavePositions.js';

export function resetGame(broccolis, brocFlys, flames, float, player, playerDefaults, timer, stopTimer, gameWon, gameOver, cameraX, broccoliStartStates, brocFlyStartStates, flamesStartStates, floatStartStates) {
    // Reset player position and make velocities = zero
    timer = 0;
    stopTimer = false;
    player.x = playerDefaults.startX;
    player.y = playerDefaults.startY;
    player.vx = 0;
    player.vy = 0;

    // When I made this, I used to know what it does.
    // Now I need prayers to understand this

    // This just restarts the positions of the enemies as their start states

    // However, Kelly, I know this is hard to read, dont worry
    for (let i = 0; i < broccolis.length; i++) {
        broccolis[i].x = broccoliStartStates[i].x;
        broccolis[i].y = broccoliStartStates[i].y;
        broccolis[i].dir = broccoliStartStates[i].dir;
        broccolis[i].alive = true;
    }
    for (let i = 0; i < brocFlys.length; i++) {
        brocFlys[i].x = brocFlyStartStates[i].x;
        brocFlys[i].y = brocFlyStartStates[i].y;
        brocFlys[i].dir = brocFlyStartStates[i].dir;
        brocFlys[i].alive = true;
    }
    for (let i = 0; i < flames.length; i++) {
        flames[i].x = flamesStartStates[i].x;
        flames[i].y = flamesStartStates[i].y;
        flames[i].dir = flamesStartStates[i].dir;
    }
    for (let i = 0; i < float.length; i++) {
        float[i].x = floatStartStates[i].x;
        float[i].y = floatStartStates[i].y;
        float[i].dir = floatStartStates[i].dir;
    }

    //resets conditions
    gameWon = false;
    gameOver = false;
    document.getElementById('congratsScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    cameraX = 0;

    return [timer, stopTimer, gameWon, gameOver, cameraX, broccolis, brocFlys, flames, float];
}