// Platformer game using canvas
<<<<<<< HEAD
// This code creates a simple Mario-style platformer game using HTML5 Canvas and JavaScript.
// The player can move, jump, and interact with enemies and platforms.
=======
// Assets:
// Player: /images/AdorableCutieChiikawa.png
// Enemy: /images/pngtree-sticker-vector-png-image_6818893.png
// Groynd: /images/gameAssets/ByIjUv.png
// Background: /images/bd3410e44a72b4baa918181e82271ee3-400.jpg
>>>>>>> 3b32411c4e14ecea430cdc47c3417de9144adfd4

// Get the canvas and its drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images for background, player, enemy (broccoli), and ground
const bgImg = new Image();
bgImg.src = '../images/bd3410e44a72b4baa918181e82271ee3-400.jpg';
const playerImg = new Image();
playerImg.src = '../images/AdorableCutieChiikawa.png';
<<<<<<< HEAD
=======
const broccoliImg = new Image();
broccoliImg.src = '../images/pngtree-sticker-vector-png-image_6818893.png';
>>>>>>> 3b32411c4e14ecea430cdc47c3417de9144adfd4
const groundImg = new Image();
groundImg.src = '../images/gameAssets/ByIjUv.png';
const broccoliImg = new Image();
broccoliImg.src = '../images/pngtree-sticker-vector-png-image_6818893.png';

<<<<<<< HEAD
// Level data: each string is a row, each character is a tile
=======





// Level data size
>>>>>>> 3b32411c4e14ecea430cdc47c3417de9144adfd4
const tileSize = 40;
const level = [
    // ...level layout with platforms, gaps, and staircase...
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                      =                                         ',
    '                                     ==                                         ',
    '                                    ===                                         ',
    '                                   ====                                         ',
    '                                  =====                                         ',
    '                                 ======                                         ',
    '        ?   G    G              =======      G                    G             ',
    '===========================   ============================   ===================',
    '                                                                                '
];

// Build platform and enemy (broccoli) positions from the level data
const platforms = [];
for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
        if (level[y][x] === '=') {
            platforms.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize });
        }
    }
}

const broccolis = [];
for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
        if (level[y][x] === 'G') {
            broccolis.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize, dir: 1, alive: true });
        }
    }
}

// Player object stores position, velocity, and state
const player = {
    x: 2 * tileSize,
    y: 8 * tileSize,
    w: tileSize,
    h: tileSize,
    vx: 0,
    vy: 0,
    onGround: false,
    speed: 3,
    jump: -10
};

let keys = {}; // Tracks which keys are pressed
let gameWon = false;
let gameOver = false;

// Camera offset for scrolling
let cameraX = 0;
const screenWidth = canvas.width;
const levelWidth = level[0].length * tileSize;

// Keyboard controls
window.addEventListener('keydown', e => {
    keys[e.code] = true;
});
window.addEventListener('keyup', e => {
    keys[e.code] = false;
});

// Check if two rectangles overlap (collision detection)
function rectsCollide(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// Main game update logic: movement, collisions, win/lose conditions
function update() {
    if (gameWon || gameOver) {
        return;
    }
    // Player movement
    player.vx = 0;
    if (keys['ArrowLeft']) {
        player.vx = -player.speed;
    }
    if (keys['ArrowRight']) {
        player.vx = player.speed;
    }
    if (keys['Space'] && player.onGround) {
        player.vy = player.jump;
        player.onGround = false;
    }
    // Gravity
    player.vy += 0.5;
    // Horizontal movement and collision
    player.x += player.vx;
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {
            if (player.vx > 0) {
                player.x = plat.x - player.w;
            }
            if (player.vx < 0) {
                player.x = plat.x + plat.w;
            }
        }
    }
    // Vertical movement and collision
    player.y += player.vy;
    player.onGround = false;
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {
            if (player.vy > 0) {
                player.y = plat.y - player.h;
                player.vy = 0;
                player.onGround = true;
            } else if (player.vy < 0) {
                player.y = plat.y + plat.h;
                player.vy = 0;
            }
        }
    }
    // Broccoli enemy logic
    for (const g of broccolis) {
        if (!g.alive) {
            continue;
        }
        g.x += g.dir * 1.2;
        // Turn at platform edges
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
        if (!onPlatform) {
            g.dir *= -1;
        }
        // Player stomps broccoli
        if (
            rectsCollide(player, g) &&
            player.vy > 0 &&
            player.y + player.h - g.y < 20
        ) {
            g.alive = false;
            player.vy = player.jump / 1.5;
        } else if (rectsCollide(player, g) && g.alive) {
            // Player hit by broccoli
            triggerGameOver();
            return;
        }
    }
    // Win condition: reach far right
    if (player.x > (level[0].length - 2) * tileSize) {
        gameWon = true;
        document.getElementById('congratsScreen').classList.remove('hidden');
    }
    // Lose condition: fall off the screen
    if (player.y > canvas.height + 100) {
        triggerGameOver();
        return;
    }
    // Camera logic: keep player near center, but clamp at level edges
    const centerX = player.x + player.w / 2;
    if (centerX - cameraX > screenWidth * 0.6 && cameraX < levelWidth - screenWidth) {
        cameraX = Math.min(centerX - screenWidth * 0.6, levelWidth - screenWidth);
    } else if (centerX - cameraX < screenWidth * 0.4 && cameraX > 0) {
        cameraX = Math.max(centerX - screenWidth * 0.4, 0);
    }
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    // Dim the background for clarity
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    // Draw platforms (ground)
    for (const plat of platforms) {
        ctx.drawImage(groundImg, plat.x - cameraX, plat.y, plat.w, plat.h);
    }
    // Draw broccolis (enemies)
    for (const g of broccolis) {
        if (!g.alive) {
            continue;
        }
        ctx.drawImage(broccoliImg, g.x - cameraX, g.y, g.w, g.h);
    }
    // Draw player
    ctx.drawImage(playerImg, player.x - cameraX, player.y, player.w, player.h);
}

// Main game loop: update and draw repeatedly
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Show the game over screen
function triggerGameOver() {
    gameOver = true;
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Store original broccoli positions for reset
const broccoliStartStates = broccolis.map(g => ({ x: g.x, y: g.y, dir: g.dir }));

// Reset the game to its initial state
function resetGame() {
    player.x = 2 * tileSize;
    player.y = 8 * tileSize;
    player.vx = 0;
    player.vy = 0;
    for (let i = 0; i < broccolis.length; i++) {
        broccolis[i].x = broccoliStartStates[i].x;
        broccolis[i].y = broccoliStartStates[i].y;
        broccolis[i].dir = broccoliStartStates[i].dir;
        broccolis[i].alive = true;
    }
    gameWon = false;
    gameOver = false;
    document.getElementById('congratsScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    cameraX = 0;
}

// Wait for all images to load before starting the game
let loaded = 0;
[playerImg, groundImg, bgImg, broccoliImg].forEach(img => {
    img.onload = () => {
        loaded++;
        if (loaded === 4) {
            loop();
        }
    };
});

// Set up the Play Again button to reload the page
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('playAgainBTN');
    if (btn) {
        btn.onclick = () => {
            window.location.reload();
        };
    }
});
