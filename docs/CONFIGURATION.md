# RTGamingHub Configuration Guide

## Project Configuration Files

This guide explains all configuration files in the RTGamingHub project.

### 📋 `package.json`

Main project configuration file (v1.2.0).

```json
{
  "name": "rtgaminghub",
  "version": "1.2.0",
  "description": "A web platform of various childhood games built with HTML5, Tailwind CSS, and Vanilla JavaScript",
  "scripts": {
    "dev": "live-server --port=8000",
    "start": "npm run dev",
    "build:css": "tailwindcss -i ./src/css/input.css -o ./src/css/main.css --minify",
    "watch:css": "tailwindcss -i ./src/css/input.css -o ./src/css/main.css --watch",
    "lint:js": "eslint src games scripts sw.js tailwind.config.js --ext .js,.mjs",
    "lint:css": "stylelint src/css/input.css",
    "format": "prettier --write \"**/*.{html,js,css,json,md}\"",
    "format:check": "prettier --check \"**/*.{html,js,css,json,md}\"",
    "validate": "node scripts/validate.mjs",
    "sitemap": "node scripts/sitemap.mjs",
    "check": "npm run lint:js && npm run lint:css && npm run format:check && npm run validate",
    "test": "npm run check",
    "clean": "rm -rf node_modules package-lock.json dist build .cache coverage *.log"
  },
  "keywords": ["games", "childhood", "entertainment", "html5", "tailwind-css", "vanilla-js"],
  "author": "Rajesh Biswas",
  "license": "MIT",
  "engines": { "node": ">=20" },
  "devDependencies": {
    "eslint": "^8.57.0",
    "live-server": "^1.2.2",
    "prettier": "^3.2.5",
    "stylelint": "^16.2.0",
    "stylelint-config-standard": "^36.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```

**Usage:**

```bash
npm run dev           # Start dev server (port 8000)
npm run build:css     # Build & minify CSS
npm run watch:css     # Watch & rebuild CSS
npm run lint:js       # Lint JavaScript (src, games, scripts, sw.js)
npm run lint:css      # Lint CSS (input.css)
npm run format        # Auto-format with Prettier
npm run format:check  # Check formatting only
npm run validate      # Validate repo structure & games.json
npm run sitemap       # Generate sitemap.xml from games.json
npm run check         # Full CI check (lint + format + validate)
npm run test          # Alias for check
npm run clean         # Remove generated files
```

---

### 🎨 `tailwind.config.js`

