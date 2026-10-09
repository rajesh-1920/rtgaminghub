# Quick Start Guide - RTGamingHub

## Get Up and Running in 2 Minutes

### Step 1: Open the Project

```bash
# Clone or download
git clone https://github.com/yourusername/rtgaminghub.git
cd rtgaminghub

# Option A: Direct open (no server needed for most features)
# Simply open index.html in your browser

# Option B: Local server (recommended for PWA/Service Worker)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option C: Node server (if you have Node)
npx serve .
```

### Step 2: Play Games!

Open `http://localhost:8000` (or `index.html` directly) → Click any game card → Play!

---

## Project Organization (v1.2.0)

```
rtgaminghub/
├── 🏠 index.html              ← START HERE (Landing Page)
├── 🏠 404.html                ← Not found page
├── 🏠 offline.html            ← PWA offline fallback
├── 📖 README.md               ← Full Documentation
├── 📋 package.json            ← Project Configuration
├── 🎨 tailwind.config.js      ← Tailwind Settings
├── 📁 games/                  ← All 5 Games
│   ├── tic-tac-toe/
│   ├── rock-paper-scissors/
│   ├── bat-ball-stump/
│   ├── memory-match/
│   └── number-guess/
├── 📁 src/                    ← Source Code
│   ├── css/
│   │   ├── input.css          ← Tailwind source
│   │   └── main.css           ← Built CSS (minified, committed)
│   └── js/
│       ├── main.js            ← Hub logic (grid, search, theme)
│       ├── sound.js           ← WebAudio utility
│       └── utils/
│           └── helpers.js     ← Shared utilities
├── 📁 public/                 ← Public Assets
│   ├── images/                ← Game thumbnails (WebP)
│   ├── favicon.svg            ← App icon
│   ├── manifest.json          ← PWA manifest
│   ├── sitemap.xml            ← SEO sitemap
│   ├── sw.js                  ← Service Worker
│   └── data/
│       └── games.json         ← Games metadata (5 games)
├── 📁 scripts/                ← Build scripts
│   ├── validate.mjs           ← Repo validator
│   └── sitemap.mjs            ← Sitemap generator
└── 📁 docs/                   ← Documentation
```

---

## Playing the Games

### Current Games (5 total):

1. **Tic Tac Toe** 🎯 — Strategy | 2 Players | Easy
   - Classic 3x3 grid, persistent scores, a11y labels
   - `/games/tic-tac-toe/home.html`

2. **Rock Paper Scissors** ✋ — Chance | 1 Player | Easy
   - Play vs computer, keyboard shortcuts (R/P/S), persistence
   - `/games/rock-paper-scissors/home.html`

3. **Bat Ball Stump** 🏏 — Action | 1 Player | Medium
   - Cricket-inspired, streak tracking, round history
   - `/games/bat-ball-stump/home.html`

4. **Memory Match** 🧠 — Puzzle | 1 Player | Easy
   - 6 pairs, move counter, best score persistence
   - `/games/memory-match/home.html`

5. **Number Guess** 🔢 — Puzzle | 1 Player | Easy
   - Guess 1-100 in 7 tries, history, win counter
   - `/games/number-guess/home.html`

### Universal Features (all games):

- ✅ Persistent scores (localStorage)
- ✅ Sound effects (WebAudio, toggleable)
- ✅ Dark/light theme (inherits from hub)
- ✅ Keyboard accessible
- ✅ Responsive (mobile 360px+)
- ✅ Offline playable (PWA)

---

## Development Setup

### Prerequisites

- Node.js ≥20 (`.nvmrc` = 20)
- Modern browser (Chrome, Firefox, Safari, Edge)

### Quick Commands

```bash
# Install dependencies
npm ci

# Start dev server (port 8000, live reload)
npm run dev

# Build & minify CSS (src/css/input.css → src/css/main.css)
npm run build:css

# Watch CSS on changes
npm run watch:css

# Full quality check (lint + format + validate)
npm run check

# Run individual checks
npm run lint:js        # ESLint (src, games, scripts, sw.js, tailwind.config.js)
npm run lint:css       # Stylelint (src/css/input.css)
npm run format         # Prettier auto-format
npm run format:check   # Prettier check only
npm run validate       # Repo validator (files, games.json, images, etc.)
npm run sitemap        # Generate sitemap.xml from games.json

# Clean generated files
npm run clean
```

### What "No Build Required" Means

- `src/css/main.css` is **committed** (minified) → works on any static host without build
- `npm run build:css` in CI verifies the build works
- For local dev: `npm run watch:css` auto-rebuilds on `input.css` changes

---

## Modifying Games

### To Edit an Existing Game:

```bash
# 1. Navigate to game folder
cd games/tic-tac-toe

# 2. Edit files
# home.html       - markup, meta tags (OG, canonical)
# assets/css/home.css  - styles (CSS variables)
# assets/js/home.js    - logic (state, localStorage, RTUtils, RTSound)
```

### Common Patterns:

```html
<!-- Link to helpers (global fallback) -->
<script src="../../src/js/utils/helpers.js" type="module"></script>

<!-- Link to sound (global) -->
<script src="../../src/js/sound.js"></script>

<!-- In your game JS: -->
const random = window.RTUtils?.getRandomNumber(1, 3); window.RTSound?.click();
window.RTUtils?.setLocalStorage('key', value);
```

