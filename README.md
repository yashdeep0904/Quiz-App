# Quiz App 🚀

A modern, interactive quiz application featuring a stunning neomorphic (claymorphic) UI, a dynamic progress bar, and a countdown timer. Test your knowledge and beat your personal best with persistent high-score tracking!

## ✨ Features

* **Neomorphic & Glassmorphic UI:** A visually striking design using soft 3D clay-like buttons, frosted glass badges, and a vibrant pastel gradient background.
* **Dynamic Countdown Timer:** A 15-second timer per question, paired with a visual progress bar that turns red when time is running out.
* **High Score Tracking:** Automatically saves and retrieves your best score across sessions using browser `localStorage`.
* **Instant Visual Feedback:** Highlights correct (green) and incorrect (red) answers immediately upon selection, complete with 3D button-press animations.
* **Subtle Background Animations:** Continuous particle float effects that add depth and interactivity without distracting from the quiz.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure and layout.
* **CSS3:** Custom animations (`@keyframes`), Flexbox, CSS variables, backdrop-filters, and complex `box-shadow` layering for the 3D effect.
* **Vanilla JavaScript (ES6+):** DOM manipulation, state management, `setInterval` timer logic, and `localStorage` integration.

## 🚀 How to Run Locally

This project requires no build tools or package managers. It runs directly in the browser!

1. Clone or download this repository.
2. Ensure all three files are in the same directory:
   * `index.html`
   * `style.css`
   * `script.js`
3. Double-click `index.html` to open it in your default web browser.

## 📁 File Structure

```text
/
├── index.html    # The main HTML structure
├── style.css     # Neomorphic styling, layout, and animations
└── script.js     # Quiz logic, timer handling, and local storage
