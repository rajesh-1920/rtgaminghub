# Quick Start Guide - RTGamingHub

## 🚀 Get Up and Running in 2 Minutes

### Step 1: Open the Project
Simply navigate to the project folder and open `index.html` in your web browser.

```bash
# On macOS/Linux
open index.html

# On Windows
start index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Step 2: Play Games!
Click on any game card to start playing. No setup required!

---

## 📂 Project Organization

```
Your project is organized into these main sections:

📦 Root Directory
├── 🏠 index.html          ← START HERE (Landing Page)
├── 📖 README.md           ← Full Documentation
├── 📋 package.json        ← Project Configuration
├── 🎨 tailwind.config.js  ← Tailwind Settings
│
📁 games/                  ← All Your Games
├── tic-tac-toe/
├── rock-paper-scissors/
└── bat-ball-stump/
│
📁 src/                    ← Source Code
├── css/                   ← Styles
└── js/                    ← JavaScript
│
📁 public/                 ← Public Assets
├── images/                ← Game Images
└── data/
    └── games.json         ← Games List
```

---

## 🎮 Playing the Games

### Current Games:

1. **Tic Tac Toe** 🎯
   - 2 player game on a 3x3 grid
   - First to get 3 in a row wins
   - Location: `/games/tic-tac-toe/home.html`

2. **Rock Paper Scissors** ✋
   - Play against the computer
   - Best of 5 or continuous play
   - Location: `/games/rock-paper-scissors/home.html`

3. **Bat Ball Stump** 🏏
   - Cricket-inspired game
   - Test your reflexes
   - Location: `/games/bat-ball-stump/home.html`

---

## 🛠️ Development Setup

### Option A: CDN Only (Easiest)
- The project uses Tailwind CSS CDN
- No build process needed
- Just open in browser and start developing

### Option B: Local Build (Recommended for Production)

```bash
# 1. Install dependencies
npm install

# 2. Build CSS
npm run build:css

# 3. Watch for changes (optional)
npm run watch:css

# 4. Start development server
npm run dev
```

---

## 📝 Modifying Games

### To Edit an Existing Game:

1. Navigate to the game folder (e.g., `/games/tic-tac-toe/`)
2. Open `home.html` in your editor
3. Modify `assets/css/home.css` for styling
4. Modify `assets/js/home.js` for game logic
5. Save and refresh in browser

### Example: Adding a Button to a Game

```html
<!-- In game's home.html -->
<button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    My Button
</button>
```

---

## ➕ Adding a New Game

### Step-by-Step:

1. **Create Game Folder**
   ```bash
   mkdir games/my-game
   mkdir games/my-game/assets
   mkdir games/my-game/assets/css
   mkdir games/my-game/assets/js
   ```

2. **Create Files**
   - `games/my-game/home.html`
   - `games/my-game/assets/css/home.css`
   - `games/my-game/assets/js/home.js`

3. **Add Basic HTML**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My Game</title>
       <script src="https://cdn.tailwindcss.com"></script>
       <link rel="stylesheet" href="./assets/css/home.css">
   </head>
   <body>
       <!-- Your game here -->
       <script src="./assets/js/home.js"></script>
   </body>
   </html>
   ```

4. **Update games.json**
   Add your game to `/public/data/games.json`

5. **Add to Landing Page (Optional)**
   Add a game card to `index.html`

---

## 🎨 Styling with Tailwind CSS

### Common Utilities:

```html
<!-- Padding & Margin -->
<div class="p-4 m-2">Padded content</div>

<!-- Background & Text Colors -->
<div class="bg-blue-600 text-white">Blue box</div>

<!-- Responsive -->
<div class="text-sm md:text-lg lg:text-xl">Responsive text</div>

<!-- Flexbox -->
<div class="flex justify-center items-center gap-4">
    <item>1</item>
    <item>2</item>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
    <!-- 3 columns on desktop -->
</div>

<!-- Hover Effects -->
<button class="bg-blue-600 hover:bg-blue-700 transition-all">
    Hover me
</button>
```

See [Tailwind Docs](https://tailwindcss.com/docs) for more options.

---

## 🐛 Troubleshooting

### Game not loading?
- Check browser console for errors (F12 or Cmd+Option+I)
- Verify file paths are correct
- Ensure all files exist

### Styling not working?
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure Tailwind CDN is loaded
- Check class names are spelled correctly

### Game not starting?
- Check JavaScript console for errors
- Verify event listeners are attached
- Ensure HTML IDs match JavaScript selectors

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com
- **MDN Docs**: https://developer.mozilla.org
- **JavaScript**: https://javascript.info
- **Project Docs**: See [docs/GAME_DEVELOPMENT.md](../docs/GAME_DEVELOPMENT.md)

---

## 💡 Tips

✅ **Do:**
- Test on mobile devices
- Keep code organized
- Comment complex logic
- Use semantic HTML

❌ **Don't:**
- Use inline styles instead of Tailwind
- Add external dependencies unnecessarily
- Leave console errors
- Forget to test in multiple browsers

---

## 🚀 Next Steps

1. ✅ Open `index.html` in your browser
2. ✅ Play all the games
3. ✅ Read [docs/GAME_DEVELOPMENT.md](../docs/GAME_DEVELOPMENT.md)
4. ✅ Modify a game to test your changes
5. ✅ Create your first new game!

---

## 🎓 Learning Path

- **Beginner**: Play the games, explore the HTML
- **Intermediate**: Modify existing games
- **Advanced**: Create a new game from scratch
- **Expert**: Optimize performance and add features

---

Happy coding! 🎮

For more details, see [README.md](../README.md)
