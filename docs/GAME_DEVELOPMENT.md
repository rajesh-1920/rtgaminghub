# RTGamingHub - Game Development Guide (v1.2.0)

Welcome to the RTGamingHub game development guide! This document covers the current patterns, tooling, and best practices for creating and maintaining games on the platform.

---

## 1. Project Overview

RTGamingHub is a platform for classic childhood games built with:

- **HTML5** — Semantic markup, accessibility-first
- **Tailwind CSS** — Built via `npm run build:css` (no CDN); source in `src/css/input.css`
- **Vanilla JavaScript (ES2021)** — No frameworks; IIFE pattern + global fallbacks
- **PWA-ready** — Manifest + Service Worker (root scope) + offline fallback

---

## 2. Directory Structure (v1.2.0)

```
rtgaminghub/
├── games/                 ← All game folders (5 games)
│   └── [game-name]/
│       ├── home.html      # Markup + meta tags (OG, canonical)
│       ├── assets/
│       │   ├── css/
│       │   │   └── home.css   # Game styles (CSS variables)
│       │   └── js/
│       │       └── home.js    # Game logic (IIFE + globals)
│       └── README.md      # Rules, controls, structure
├── public/
│   ├── images/            # Game thumbnails (WebP)
│   └── data/games.json    # Games metadata (source of truth)
├── src/
│   ├── css/
│   │   ├── input.css      # Tailwind source
│   │   └── main.css       # Built + minified (committed)
│   └── js/
│       ├── main.js        # Hub (grid, search, theme, SW)
│       ├── sound.js       # WebAudio (win/lose/draw/click/toggle)
│       └── utils/helpers.js # ES module + window.RTUtils global
└── scripts/
    ├── validate.mjs       # Repo validator
    └── sitemap.mjs        # Sitemap generator
```

---

## 3. Creating a New Game

### Step-by-Step Template

```bash
# 1. Create folder structure
mkdir -p games/my-game/assets/css games/my-game/assets/js

# 2. Copy template files from an existing game (e.g., memory-match)
cp games/memory-match/home.html games/my-game/home.html
cp games/memory-match/assets/css/home.css games/my-game/assets/css/home.css
cp games/memory-match/assets/js/home.js games/my-game/assets/js/home.js
cp games/memory-match/README.md games/my-game/README.md

# 3. Edit all four files (see details below)

# 4. Add WebP thumbnail
#    Create games/my-game.webp (or any) → copy to public/images/my-game.webp

# 5. Add entry to public/data/games.json (see schema below)

# 6. Regenerate sitemap + validate
npm run sitemap
npm run validate
```

### Required: `home.html` Meta Tags

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Short description for SEO/social" />
    <meta property="og:title" content="My Game | RTGamingHub" />
    <meta property="og:description" content="Short description for social sharing" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#3b82f6" />
    <title>My Game | RTGamingHub</title>
    <link
      rel="canonical"
      href="https://yourusername.github.io/rtgaminghub/games/my-game/home.html"
    />
    <link rel="stylesheet" href="./assets/css/home.css" />
  </head>
  <body>
    <a class="back-link" href="../../index.html">← Back to Games</a>
    <main>
      <!-- Your game markup -->
    </main>
    <script src="./assets/js/home.js"></script>
  </body>
