'use strict';

export function collisions(a, b) {
    return (
        a.x + 3 < b.x + b.w &&
        a.x + a.w - 5 > b.x &&
        a.y + 6 < b.y + b.h &&
        a.y + a.h > b.y
    );
}