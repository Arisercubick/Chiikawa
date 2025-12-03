// --- Game Engine Logic ---
// Ponce might not like this... oh well, fck it
// Date 2025-11-19: I hope Mr Ponce forgives me for this
// I dont even know if this allowed in the rubric (He didnt even gave it to us yet smh)


// Coding this makes me miss Hannah so much
// Can she call me at 2 am and comfort me? yeah, Im obsessed and I know

'use strict';

/*
export const hitbox = {
    x:
}
*/

//Importing functions from the entities files

// https://www.w3schools.com/js/js_modules.asp
import { buildPlatforms, buildFloats, updateFloats, drawFloats } from './entities/platform.js';
import { buildBroccolis, updateBroccolis, drawBroccolis } from './entities/broccolis.js';
import { buildBrocFlys, updateBrocFlys, drawBrocFlys } from './entities/brocFly.js';
import { updateTimer } from './handlers/timer.js';  
import { buildFlame, updateFlame, drawFlames } from './entities/flameball.js';  
import { collisionX, collisionY } from './handlers/blockCollide.js';
import { resetGame } from './handlers/PositionHandler/resetGame.js';
import { savePositions } from './handlers/PositionHandler/SavePositions.js';
import { collisions } from './handlers/Collisions.js';

// Default player properties
// Speed and jump are tuned for delta time (values are per second)
// https://www.w3schools.com/js/js_arrays.asp
export let playerDefaults = {
    w: 30,
    h: 30,
    speed: 250,      // pixels per second
    jump: -550,      // initial jump velocity (pixels per second)
    gravity: 1300,   // gravity acceleration (pixels per second squared)
    startX: 2 * 40,
    startY: 8 * 40
};

// Blame me for making a list of asset paths
// This makes it easier to manage assets in one place 🥺
export const assetPaths = {
    bg: '../../images/bd3410e44a72b4baa918181e82271ee3-400.jpg',
    player: '../../images/AdorableCutieChiikawa.png',
    ground: '../../images/gameAssets/ByIjUv.png',
    broccoli: '../../images/gameAssets/pngtree-sticker-vector-png-image_6818893.png',
    brocFly: '../../images/gameAssets/b9d20377-3663-4c52-bb67-de546498067d-removebg-preview.png',
    flameball: '../../images/gameAssets/purpleball.gif'
};