</html>
```

**Required meta tags** (validated by `scripts/validate.mjs`):

- `description` — plain text
- `og:title`, `og:description`, `og:type` — Open Graph
- `theme-color` — matches PWA manifest
- `canonical` — absolute URL to this game page

### Required: `games.json` Entry

```json
{
  "id": "my-game",
  "name": "My Game",
  "description": "Short description for landing page card",
  "path": "./games/my-game/home.html",
  "icon": "🎮",
  "category": "puzzle", // strategy | chance | action | puzzle
  "players": "1", // "1" or "2"
  "difficulty": "Easy", // Easy | Medium | Hard
  "image": "./public/images/my-game.webp"
}
```

**Fields validated**: `id` (unique), `name`, `description`, `path`, `icon`, `category`, `players`, `difficulty`, `image` (file must exist).

### Required: `README.md`

Copy template from `games/memory-match/README.md`:

- Rules & how to play
- Controls (keyboard + mouse)
- File structure
- Development notes (globals used, storage keys)
- License

---

## 4. Game File Templates

### `assets/css/home.css` — CSS Variables Pattern

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Your palette */
  --primary: #3b82f6;
  --bg-main: #0f172a;
  --card: #1e293b;
  --win: #10b981;
  --lose: #ef4444;
  --muted: #94a3b8;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  background: var(--bg-main);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.back-link {
  align-self: flex-start;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  padding: 8px 14px;
  border-radius: 8px;
}

.back-link:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* Your game styles here */

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}

@media (max-width: 480px) {
  /* Mobile adjustments */
}
```

**Requirements:**

- Define palette in `:root` CSS variables
- Use `system-ui` font stack (no external fonts needed)
- Include `prefers-reduced-motion` media query
- Include `focus-visible` styles
- Mobile-first responsive (`max-width: 480px`)

---

### `assets/js/home.js` — IIFE + Global Fallbacks

```javascript
(() => {
  'use strict';

  // ── State ──────────────────────────────────────────────
  const state = {
    score: 0,
    best: 0,
    // ...
  };

  // ── DOM Elements (cached) ─────────────────────────────
  const elements = {
    scoreEl: document.getElementById('score'),
    // ...
  };

  // ── Init ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    loadState();
    bindEvents();
    render();
  }

  // ── Events ─────────────────────────────────────────────
  function bindEvents() {
    // Use addEventListener (not onclick)
    document.getElementById('btn').addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
  }

  // ── Game Logic ─────────────────────────────────────────
  function handleClick() { ... }
  function handleKeydown(e) { ... }

  // ── Render ─────────────────────────────────────────────
  function render() {
    elements.scoreEl.textContent = state.score;
    // Use textContent (not innerHTML) for safety
  }

  // ── Persistence (localStorage) ─────────────────────────
  const STORAGE_KEY = 'rtgaminghub-my-game';

  function loadState() {
    try {
      const saved = window.RTUtils?.getLocalStorage(STORAGE_KEY);
      if (saved) Object.assign(state, saved);
    } catch (e) { console.error('loadState', e); }
  }

  function saveState() {
    try {
      window.RTUtils?.setLocalStorage(STORAGE_KEY, state);
    } catch (e) { console.error('saveState', e); }
  }

  // ── Sound (optional) ──────────────────────────────────
  // window.RTSound?.click();
  // window.RTSound?.win();
  // window.RTSound?.lose();
  // window.RTSound?.draw();

})();
```

**Requirements:**

- IIFE wrapper (`(() => { 'use strict'; ... })();`)
- `'use strict'` at top
- Cache DOM in `elements` object
- Use `addEventListener` (not `onclick`)
- `textContent` over `innerHTML` (XSS-safe)
- `window.RTUtils` for random/storage (graceful fallback)
- `window.RTSound` for effects (optional, graceful)
- `localStorage` key: `rtgaminghub-<game-id>`
- Respect `prefers-reduced-motion` (CSS handles animation; JS can check `matchMedia`)

---

## 5. Styling Guide

### Tailwind (Built CSS Only)

- **No CDN** — project uses built `src/css/main.css`
- Available components (from `src/css/input.css`):
  - `.btn-primary`, `.btn-secondary`
  - `.game-card`, `.game-card-image`, `.game-card-content`, `.game-card-title`, `.game-card-description`
  - `.section-title`, `.container-lg`
  - `.animate-fade-in-up`
- Utility classes from Tailwind base available

### Game CSS Variables (Recommended)

```css
:root {
  --primary: #3b82f6; /* matches Tailwind primary */
  --bg-main: #0f172a;
  --card: #1e293b;
  --win: #10b981;
  --lose: #ef4444;
  --muted: #94a3b8;
}
```

