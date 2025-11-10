// Platformer game using canvas
// Assets:
// - Player: /images/AdorableCutieChiikawa.png
// - Enemy: /images/pngtree-sticker-vector-png-image_6818893.png
// - Background: /images/bd3410e44a72b4baa918181e82271ee3-400.jpg

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Images
const bgImg = new Image();
bgImg.src = '../images/bd3410e44a72b4baa918181e82271ee3-400.jpg';
const playerImg = new Image();
playerImg.src = '../images/AdorableCutieChiikawa.png';
const broccoliImg = new Image();
broccoliImg.src = '../images/pngtree-sticker-vector-png-image_6818893.png';
const groundImg = new Image();
groundImg.src = '../images/gameAssets/ByIjUv.png';






// Level data (simple Mario 1-1 style)
const tileSize = 40;
// Add a staircase in the middle of the level
const level = [
  // 20 tiles wide, 12 tiles high
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

// Platform positions
const platforms = [];
for (let y = 0; y < level.length; y++) {
  for (let x = 0; x < level[y].length; x++) {
    if (level[y][x] === '=') {
      platforms.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize });
    }
  }
}

// Broccoli positions
const broccolis = [];
for (let y = 0; y < level.length; y++) {
  for (let x = 0; x < level[y].length; x++) {
    if (level[y][x] === 'G') {
      broccolis.push({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize, dir: 1, alive: true });
    }
  }
}

// Player
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

let keys = {};
let gameWon = false;
let gameOver = false;

// Camera offset
let cameraX = 0;
const screenWidth = canvas.width;
const levelWidth = level[0].length * tileSize;

// Controls
window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup', e => { keys[e.code] = false; });

function rectsCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function update() {
  if (gameWon || gameOver) return;
  // Player movement
  player.vx = 0;
  if (keys['ArrowLeft']) player.vx = -player.speed;
  if (keys['ArrowRight']) player.vx = player.speed;
  if (keys['Space'] && player.onGround) {
    player.vy = player.jump;
    player.onGround = false;
  }
  // Gravity
  player.vy += 0.5;
  // Horizontal
  player.x += player.vx;
  for (const plat of platforms) {
    if (rectsCollide(player, plat)) {
      if (player.vx > 0) player.x = plat.x - player.w;
      if (player.vx < 0) player.x = plat.x + plat.w;
    }
  }
  // Vertical
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
  // Broccoli
  for (const g of broccolis) {
    if (!g.alive) continue;
    g.x += g.dir * 1.2;
    // Turn at platform edges
    let onPlatform = false;
    for (const plat of platforms) {
      if (g.x + g.w/2 > plat.x && g.x + g.w/2 < plat.x + plat.w && g.y + g.h === plat.y) {
        onPlatform = true;
      }
      if (rectsCollide(g, plat)) {
        if (g.dir > 0) g.x = plat.x - g.w;
        if (g.dir < 0) g.x = plat.x + plat.w;
        g.dir *= -1;
      }
    }
    if (!onPlatform) g.dir *= -1;
    // Player stomps goomba
    if (rectsCollide(player, g) && player.vy > 0 && player.y + player.h - g.y < 20) {
      g.alive = false;
      player.vy = player.jump / 1.5;
    } else if (rectsCollide(player, g) && g.alive) {
      // Player hit by goomba
      triggerGameOver();
      return;
    }
  }
  // Win condition: reach far right
  if (player.x > (level[0].length - 2) * tileSize) {
    gameWon = true;
    document.getElementById('congratsScreen').classList.remove('hidden');
  }
  // Check for falling off
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  // Dim the background by drawing a translucent black rectangle over it
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  // Platforms (draw ground image for each tile)
  for (const plat of platforms) {
    ctx.drawImage(groundImg, plat.x - cameraX, plat.y, plat.w, plat.h);
  }
  // Broccolis
  for (const g of broccolis) {
    if (!g.alive) continue;
    ctx.drawImage(broccoliImg, g.x - cameraX, g.y, g.w, g.h);
  }
  // Player
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

// Wait for images to load
let loaded = 0;
[playerImg, groundImg, bgImg, broccoliImg].forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === 4) loop();
  };
});

// (You can further expand the level array above to add more features, gaps, and platforms to match SMB 1-1.)
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('playAgainBTN');
  if (btn) btn.onclick = () => { window.location.reload(); };
});
