# Tic Tac Toe Game 🎮

A simple browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript.

## Features ✅
- Login with a username
- Choose between `Play with Friend` or `Play with Computer` modes
- Responsive UI and simple game logic with win/draw detection
- Reset and return to menu options

## Files 🔧
- `index.html` — Main HTML file
- `styles.css` — Extracted styles
- `script.js` — Game logic and interactions

## Run locally ▶️

### Quick open
- Open `index.html` directly in your browser (double-click the file).

### Using VS Code Live Server
- Install the **Live Server** extension and right-click `index.html` → "Open with Live Server".

### Run from terminal (recommended)
1. Open a terminal (PowerShell, Command Prompt, Git Bash, or macOS/Linux shell).
2. Change to the project directory:
   ```bash
   cd D:\Programming\Projects\Tic-Tac-Toc-Game
   ```
3. Start a simple HTTP server:
   - With Python 3 (recommended):
     ```bash
     python -m http.server 8000
     ```
   - With Node (if Node.js is installed):
     ```bash
     npx http-server -p 8000
     # or
     npx serve
     ```
4. Open http://localhost:8000 in your browser.
5. Stop the server with Ctrl+C in the terminal.

>If the port is already in use, change `8000` to an available port (for example `8001`).

## Contributing 🤝
Feel free to open issues or submit PRs. Suggestions:
- Replace inline `onclick` handlers with event listeners
- Improve AI from random moves to Minimax
- Add tests and accessibility improvements

---

If you'd like, I can add badges, a CONTRIBUTING.md, or convert the project to use a build step (minification, linting).