Tailwind CSS configuration with project-specific theme tokens.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', './404.html', './offline.html',
    './src/**/*.{js,jsx}', './scripts/**/*.{js,mjs}',
    './games/**/*.{html,js}', './public/**/*.{html,json,js}', './sw.js',
  ],
  safelist: ['animate-fade-in-up', 'btn-primary', 'btn-secondary', 'game-card', ...],
  theme: {
    extend: {
      colors: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#ec4899' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
```

**Content paths** cover all HTML/JS that uses Tailwind classes. `safelist` protects dynamic classes not statically detected.

---

### 📝 `public/data/games.json`

Game metadata registry (5 games as of v1.2.0).

```json
{
  "games": [
    {
      "id": "tic-tac-toe",
      "name": "Tic Tac Toe",
      "icon": "🎯",
      "category": "strategy",
      "players": "2",
      "difficulty": "Easy",
      "path": "./games/tic-tac-toe/home.html",
      "image": "./public/images/tic-tac-toe.webp"
    },
    {
      "id": "rock-paper-scissors",
      "name": "Rock Paper Scissors",
      "icon": "✋",
      "category": "chance",
      "players": "1",
      "difficulty": "Easy",
      "path": "...",
      "image": "..."
    },
    {
      "id": "bat-ball-stump",
      "name": "Bat Ball Stump",
      "icon": "🏏",
      "category": "action",
      "players": "1",
      "difficulty": "Medium",
      "path": "...",
      "image": "..."
    },
    {
      "id": "memory-match",
      "name": "Memory Match",
      "icon": "🧠",
      "category": "puzzle",
      "players": "1",
      "difficulty": "Easy",
      "path": "...",
      "image": "..."
    },
    {
      "id": "number-guess",
      "name": "Number Guess",
      "icon": "🔢",
      "category": "puzzle",
      "players": "1",
      "difficulty": "Easy",
      "path": "...",
      "image": "..."
    }
  ]
}
```

**Schema** (validated by `scripts/validate.mjs`):

- Required: `id` (unique), `name`, `description`, `icon`, `category`, `players`, `difficulty`, `path`, `image`
- Categories: `strategy` | `chance` | `action` | `puzzle`
- Difficulties: `Easy` | `Medium` | `Hard`

---

### 🎮 `src/css/input.css`

Tailwind input file with custom components and animations.

```css
@tailwind base; @tailwind components; @tailwind utilities;

@layer components {
  .btn-primary { @apply px-6 py-3 bg-blue-600 text-white ...; }
  .btn-secondary { @apply px-6 py-3 bg-purple-600 text-white ...; }
  .game-card { @apply bg-white rounded-xl shadow-lg hover:shadow-2xl ...; }
  .game-card-image { @apply w-full h-48 object-cover; }
  .game-card-content { @apply p-4; }
  .game-card-title { @apply text-xl font-bold text-gray-800 mb-2; }
  .game-card-description { @apply text-gray-600 text-sm mb-4; }
  .section-title { @apply text-4xl md:text-5xl font-bold ...; }
  .container-lg { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
}

@keyframes fade-in-up { ... }
@layer utilities { .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; } }

/* Accessibility */
:focus-visible { outline: 3px solid #3b82f6; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .animate-fade-in-up { animation: none; } ... }
```

Build with `npm run build:css` → outputs `src/css/main.css` (committed).

---

### 📁 File Locations Reference

| File               | Purpose                  | Location                  |
| ------------------ | ------------------------ | ------------------------- |
| Landing Page       | Main entry point         | `index.html`              |
| 404 Page           | Not found fallback       | `404.html`                |
| Offline Page       | PWA offline fallback     | `offline.html`            |
| Project Config     | NPM scripts              | `package.json`            |
| Tailwind Config    | CSS customization        | `tailwind.config.js`      |
| Global CSS (input) | Tailwind source          | `src/css/input.css`       |
| CSS Output         | Built & minified         | `src/css/main.css`        |
| Main JS            | App logic + theme/search | `src/js/main.js`          |
| Sound Utility      | WebAudio bleeps          | `src/js/sound.js`         |
| Utilities          | Helper functions         | `src/js/utils/helpers.js` |
| Games List         | Game metadata            | `public/data/games.json`  |
| Manifest           | PWA manifest             | `public/manifest.json`    |
| Service Worker     | Offline caching          | `sw.js` (root scope)      |
| Sitemap            | SEO sitemap              | `public/sitemap.xml`      |
| Robots             | Crawl control            | `robots.txt`              |
| Favicon            | App icon                 | `public/favicon.svg`      |

---

### 🔧 Customization Examples

**Add New Color** in `tailwind.config.js`:

```javascript
colors: {
  primary: '#3b82f6',
  myColor: '#ff5733',
}
```

**Add New Font**:

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui'],
  serif: ['Georgia', 'serif'],
}
```

**Add Screen Size**:

```javascript
screens: {
  'sm': '640px', 'md': '768px', 'lg': '1024px',
  'huge': '1400px',
}
```

---

### 📊 Build Process

```
Source (input.css) → Tailwind CLI → Built CSS (main.css, minified)
```

**Development**: Built CSS committed → works without build step on static hosts.
**Production**: Same artifact, cache-friendly.

---

### 🚀 Environment Setup

**Required**: Modern browser, text editor.
**Optional**: Node.js ≥20 (for build/lint/validate).

```bash
# Recommended: nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Or download from nodejs.org
```

---

### 🤖 CI / GitHub Actions

`.github/workflows/ci.yml` runs on push/PR:

- `build` job: install → build:css → node --check (all JS) → lint:js → lint:css → format:check → validate → sitemap
- `test-links` job: markdown-link-check + htmlhint (non-blocking)

Uses `.nvmrc` for Node version, caches `npm`, cancels stale runs.

---

### 🐛 Common Issues

| Issue                        | Fix                                                    |
| ---------------------------- | ------------------------------------------------------ |
| Tailwind classes not working | Run `npm run build:css`, verify `main.css` linked      |
| npm commands not found       | Install Node.js ≥20                                    |
| Games not loading            | Check `games.json` paths exist, run `npm run validate` |
| Format errors                | Run `npm run format`                                   |
| Lint errors                  | Run `npm run lint:js` / `npm run lint:css`             |

---

### 📚 Additional Resources

- [Tailwind Config](https://tailwindcss.com/docs/configuration)
- [npm Scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [HTML Meta Tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
- [PWA Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

### ✅ Checklist for New Setup

- [ ] Clone/download project
- [ ] Run `npm ci` (or `npm install`)
- [ ] Run `npm run check` (verifies everything)
- [ ] Run `npm run dev` → open http://localhost:8000
- [ ] All 5 games load correctly
- [ ] Theme toggle works (🌙/☀️)
- [ ] Search filter works
- [ ] Offline page works (stop network in DevTools)
- [ ] Ready to develop!

---

For more details, see [README.md](../README.md) and [CHANGELOG.md](../CHANGELOG.md).