export function runGame({ level, playerStart, onWin }) {
    // So this runs the game with data passed from each world file
    let stopTimer = false;
    let timer = 0;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const platforms = buildPlatforms(level, tileSize);
    let broccolis = buildBroccolis(level, tileSize);
    let brocFlys = buildBrocFlys(level, tileSize);
    let flames = buildFlame(level, tileSize);
    let float = buildFloats(level, tileSize);
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
    const [broccoliStartStates, brocFlyStartStates, flamesStartStates, floatStartStates] = savePositions(broccolis, brocFlys, flames, float);

    // Load images as assets
    // As I like other assets being loaded

    //Backgroundimg
    const bgImg = new Image();
    bgImg.src = assetPaths.bg;
    //Player img
    const playerImg = new Image();
    playerImg.src = assetPaths.player;
    //Ground gimage and float imgaes
    const groundImg = new Image();
    groundImg.src = assetPaths.ground;
    const floatsImg = new Image();
    floatsImg.src = assetPaths.ground;
    //Enemy ground brocolli img, basically goombas
    const broccoliImg = new Image();
    broccoliImg.src = assetPaths.broccoli;
    //Flying broccolis!
    const brocFlyImg = new Image();
    brocFlyImg.src = assetPaths.brocFly;
    //Purple fireball img
    const flameballImg = new Image();
    flameballImg.src = assetPaths.flameball;
    
    let keys = {};

    // Secret combo detection: w + a + a + w + q
    const secretCombo = ['KeyW', 'KeyA', 'KeyA', 'KeyW', 'KeyQ'];

    //TODO: Fixed the second secret combo 2 because it wont update properly
    const secretCombo2 = ['KeyA', 'KeyD', 'KeyS', 'KeyE', 'KeyQ'];
    let comboProgress2 = 0;
    let comboProgress = 0;
    let gameWon = false;
    let gameOver = false;
    let cameraX = 0;
    let cameraY = 0;
    const screenWidth = canvas.width;
    const screenHeight = canvas.height;
    const levelWidth = level[0].length * tileSize;
    const levelHeight = level.length * tileSize;

    

    // Reads keyboard input, and basically equates that to 'e'
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
                    stopTimer = true;
                    gameWon = true;
                    document.getElementById('congratsScreen').classList.remove('hidden');
                    if (onWin) {
                        onWin();
                    }
                    setTimeout(() => {
                        const restartBtn = document.getElementById('restartBTN');
                        if (restartBtn) {
                            restartBtn.onclick = () => { resGame(); };
                        }
                    }, 0);
                }
                comboProgress = 0;
            }
        } else if (e.code !== secretCombo[0]) {
            // Reset if wrong key (unless it's the first key in the combo)
            comboProgress = 0;
        }

        if (e.code === secretCombo2[comboProgress2]) {
            comboProgress2++;
            console.log("ComboProgress2: " + comboProgress2);
            if (comboProgress2 === secretCombo2.length) {
                console.log(playerDefaults.jump);
                console.log(playerDefaults.speed);
                // Finish the level as if the player reached the end
                playerDefaults.speed += 250; // Increase speed
                playerDefaults.jump -= 250;  // Increase jump height
                console.log(playerDefaults.jump);
                console.log(playerDefaults.speed);
                comboProgress2 = 0;
                console.log("ComboProgress2 Reset to 0");
                runGame();
            } 
        } else if (e.code !== secretCombo2[comboProgress2]) {
            // Reset if wrong key (unless it's the first key in the combo)
            comboProgress2 = 0;
            console.log("Wrong Code, ComboProgress2 Reset to 0");
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

    // Collision detection between two rectangles for player
    function rectsCollide(a, b) {
        return collisions(a, b);
    }

    // Vibration state array
    let vibration = { 
        active: false, 
        dir: 0, 
        axis: 'x', 
        startTime: 0, 
        duration: 100 
    };

    // Delta time integrated: all movement is now frame-rate independent
    function update(delta) {
        // Clamp delta to prevent huge jumps on lag spikes
        if (delta > 0.1) delta = 0.1;
        if (delta <= 0 || isNaN(delta)) return;

        if (gameWon || gameOver) {
            return;
        }
        player.vx = 0;
        let wantLeft = isLeftPressed();
        let wantRight = isRightPressed();

        if (wantLeft) {
            player.vx = -player.speed; // speed is pixels per second
        }

        if (wantRight) {
            player.vx = player.speed; // speed is pixels per second
        }

        if (keys['Space'] && player.onGround) {
            player.vy = player.jump; // jump is pixels per second
            player.onGround = false;
        }
        // Apply gravity (pixels per second squared * delta = pixels per second)
        player.vy += playerDefaults.gravity * delta;

        // Try to move horizontally, check for block

        //OTO
        let blockedX = collisionX(player, platforms, float, delta, rectsCollide);

        // If blocked horizontally, start vibration in that direction (only if not already vibrating)
        if (blockedX && (wantLeft || wantRight) && !vibration.active) {
            vibration.active = true;
            vibration.dir = wantLeft ? -1 : 1;
            vibration.axis = 'x';
            vibration.startTime = performance.now();
        }

        // Try to move vertically, check for block
        let [blockDirY, blockedY] = collisionY(player, platforms, float, delta, rectsCollide);

        // If blocked vertically (not on ground), vibrate vertically (only if not already vibrating)
        if (blockedY && !player.onGround && !vibration.active) {
            vibration.active = true;
            vibration.dir = blockDirY;
            vibration.axis = 'y';
            vibration.startTime = performance.now();
        }

        // Stop vibration based on vibration duration
        if (vibration.active) {
            let elapsed = (performance.now() - vibration.startTime);
            if (elapsed > vibration.duration) {
                vibration.active = false;
            }
        }

        // Update enemies
        updateBrocFlys(delta, brocFlys, level, tileSize, levelWidth, player, rectsCollide, triggerGameOver);
        updateFlame(delta, flames, level, tileSize, levelWidth, player, rectsCollide, triggerGameOver);
        updateBroccolis(delta, broccolis, platforms, player, rectsCollide, triggerGameOver);
        updateFloats(delta, float, level, tileSize, levelWidth);

        
        if (player.x > (level[0].length - 2) * tileSize) {
            gameWon = true;
            stopTimer = true;
            document.getElementById('congratsScreen').classList.remove('hidden');
            if (onWin) onWin();
            // Add restart button logic for congrats screen
            setTimeout(() => {
              const restartBtn = document.getElementById('restartBTN');
              if (restartBtn) {
                restartBtn.onclick = () => { resGame(); };
              }
            }, 0);
        }
        if (player.y > canvas.height + 1000) {
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


    // https://www.w3schools.com/html/html5_canvas.asp
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
        
        const broccoliScale = 1;
        drawBroccolis(ctx, broccolis, cameraX, cameraY, broccoliImg, broccoliScale);
        const brocFlyScale = 1;
        drawBrocFlys(ctx, brocFlys, cameraX, cameraY, brocFlyImg, brocFlyScale);
        const flameScale = 1;
        drawFlames(ctx, flames, cameraX, cameraY, flameballImg, flameScale);
        const floatsScale = 1;
        drawFloats(ctx, float, cameraX, cameraY, floatsImg, floatsScale)


        // Directional vibration effect (horizontal or vertical, 500ms)
        // idk, based on my math, it supposed to be 500ms
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
            // So kelly, if you dont get this
            // ME TOO!
        }

        // Saves new canvas state with vibration applied
        ctx.save();
        if (player.vx < 0) {
            ctx.translate(player.x - cameraX + vibOffsetX + player.w, player.y - cameraY + vibOffsetY);
            ctx.scale(-1, 1);
            ctx.drawImage(playerImg, 0, 0, player.w, player.h);
        } else {
            ctx.drawImage(playerImg, player.x - cameraX + vibOffsetX, player.y - cameraY + vibOffsetY, player.w, player.h);
        }
        ctx.restore();
    }

    let animationId;
    let lastTime = performance.now();
    // THIS MAIN LOOP FUNCTION IS KILLING ME, NOW IT BROKE THE SYSTEM
    // TODO: FIX THIS ISSUE, IT CRASHES THE GAME AND EATS UP RAM LIKE A HOG
    function loop(now) {
        const delta = (now - lastTime) / 1000; // seconds since last frame
        lastTime = now;
        update(delta);
        draw();
        timer = updateTimer(delta, timer, stopTimer);
        animationId = requestAnimationFrame(loop);

        // console.log("()() DEBUG LOG: Second requestAnimationFrame call?");
        // Comment this out to prevent infinite calls
        // TODO: Fix later
        // requestAnimationFrame(loop);

        // Artificial intelligence my a**
        // The only thing artificial is its logic because I prompted it 20 times
        // IT JUST MAKE IT WORSE
        // It acts soooo confident, yet it is the reason why the server CRASHES
        // Needed to revert back forcefully to an old commit, just registering it here
        // 2 hours of debugging wasted because of this piece of sh**

        //2025-11-19: Fixed the issue by removing the second requestAnimationFrame call, added the Delta AND IM FREEEEEEEE
    }
    
    // So, when the player dies, it trigers this function
    function triggerGameOver() {
        stopTimer = true;
        gameOver = true;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }


    function resGame() {
        [timer, stopTimer, gameWon, gameOver, cameraX, broccolis, brocFlys, flames, float] = resetGame(broccolis, brocFlys, flames, float, player, playerDefaults, timer, stopTimer, gameWon, gameOver, cameraX, broccoliStartStates, brocFlyStartStates, flamesStartStates, floatStartStates);
    }


    let loaded = 0;
    [playerImg, groundImg, bgImg, broccoliImg, brocFlyImg].forEach(img => {
        img.onload = () => {
            loaded++;
            if (loaded === 5) {
                // calls the loop with a timestamp, but for some reason
                // it doesnt works and breaks the system with the player flying
                // TODO: fix this issue later
                requestAnimationFrame(loop);
            }
        };
    });

    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('playAgainBTN');
        if (btn) {
            btn.onclick = () => { 
                resGame();
            };
        } else {
            document.addEventListener('click', () => { 
                resGame();
            });
        }
        // Allow Spacebar to reset game when game over or won
        window.addEventListener('keydown', function(e) {
            if ((gameOver || gameWon) && e.code === 'Space') {
                resGame();
            }
        });
    });

    // Expose cleanup for this game instance, yet the variable is never used
    let gameInstance = {
        cleanup: () => {
            window.removeEventListener('keydown', keydownHandler);
            window.removeEventListener('keyup', keyupHandler);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        }
    };

    // TODO: fix mobile controls
    // Probably need to redesign the UI for mobile
    // And also, fix the buttons (Not working)

    //FIxed mobile controls
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

// Example: tile size, player defaults, and asset paths
export const tileSize = 40;

// Methods for the world files to switch levels
// and handle win conditions

// Im actually happy I managed to make this function work, I used to have two functions running the same logic
    function switchWorld(worldNum) {
        currentLevel = selectWorld(worldNum);
        runGame({ playerStart: {}, onWin: onWinWorld(worldNum) });
    }

// Example onWin handlers for each world
// When finish, put =  alert('You finished all available levels! More coming soon!');
function onWinWorld(worldNum) {
    const continueBtn = document.getElementById('continueBTN');
    if (continueBtn) {
        continueBtn.onclick = () => {
            switchWorld(worldNum + 1);
            document.getElementById('congratsScreen').classList.add('hidden');
        };
    }
}