Use variables in your game CSS for theming consistency.

### Responsive & Accessible

```css
/* Touch targets */
button { min-height: 44px; min-width: 44px; }

/* Prevent zoom on iOS */
input { font-size: 16px; }

/* Focus visible (already in main.css, but ensure your custom elements have it) */
:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }

/* Reduced motion (already in main.css) */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}

/* Mobile-first */
@media (max-width: 480px) { ... }
```

---

## 6. JavaScript Utilities (`window.RTUtils`)

Available globally on all pages (from `src/js/utils/helpers.js`):

```javascript
// Random integer [min, max] (guards: min<=max, finite)
window.RTUtils.getRandomNumber(min, max) → number

// Random array item
window.RTUtils.pickRandom(array) → item | undefined

// Coarse-pointer detection (prefers matchMedia over UA)
window.RTUtils.isMobileDevice() → boolean

// localStorage (JSON, try/catch)
window.RTUtils.setLocalStorage(key, value) → boolean
window.RTUtils.getLocalStorage(key, fallback = null) → value
window.RTUtils.removeLocalStorage(key) → void

// Delay
window.RTUtils.delay(ms) → Promise<void>

// Locale-formatted score (non-negative, integer)
window.RTUtils.formatScore(number) → string
```

**Usage in game JS:**

```javascript
const roll = window.RTUtils.getRandomNumber(1, 6);
window.RTUtils.setLocalStorage('my-game-score', 42);
const best = window.RTUtils.getLocalStorage('my-game-best', 0);
```

**Also available as ES module** (for scripts):

```javascript
import { getRandomNumber, setLocalStorage } from '../../src/js/utils/helpers.js';
```

---

## 7. Sound Utility (`window.RTSound`)

From `src/js/sound.js` — WebAudio, no assets:

```javascript
// Play effects
window.RTSound.win(); // two-tone up
window.RTSound.lose(); // low sawtooth
window.RTSound.draw(); // triangle
window.RTSound.click(); // short square

// Toggle sound on/off (persists to localStorage 'rtgaminghub-sound')
const nowOff = window.RTSound.toggle(); // returns new state (true = off)
```

**Respects:**

- `localStorage['rtgaminghub-sound'] === 'off'` → muted
- `prefers-reduced-motion: reduce` → muted
- Graceful no-op if AudioContext unavailable

---

## 8. Adding Game to Landing Page (Automatic)

Games are **automatically rendered** on `index.html` from `games.json`:

1. Add entry to `public/data/games.json`
2. Run `npm run sitemap` (updates `public/sitemap.xml`)
3. Run `npm run validate` (verifies all fields + image exists)
4. Landing page shows game card with:
   - Gradient background (cycled from 6 presets)
   - Emoji icon (`game.icon`)
   - Name, description
   - Player count + difficulty badges
   - Search filter (by name, description, category, difficulty)

**No manual HTML editing needed** for new games.

---

## 9. Best Practices

### Performance

- Cache DOM queries in `elements` object
- Use `addEventListener` + event delegation
- `textContent` over `innerHTML` (XSS-safe)
- Minimize reflows: batch DOM writes, use `classList` toggles

### Accessibility

- Semantic HTML (`main`, `button`, `label`, `aria-live`)
- `aria-label` on icon-only buttons
- `role="status" aria-live="polite"` for dynamic messages
- `:focus-visible` styles (in `main.css`; ensure custom elements work)
- Color contrast (test with `prefers-contrast: more`)
- Keyboard navigable (Tab, Enter, Space, Escape)

### State Management

- Single `state` object per game
- Persist via `window.RTUtils.setLocalStorage(key, state)`
- Load early in `init()`, save after each mutation
- Storage key: `rtgaminghub-<game-id>` (e.g., `rtgaminghub-tic-tac-toe`)

### Sound & Motion

