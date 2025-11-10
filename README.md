# Chiikawa

A responsive fan website for Chiikawa, featuring story, character, game, and quiz sections.

## Project Status (as of November 2025)

- **Navigation**: All pages use a consistent, accessible navbar. Navigation is responsive and highlights the current page.
- **Styling**: Centralized in `css/styles.css`, `css/quiz.css`, and `css/game.css`. Modern CSS (flexbox, variables, transitions) is used throughout. Button colors and sizes are customized for quiz navigation and game overlays.
- **Quiz**:
  - Uses camelCase for all IDs and classes (e.g., `quizSection`, `quizFigure`, `quizImage`).
  - Each question now stores its own response array for answers, supporting future multi-select.
  - Quiz navigation buttons: Back (blue), Next (red), Submit (green), with custom sizes.
  - Loading screen cycles through fun messages while computing the score.
  - All logic and UI are refactored for maintainability and consistency.
- **Game**:
  - 2D platformer inspired by Super Mario Bros. Level 1-1, built with `<canvas>` and custom JavaScript.
  - Main character: `AdorableCutieChiikawa.png`.
  - Enemies (broccolis): `pngtree-sticker-vector-png-image_6818893.png`.
  - Ground tiles: `ByIjUv.png`.
  - Background: `bd3410e44a72b4baa918181e82271ee3-400.jpg`, dimmed for clarity.
  - Camera scrolls as the player moves; level includes a staircase and reduced jump gaps.
  - Game over and congratulations screens use semantic HTML and are fully styled.
  - "Play Again" reloads the page for a true fresh start.
  - **Mobile controls:** Three large, semi-transparent pink overlay buttons (up, left, right) for mobile play, using Google Material Symbols. All controls use semantic containers and camelCase class names.
- **Pages**:
  - `main.html`: Home/landing page
  - `pages/Story.html`: Story section
  - `pages/Game.html`: Platformer game
  - `pages/Character.html`: Character section
  - `pages/Quiz.html`: Interactive quiz

## How to Use

1. Open `main.html` in your browser.
2. Use the navigation bar to explore Story, Game, Character, and Quiz pages.
3. On the Quiz page, answer all questions and submit to see your score (with animated loading messages).
4. On the Game page, play the platformer! Use arrow keys and space to move/jump, or use the on-screen mobile controls. If you lose, click "Play Again" to restart.

## Authors

- Made by Aris and Kelly

---

**Recent changes:**

- Refactored all quiz-related IDs/classes to camelCase for consistency.
- Quiz logic now uses per-question response arrays.
- Quiz navigation buttons have distinct colors and sizes.
- Loading screen cycles through multiple messages for a playful experience.
- All styles are centralized in CSS files for easier maintenance.
- Game page now features a Mario-style platformer with camera scrolling, staircase, and semantic overlays.
- Game assets (character, enemies, ground, background) are loaded and managed for reliability.
- Game over and congratulations screens are semantic and accessible.
- "Play Again" fully reloads the game for a fresh start.
- **Mobile controls**: Overlay up/left/right buttons for touch play, using semantic containers and Google Material Symbols.
