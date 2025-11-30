'use strict';
// Timer handler for the game

const timeh2 = document.querySelectorAll('.timer');
export function updateTimer(delta, timer, won) {
    if (!won) {
        const newTimer = timer + delta;
        timeh2.forEach(element => {
            element.textContent = `Time: ${newTimer.toFixed(3)}s`;
        });
        return newTimer;
    } 
    return timer;
}