- Use `window.RTSound` for effects
- CSS handles `prefers-reduced-motion` (animations disabled)
- JS can check: `matchMedia('(prefers-reduced-motion: reduce)').matches`

### Mobile

- Touch targets ≥ 44×44px
- `font-size: 16px` on inputs (prevents iOS zoom)
- Test at 360px width
- `height: 100dvh` (dynamic viewport) for full-screen games

### Code Quality

- IIFE wrapper + `'use strict'`
- `const`/`let`, no `var`
- Meaningful names, small functions
- JSDoc comments for exported helpers
- Run `npm run check` before commit

---

## 10. Validation & CI

### Local Commands

```bash
npm run check          # Full pipeline (lint + format + validate)
npm run validate       # Files, games.json, images, READMEs, manifest, sitemap
npm run sitemap        # Regenerate sitemap.xml
npm run lint:js        # ESLint (src, games, scripts, sw.js, tailwind.config.js)
npm run lint:css       # Stylelint (input.css)
npm run format         # Prettier auto-fix
```

### What `npm run validate` Checks

- Required files exist (index.html, main.js, helpers.js, sound.js, input.css, main.css, games.json, manifest.json, sitemap.xml, robots.txt, sw.js, offline.html, 404.html)
- `games.json`: schema, unique IDs, enums (category/difficulty), file paths exist, images exist
- Per-game `README.md` present + >100 chars
- `manifest.json`: shortcuts + icons present
- `sitemap.xml`: ≥2 URLs
- `public/images/`: WebP files count

### CI Pipeline (`.github/workflows/ci.yml`)

Runs on push/PR:

1. `npm ci`
2. `npm run build:css`
3. `node --check` on all JS files
4. `npm run lint:js`
5. `npm run lint:css`
6. `npm run format:check`
7. `npm run validate`
8. `npm run sitemap`
9. Link checks (markdown + HTML, non-blocking)

---

## 11. Deployment Notes

### Static Hosting (Vercel, Netlify, GitHub Pages, Cloudflare Pages)

- **No build required** — `src/css/main.css` is committed
- CI runs `npm run build:css` to verify
- Service Worker at `/sw.js` (root scope) → works on all static hosts
- Configure HTTPS (required for PWA/SW)
- Optional: CSP headers (see `docs/ARCHITECTURE.md`)

### Vercel Specific

```json
// vercel.json (if needed)
{
  "headers": [
    { "source": "/sw.js", "headers": [{ "key": "Service-Worker-Allowed", "value": "/" }] },
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

---

## 12. Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org/
- **JavaScript Guide**: https://javascript.info/
- **PWA Guide**: https://web.dev/progressive-web-apps/
- **Project Docs**: `docs/ARCHITECTURE.md`, `docs/CONFIGURATION.md`, `README.md`

---

## 13. Quick Reference Card

| Task           | Command / Pattern                                          |
| -------------- | ---------------------------------------------------------- |
| New game       | `mkdir -p games/x/assets/{css,js}` + copy template         |
| Add to landing | Edit `public/data/games.json` + `npm run sitemap`          |
| Validate all   | `npm run validate`                                         |
| Full CI check  | `npm run check`                                            |
| Random 1-6     | `window.RTUtils.getRandomNumber(1, 6)`                     |
| Persist state  | `window.RTUtils.setLocalStorage('rtgaminghub-x', state)`   |
| Load state     | `window.RTUtils.getLocalStorage('rtgaminghub-x', default)` |
| Play win sound | `window.RTSound.win()`                                     |
| Toggle sound   | `window.RTSound.toggle()`                                  |
| CSS variables  | `--primary`, `--win`, `--lose`, `--bg-main`                |
| Reduced motion | `@media (prefers-reduced-motion: reduce)`                  |
| Focus visible  | `:focus-visible` (in main.css)                             |

---

Happy game developing! 🎮

For questions: check existing game implementations, consult `docs/ARCHITECTURE.md`, or open a GitHub issue.
