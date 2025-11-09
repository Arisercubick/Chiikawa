# Chiikawa

A responsive fan website for Chiikawa, featuring story, character, game, and quiz sections.

## Project Status (as of November 2025)

- **Navigation**: All pages use a consistent, accessible navbar. Navigation is responsive and highlights the current page.
- **Styling**: Centralized in `css/styles.css` and `css/quiz.css`. Modern CSS (flexbox, variables, transitions) is used throughout. Button colors and sizes are customized for quiz navigation.
- **Quiz**:
  - Uses camelCase for all IDs and classes (e.g., `quizSection`, `quizFigure`, `quizImage`).
  - Each question now stores its own response array for answers, supporting future multi-select.
  - Quiz navigation buttons: Back (blue), Next (red), Submit (green), with custom sizes.
  - Loading screen cycles through fun messages while computing the score.
  - All logic and UI are refactored for maintainability and consistency.
- **Pages**:
  - `main.html`: Home/landing page
  - `pages/Story.html`: Story section
  - `pages/Game.html`: Game section
  - `pages/Character.html`: Character section
  - `pages/Quiz.html`: Interactive quiz

## How to Use

1. Open `main.html` in your browser.
2. Use the navigation bar to explore Story, Game, Character, and Quiz pages.
3. On the Quiz page, answer all questions and submit to see your score (with animated loading messages).

## Authors

- Made by Aris and Kelly

---

**Recent changes:**

- Refactored all quiz-related IDs/classes to camelCase for consistency.
- Quiz logic now uses per-question response arrays.
- Quiz navigation buttons have distinct colors and sizes.
- Loading screen cycles through multiple messages for a playful experience.
- All styles are centralized in CSS files for easier maintenance.