### CSS Variables Pattern (per game):

```css
:root {
  --primary: #3b82f6;
  --bg-teal: #48a6a7; /* your palette */
  --win: #10b981;
  --lose: #ef4444;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## Adding a New Game

### Step-by-Step:

```bash
# 1. Create folder structure
mkdir -p games/my-game/assets/css games/my-game/assets/js

# 2. Create home.html (copy from an existing game)
cp games/memory-match/home.html games/my-game/home.html
# → Update title, description, OG tags, canonical URL

# 3. Create assets/css/home.css
cp games/memory-match/assets/css/home.css games/my-game/assets/css/home.css
# → Update CSS variables for your theme

# 4. Create assets/js/home.js
cp games/memory-match/assets/js/home.js games/my-game/assets/js/home.js
# → Implement your game logic

# 5. Add WebP image to public/images/my-game.webp

# 6. Add entry to public/data/games.json
# (copy an existing entry, update id, name, path, icon, category, players, difficulty, image)

# 7. Create games/my-game/README.md (copy template)

# 8. Regenerate sitemap
npm run sitemap

# 9. Validate
npm run validate
```

### games.json Entry Template:

```json
{
  "id": "my-game",
  "name": "My Game",
  "description": "Short description for card",
  "path": "./games/my-game/home.html",
  "icon": "🎮",
  "category": "puzzle", // strategy | chance | action | puzzle
  "players": "1", // "1" or "2"
  "difficulty": "Easy", // Easy | Medium | Hard
  "image": "./public/images/my-game.webp"
}
```

---

## Styling with Tailwind CSS

### Build Process

- Source: `src/css/input.css` → Built: `src/css/main.css` (minified, committed)
- Custom components: `.btn-primary`, `.game-card`, `.section-title`, `.container-lg`
- Animations: `.animate-fade-in-up`
- Accessibility: `:focus-visible`, `@media (prefers-reduced-motion: reduce)`

### Common Utilities (works in game CSS too via built main.css):

```html
<!-- Spacing -->
<div class="p-4 m-2 gap-4">Padded content</div>

<!-- Colors (Tailwind palette + custom) -->
<div class="bg-primary text-white">Primary box</div>
<div class="bg-secondary text-white">Secondary box</div>

<!-- Responsive -->
<div class="text-sm md:text-lg lg:text-xl">Responsive text</div>

<!-- Flexbox / Grid -->
<div class="flex justify-center items-center gap-4">Flex</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">Grid</div>

<!-- Transitions -->
<button class="bg-primary hover:bg-primary-dark transition-all">Hover me</button>

<!-- Dark mode (on body.dark) -->
<div class="dark:bg-gray-900 dark:text-white">Auto dark</div>
```

---

## Troubleshooting

| Issue                | Fix                                                                            |
| -------------------- | ------------------------------------------------------------------------------ |
| Game not loading     | Check console (F12), verify file paths exist                                   |
| Styling broken       | Run `npm run build:css`, clear browser cache                                   |
| JS errors            | `npm run lint:js` to catch syntax, check console                               |
| PWA not working      | Must serve over HTTPS or localhost; check SW scope                             |
| Search not filtering | Type in search box on landing page; filters name/category/difficulty           |
| Theme not persisting | Check localStorage `rtgaminghub-theme`, clear if stuck                         |
| Sounds not playing   | Click anywhere first (browser autoplay policy), check `prefers-reduced-motion` |
| Images 404           | Run `npm run validate` → checks all `games.json` images exist                  |

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **JavaScript Guide**: https://javascript.info
- **PWA Guide**: https://web.dev/progressive-web-apps/
- **Project Docs**: `docs/GAME_DEVELOPMENT.md`, `docs/CONFIGURATION.md`, `docs/ARCHITECTURE.md`

---

## Tips

✅ **Do:**

- Test on mobile (360px) + desktop + keyboard-only
- Use semantic HTML + ARIA labels
- Respect `prefers-reduced-motion` and `prefers-contrast`
- Keep game logic in `assets/js/home.js`
- Use `window.RTUtils` and `window.RTSound` globals

❌ **Don't:**

- Use Tailwind CDN (project uses built CSS only)
- Add external dependencies without discussion
- Use `innerHTML` with user data (XSS risk)
- Leave console errors/warnings
- Forget `npm run check` before committing

---

## Next Steps

1. Run `npm run check` (should pass with 1 warning: node_modules)
2. Run `npm run dev` → test all 5 games
3. Test PWA: install on mobile, go offline, verify games work
4. Read `docs/GAME_DEVELOPMENT.md` for deeper game creation guide
5. Create your first new game!

---

## Learning Path

- **Beginner**: Play games, explore `index.html`, modify colors in `tailwind.config.js`
- **Intermediate**: Edit existing game logic (`assets/js/home.js`), add CSS variables
- **Advanced**: Create new game from template, add to `games.json`, run `npm run sitemap`
- **Expert**: Add multiplayer, leaderboards, i18n, or backend API

---

Happy coding! 🎮

For more details, see [README.md](../README.md) and [CHANGELOG.md](../CHANGELOG.md).
