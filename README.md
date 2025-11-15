# Chiikawa

By Aris John and Kelly

A responsive fan website for Chiikawa, featuring story, character, game, and quiz sections.

## Project Status (as of November 2025)

- **Navigation**: All pages use a consistent, accessible navbar. Navigation is responsive and highlights the current page.
- **Styling**: All styles are centralized in `css/styles.css`, `css/quiz.css`, and `css/game.css`. Modern CSS (flexbox, variables, transitions) is used throughout. Quiz navigation and game overlays use custom colors and sizes for clarity and accessibility.
- **Quiz**:
  - Uses camelCase for all IDs and classes (e.g., `quizSection`, `quizFigure`, `quizImage`).
  - Each question now stores its own response array for answers, supporting future multi-select.
  - Quiz navigation buttons: Back (blue), Next (red), Submit (green), with custom sizes.
  - Loading screen cycles through fun messages while computing the score.
- **Game**:
  - Modular 2D platformer engine in `scripts/theGame/game.js` (all core logic and rendering).
  - Each world/level is a separate file (e.g., `world1.js`, `world2.js`) that provides level data and calls the engine.
  - Level switching: When you finish a world, a "Continue" button appears to load the next world/level.
  - Main character: `AdorableCutieChiikawa.png`.
  - Enemies:
    - Broccolis (ground): `pngtree-sticker-vector-png-image_6818893.png`.
    - BrocFly (Air): `b9d20377-3663-4c52-bb67-de546498067d-removebg-preview.png`.
  - Ground tiles: `ByIjUv.png`.
  - Background: `bd3410e44a72b4baa918181e82271ee3-400.jpg`, dimmed for clarity.
  - Camera scrolls as the player moves; level includes a staircase and reduced jump gaps.
  - BrocFly enemies instantly kill the player on contact (player dies and game over screen appears; brocFly is immune).
  - Game over and congratulations screens use semantic HTML and are fully styled.
  - "Play Again" reloads the page for a true fresh start.
  - **Mobile controls:** Three large, semi-transparent pink overlay buttons (up, left, right) for mobile play, using Google Material Symbols. All controls use semantic containers and camelCase class names.
- **Pages**:
  - `main.html`: Home/landing page
  - `pages/Story.html`: Story section
  - `pages/Game.html`: Platformer game (loads `world1.js` when press "Start Game" button, with all button and layout styles in CSS in css/game.css)
  - `pages/Character.html`: Character section
  - `pages/Quiz.html`: Interactive quiz

## How to Use

1. Open a local server in the project directory (required for ES modules):
   - PowerShell: `npx serve .` (Download Node.js required)
2. Open `main.html` in your browser via the local server (e.g., http://localhost:5000/main.html).
3. Use the navigation bar to explore Story, Game, Character, and Quiz pages.
4. On the Quiz page, answer all questions and submit to see your score (with animated loading messages).
5. On the Game page, play the platformer! Use arrow keys and space to move/jump, or use the on-screen mobile controls. If you lose, click "Play Again" to restart. When you finish a world, click "Continue" to play the next world/level.

## Authors

- Made by Aris and Kelly

---

**Recent changes:**

- All button and layout styles (including the Game page's Start Game button) are now implemented in CSS files—no inline styles remain.
- Modularized game engine: All platformer logic is in `game.js`, with each world as a separate file for easy extensibility.
- Added `world2.js`, `world3.js`, `world4.js`, and `world5.js` as additional levels; each world is loaded via its own HTML/JS pair.
- Level switching: When you finish a world, a "Continue" button appears to load the next world/level (e.g., from world3 to world4).
- Game page now features a Mario-style platformer with camera scrolling, staircase, and semantic overlays.
- Game assets (character, enemies, ground, background) are loaded and managed for reliability.
- Added brocFly (flying enemy, 'T' in level): instantly kills player on contact, immune to being killed.
- Game reset now restores both broccolis and brocFly enemies to their original positions and states.
- Game over and congratulations screens are semantic, accessible, and fully styled.
- "Play Again" reloads the game.
- Mobile controls: Overlay up/left/right buttons for touch play, using semantic containers and Google Material Symbols.
- Refactored all quiz-related IDs/classes to camelCase for consistency.
- Quiz logic now uses per-question response arrays.
- Quiz navigation buttons have distinct colors and sizes, all styled via CSS.
- Loading screen cycles through multiple messages for a playful experience.
- All styles are centralized in CSS files for easier maintenance.
