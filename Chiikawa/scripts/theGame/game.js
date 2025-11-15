// --- Game Engine Logic ---
export function runGame({ level, playerStart, onWin }) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const platforms = buildPlatforms(level, tileSize);
    const broccolis = buildBroccolis(level, tileSize);
    const player = {
        x: playerStart?.x ?? playerDefaults.startX,
        y: playerStart?.y ?? playerDefaults.startY,
        w: playerDefaults.w,
        h: playerDefaults.h,
        vx: 0,
        vy: 0,
        onGround: false,
        speed: playerDefaults.speed,
        jump: playerDefaults.jump
    };
    let keys = {};
    let gameWon = false;
    let gameOver = false;
    let cameraX = 0;
    const screenWidth = canvas.width;
    const levelWidth = level[0].length * tileSize;

    // Load images
    const bgImg = new Image();
    bgImg.src = assetPaths.bg;
    const playerImg = new Image();
    playerImg.src = assetPaths.player;
    const groundImg = new Image();
    groundImg.src = assetPaths.ground;
    const broccoliImg = new Image();
    broccoliImg.src = assetPaths.broccoli;

    window.addEventListener('keydown', e => {
        keys[e.code] = true;
        // Prevent page scroll when pressing Space (jump)
        if (e.code === 'Space' && document.activeElement === document.body) {
            e.preventDefault();
        }
    });
    window.addEventListener('keyup', e => { keys[e.code] = false; });

    function isLeftPressed() {
        return keys['ArrowLeft'] || keys['KeyA'];
    }
    function isRightPressed() {
        return keys['ArrowRight'] || keys['KeyD'];
    }

    function rectsCollide(a, b) {
        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
        );
    }

    function update() {
        if (gameWon || gameOver) return;
        player.vx = 0;
        if (isLeftPressed()) player.vx = -player.speed;
        if (isRightPressed()) player.vx = player.speed;
        if (keys['Space'] && player.onGround) {
            player.vy = player.jump;
            player.onGround = false;
        }
        player.vy += 0.5;
        player.x += player.vx;
        for (const plat of platforms) {
            if (rectsCollide(player, plat)) {
                if (player.vx > 0) player.x = plat.x - player.w;
                if (player.vx < 0) player.x = plat.x + plat.w;
            }
        }
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
        for (const g of broccolis) {
            if (!g.alive) continue;
            g.x += g.dir * 1.2;
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
                    if (g.dir > 0) g.x = plat.x - g.w;
                    if (g.dir < 0) g.x = plat.x + plat.w;
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
            } else if (rectsCollide(player, g) && g.alive) {
                triggerGameOver();
                return;
            }
        }
        if (player.x > (level[0].length - 2) * tileSize) {
            gameWon = true;
            document.getElementById('congratsScreen').classList.remove('hidden');
            if (onWin) onWin();
            // Add restart button logic for congrats screen
            setTimeout(() => {
              const restartBtn = document.getElementById('restartBTN');
              if (restartBtn) {
                restartBtn.onclick = () => { resetGame(); };
              }
            }, 0);
        }
        if (player.y > canvas.height + 100) {
            triggerGameOver();
            return;
        }
        const centerX = player.x + player.w / 2;
        if (centerX - cameraX > screenWidth * 0.6 && cameraX < levelWidth - screenWidth) {
            cameraX = Math.min(centerX - screenWidth * 0.6, levelWidth - screenWidth);
        } else if (centerX - cameraX < screenWidth * 0.4 && cameraX > 0) {
            cameraX = Math.max(centerX - screenWidth * 0.4, 0);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        for (const plat of platforms) {
            ctx.drawImage(groundImg, plat.x - cameraX, plat.y, plat.w, plat.h);
        }
        for (const g of broccolis) {
            if (!g.alive) continue;
            ctx.drawImage(broccoliImg, g.x - cameraX, g.y, g.w, g.h);
        }
        ctx.drawImage(playerImg, player.x - cameraX, player.y, player.w, player.h);
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    function triggerGameOver() {
        gameOver = true;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }

    // Store original broccoli positions for reset
    const broccoliStartStates = broccolis.map(g => ({ x: g.x, y: g.y, dir: g.dir }));
    function resetGame() {
        player.x = playerDefaults.startX;
        player.y = playerDefaults.startY;
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

    let loaded = 0;
    [playerImg, groundImg, bgImg, broccoliImg].forEach(img => {
        img.onload = () => {
            loaded++;
            if (loaded === 4) {
                loop();
            }
        };
    });

    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('playAgainBTN');
        if (btn) {
            btn.onclick = () => { resetGame(); };
        }
    });

    function setupMobileControls() {
        const upBtn = document.getElementById('mobileUpBTN');
        const leftBtn = document.getElementById('mobileLeftBTN');
        const rightBtn = document.getElementById('mobileRightBTN');
        if (upBtn) {
            upBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                keys['Space'] = true;
            });
            upBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                keys['Space'] = false;
            });
        }
        if (leftBtn) {
            leftBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                keys['ArrowLeft'] = true;
            });
            leftBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                keys['ArrowLeft'] = false;
            });
        }
        if (rightBtn) {
            rightBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                keys['ArrowRight'] = true;
            });
            rightBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                keys['ArrowRight'] = false;
            });
        }
    }
    window.addEventListener('DOMContentLoaded', setupMobileControls);
}
// game.js - Basic game data and arrays 

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
