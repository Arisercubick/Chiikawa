// --- Game Engine Logic ---
'use strict';
export function runGame({ level, playerStart, onWin }) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const platforms = buildPlatforms(level, tileSize);
    const broccolis = buildBroccolis(level, tileSize);
    const brocFlys = buildBrocFlys(level, tileSize);
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
    // Secret combo detection: w + a + a + w + q
    const secretCombo = ['KeyW', 'KeyA', 'KeyA', 'KeyW', 'KeyQ'];
    let comboProgress = 0;
    let gameWon = false;
    let gameOver = false;
    let cameraX = 0;
    let cameraY = 0;
    const screenWidth = canvas.width;
    const screenHeight = canvas.height;
    const levelWidth = level[0].length * tileSize;
    const levelHeight = level.length * tileSize;

    // Load images
    const bgImg = new Image();
    bgImg.src = assetPaths.bg;
    const playerImg = new Image();
    playerImg.src = assetPaths.player;
    const groundImg = new Image();
    groundImg.src = assetPaths.ground;
    const broccoliImg = new Image();
    broccoliImg.src = assetPaths.broccoli;
    const brocFlyImg = new Image();
    brocFlyImg.src = assetPaths.brocFly;

    const keydownHandler = e => {
        keys[e.code] = true;
        // Stop vibration on any key press
        if (typeof vibration !== 'undefined') {
            vibration.active = false;
        }
        // Prevent page scroll when pressing Space (jump)
        if (e.code === 'Space' && document.activeElement === document.body) {
            e.preventDefault();
        }
        // Secret combo logic
        if (e.code === secretCombo[comboProgress]) {
            comboProgress++;
            if (comboProgress === secretCombo.length) {
                // Finish the level as if the player reached the end
                if (!gameWon && !gameOver) {
                    gameWon = true;
                    document.getElementById('congratsScreen').classList.remove('hidden');
                    if (onWin) onWin();
                    setTimeout(() => {
                        const restartBtn = document.getElementById('restartBTN');
                        if (restartBtn) {
                            restartBtn.onclick = () => { resetGame(); };
                        }
                    }, 0);
                }
                comboProgress = 0;
            }
        } else if (e.code !== secretCombo[0]) {
            // Reset if wrong key (unless it's the first key in the combo)
            comboProgress = 0;
        }
    };
    const keyupHandler = e => { keys[e.code] = false; };
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);

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

    // Vibration state
    let vibration = { active: false, dir: 0, axis: 'x', startTime: 0, duration: 100 };

    // BrocFly movement logic
    function updateBrocFlys() {
        for (const f of brocFlys) {
            if (!f.alive) continue;
            // Move horizontally in current direction
            f.x += f.dir * 2.2; // Faster than ground broccoli
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
            // Eliminate on player touch
            if (rectsCollide(player, f)) {
                f.alive = false;
            }
        }
    }

    function update() {
        if (gameWon || gameOver) return;
        player.vx = 0;
        let wantLeft = isLeftPressed();
        let wantRight = isRightPressed();
        if (wantLeft) player.vx = -player.speed;
        if (wantRight) player.vx = player.speed;
        if (keys['Space'] && player.onGround) {
            player.vy = player.jump;
            player.onGround = false;
        }
        player.vy += 0.5;

        // Try to move horizontally, check for block
        let prevX = player.x;
        player.x += player.vx;
        let blockedX = false;
        for (const plat of platforms) {
            if (rectsCollide(player, plat)) {
                if (player.vx > 0) player.x = plat.x - player.w;
                if (player.vx < 0) player.x = plat.x + plat.w;
                blockedX = true;
            }
        }

        // If blocked horizontally, start vibration in that direction (only if not already vibrating)
        if (blockedX && (wantLeft || wantRight) && !vibration.active) {
            vibration.active = true;
            vibration.dir = wantLeft ? -1 : 1;
            vibration.axis = 'x';
            vibration.startTime = performance.now();
        }

        // Try to move vertically, check for block
        let prevY = player.y;
        player.y += player.vy;
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
                } else if (player.vy < 0) {
                    player.y = plat.y + plat.h;
                    player.vy = 0;
                    blockedY = true;
                    blockDirY = -1; // Blocked above
                }
            }
        }

        // If blocked vertically (not on ground), vibrate vertically (only if not already vibrating)
        if (blockedY && !player.onGround && !vibration.active) {
            vibration.active = true;
            vibration.dir = blockDirY;
            vibration.axis = 'y';
            vibration.startTime = performance.now();
        }

        // Stop vibration after 500ms or on key press
        if (vibration.active) {
            let elapsed = (performance.now() - vibration.startTime);
            if (elapsed > vibration.duration) {
                vibration.active = false;
            }
        }

        // Update flying enemies
        updateBrocFlys();

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

        // Vertical camera scroll (if level is tall enough)
        const centerY = player.y + player.h / 2;
        if (levelHeight > screenHeight) {
            if (centerY - cameraY > screenHeight * 0.6 && cameraY < levelHeight - screenHeight) {
                cameraY = Math.min(centerY - screenHeight * 0.6, levelHeight - screenHeight);
            } else if (centerY - cameraY < screenHeight * 0.4 && cameraY > 0) {
                cameraY = Math.max(centerY - screenHeight * 0.4, 0);
            }
        } else {
            cameraY = 0;
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
            ctx.drawImage(groundImg, plat.x - cameraX, plat.y - cameraY, plat.w, plat.h);
        }
        for (const g of broccolis) {
            if (!g.alive) continue;
            ctx.drawImage(broccoliImg, g.x - cameraX, g.y - cameraY, g.w, g.h);
        }
        // Directional vibration effect (horizontal or vertical, 500ms)
        let vibOffsetX = 0, vibOffsetY = 0;
        if (vibration.active) {
            let elapsed = (performance.now() - vibration.startTime);
            let phase = (elapsed / vibration.duration) * 2 * Math.PI;
            let swing = Math.sin(phase) * 4 * vibration.dir;
            if (vibration.axis === 'x') {
                vibOffsetX = swing;
            } else if (vibration.axis === 'y') {
                vibOffsetY = swing;
            }
        }
        ctx.drawImage(playerImg, player.x - cameraX + vibOffsetX, player.y - cameraY + vibOffsetY, player.w, player.h);
    }

    let animationId;
    function loop() {
        update();
        draw();
        animationId = requestAnimationFrame(loop);
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
    [playerImg, groundImg, bgImg, broccoliImg, brocFlyImg].forEach(img => {
        img.onload = () => {
            loaded++;
            if (loaded === 5) {
                loop();
            }
        };
    });

    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('playAgainBTN');
        if (btn) {
            btn.onclick = () => { resetGame(); };
        }
        // World selection buttons (if any)
        const world1Btn = document.getElementById('world1BTN');
        const world2Btn = document.getElementById('world2BTN');
        const world3Btn = document.getElementById('world3BTN');
        const world4Btn = document.getElementById('world4BTN');
        if (world1Btn) world1Btn.onclick = () => { switchWorld(1); };
        if (world2Btn) world2Btn.onclick = () => { switchWorld(2); };
        if (world3Btn) world3Btn.onclick = () => { switchWorld(3); };
        if (world4Btn) world4Btn.onclick = () => { switchWorld(4); };
    });

    function switchWorld(worldNum) {
        currentLevel = selectWorld(worldNum);
        runGame({ playerStart: {}, onWin: getOnWinHandler(worldNum) });
    }

    function getOnWinHandler(worldNum) {
        if (worldNum === 1) return onWinWorld1;
        if (worldNum === 2) return onWinWorld2;
        if (worldNum === 3) return onWinWorld3;
        if (worldNum === 4) return onWinWorld4;
        return onWinWorld1;
    }

    // Expose cleanup for this game instance
    gameInstance = {
        cleanup: () => {
            window.removeEventListener('keydown', keydownHandler);
            window.removeEventListener('keyup', keyupHandler);
            if (animationId) cancelAnimationFrame(animationId);
        }
    };

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
    bg: '../../images/bd3410e44a72b4baa918181e82271ee3-400.jpg',
    player: '../../images/AdorableCutieChiikawa.png',
    ground: '../../images/gameAssets/ByIjUv.png',
    broccoli: '../../images/pngtree-sticker-vector-png-image_6818893.png',
    brocFly: '../../images/gameAssets/b9d20377-3663-4c52-bb67-de546498067d-removebg-preview.png'
};
// Build flying broccoli enemies ("T")
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

// Example onWin handlers for each world
// When finish, put =  alert('You finished all available levels! More coming soon!');
function onWinWorld1() {
    const continueBtn = document.getElementById('continueBTN');
    if (continueBtn) {
        continueBtn.onclick = () => {
            switchWorld(2);
            document.getElementById('congratsScreen').classList.add('hidden');
        };
    }
}
function onWinWorld2() {
    const continueBtn = document.getElementById('continueBTN');
    if (continueBtn) {
        continueBtn.onclick = () => {
            switchWorld(3);
            document.getElementById('congratsScreen').classList.add('hidden');
        };
    }
}
function onWinWorld3() {
    const continueBtn = document.getElementById('continueBTN');
    if (continueBtn) {
        continueBtn.onclick = () => {
            switchWorld(4);
            document.getElementById('congratsScreen').classList.add('hidden');
           
        };
    }
}
function onWinWorld4() {
    const continueBtn = document.getElementById('continueBTN');
    if (continueBtn) {
        continueBtn.onclick = () => {
            alert('You finished all available levels! More coming soon!');
            document.getElementById('congratsScreen').classList.add('hidden');
        };
    }
}

// This file is now a pure engine. No auto-start or world selection logic.
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
