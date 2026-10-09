# RTGamingHub - Project Structure (v1.2.0)

## Current Structure Overview

```
rtgaminghub/
│
├── 📄 Root Files (Main Entry Points)
│   ├── index.html              ← Landing page (dynamic, SEO, PWA)
│   ├── 404.html                ← Not found page
│   ├── offline.html            ← PWA offline fallback
│   ├── robots.txt              ← Crawl control
│   ├── package.json            ← Project configuration (v1.2.0)
│   ├── tailwind.config.js      ← Tailwind CSS setup
│   ├── .nvmrc                  ← Node version (20)
│   ├── .editorconfig           ← Editor settings
│   ├── .gitignore              ← Git ignore rules
│   ├── .gitattributes          ← Git attributes
│   ├── .prettierignore         ← Prettier ignore
│   ├── .eslintignore           ← ESLint ignore
│   ├── .stylelintrc.json       ← Stylelint config
│   ├── .eslintrc.json          ← ESLint config
│   ├── README.md               ← Full documentation
│   ├── CHANGELOG.md            ← Version history
│   ├── LICENSE                 ← MIT License
│   ├── CONTRIBUTING.md         ← Contribution guidelines
│   ├── CODE_OF_CONDUCT.md      ← Contributor Covenant
│   ├── SECURITY.md             ← Security policy
│   └── .git/                   ← Git repository
│
├── 📁 src/                     ← Source code
│   ├── css/
│   │   ├── input.css           ← Tailwind input (source)
│   │   └── main.css            ← Generated CSS (built, minified, committed)
│   └── js/
│       ├── main.js             ← Main app (grid, search, theme, SW)
│       ├── sound.js            ← WebAudio sound utility
│       └── utils/
│           └── helpers.js      ← Shared utilities (ES module + global fallback)
│
├── 📁 games/                   ← All games organized (5 games)
│   ├── tic-tac-toe/
│   │   ├── home.html
│   │   ├── assets/
│   │   │   ├── css/home.css
│   │   │   └── js/home.js
│   │   └── README.md
│   ├── rock-paper-scissors/
│   │   ├── home.html
│   │   ├── assets/
│   │   │   ├── css/home.css
│   │   │   ├── js/home.js
│   │   │   └── image/ (rock.jpeg, paper.jpeg, scissors.jpeg)
│   │   └── README.md
│   ├── bat-ball-stump/
│   │   ├── home.html
│   │   ├── assets/
│   │   │   ├── css/home.css
│   │   │   └── js/home.js
│   │   └── README.md
│   ├── memory-match/
│   │   ├── home.html
│   │   ├── assets/
│   │   │   ├── css/home.css
│   │   │   └── js/home.js
│   │   └── README.md
│   └── number-guess/
│       ├── home.html
│       ├── assets/
│       │   ├── css/home.css
│       │   │   └── js/home.js
│       └── README.md
│
├── 📁 public/                  ← Public assets (served as-is)
│   ├── images/                 ← Game thumbnails (WebP)
│   │   ├── tic-tac-toe.webp
│   │   ├── rock-paper-scissors.webp
│   │   ├── bat-ball-stump.webp
│   │   ├── memory-match.webp
│   │   └── number-guess.webp
│   ├── favicon.svg             ← App icon (SVG)
│   ├── manifest.json           ← PWA manifest (shortcuts, categories)
│   ├── sitemap.xml             ← SEO sitemap (generated)
│   ├── sw.js                   ← Service Worker (copy to root on deploy)
│   └── data/
│       └── games.json          ← Games metadata (5 games)
│
├── 📁 scripts/                 ← Build/validation scripts
│   ├── validate.mjs            ← Repo validator (CI gate)
│   └── sitemap.mjs             ← Sitemap generator
│
├── 📁 .github/                 ← GitHub automation
│   ├── workflows/ci.yml        ← CI pipeline
│   ├── ISSUE_TEMPLATE/         ← Bug/feature templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
└── 📁 docs/                    ← Documentation
    ├── QUICK_START.md          ← Get started quickly
    ├── GAME_DEVELOPMENT.md     ← Developer guide
    ├── CONFIGURATION.md        ← Configuration reference
    ├── ARCHITECTURE.md         ← System architecture
    ├── REDESIGN_SUMMARY.md     ← Redesign notes (historical)
    └── PROJECT_STRUCTURE.md    ← This file
```

---

## What Changed (v1.1.0 → v1.2.0)

### ✅ Added

| Item                               | Purpose                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `scripts/validate.mjs`             | Repo validator (files, games.json, images, READMEs, manifest, sitemap)  |
| `scripts/sitemap.mjs`              | Auto-generates `public/sitemap.xml` from `games.json`                   |
| `public/sitemap.xml`               | SEO sitemap (7 URLs)                                                    |
| `robots.txt`                       | Crawl control + sitemap pointer                                         |
| `404.html`                         | Branded not-found page                                                  |
| `offline.html`                     | PWA offline fallback                                                    |
| `public/favicon.svg`               | SVG app icon                                                            |
| `public/manifest.json`             | Expanded: shortcuts (5 games), categories, maskable icons               |
| `sw.js` (root)                     | Service Worker v2 (correct scope, offline fallback)                     |
| `.github/workflows/ci.yml`         | Hardened CI (permissions, cache, concurrency, full pipeline)            |
| `.github/ISSUE_TEMPLATE/`          | Bug report, feature request, config                                     |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist                                                            |
| `.github/CODEOWNERS`               | Review routing                                                          |
| `SECURITY.md`                      | Security policy + disclosure                                            |
| `CODE_OF_CONDUCT.md`               | Contributor Covenant 2.1                                                |
| Memory Match game                  | `games/memory-match/` (6 pairs, best score)                             |
| Number Guess game                  | `games/number-guess/` (1-100, 7 tries, win counter)                     |
| Per-game READMEs                   | 4 new (bat-ball-stump, memory-match, number-guess, rock-paper-scissors) |

### 🔄 Updated

| Item                      | Change                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `index.html`              | Dynamic game grid, search filter, theme toggle, 5-game hero/footer, SW registration, OG tags |
| `games.json`              | 5 games (added memory-match, number-guess)                                                   |
| `public/manifest.json`    | Shortcuts, scope, display_override, categories, SVG icons                                    |
| `tailwind.config.js`      | Extended content paths + safelist                                                            |
| `src/js/main.js`          | Dynamic grid, search, theme, SW register                                                     |
| `src/js/utils/helpers.js` | ES module + global fallback, validation, pickRandom, locale formatScore                      |
| `src/js/sound.js`         | WebAudio utility (win/lose/draw/click/toggle)                                                |
| `src/css/input.css`       | fade-in-up keyframe, focus-visible, reduced-motion                                           |
| `docs/CONFIGURATION.md`   | Fully rewritten (current scripts, files, CI, checklist)                                      |
| `README.md`               | Fully rewritten (5 games, full docs, commands)                                               |
| `CHANGELOG.md`            | v1.2.0 entry added                                                                           |
| `docs/ARCHITECTURE.md`    | Fully rewritten (5 games, current stack, PWA, security, deployment)                          |
| `package.json`            | v1.2.0, engines node>=20, new scripts                                                        |

### 🗑️ Removed

| Item             | Reason                                               |
| ---------------- | ---------------------------------------------------- |
| `assets/` folder | Legacy duplicate of `public/images/`, typo filenames |
| Tailwind CDN     | `index.html` now uses built `src/css/main.css` only  |
| `public/sw.js`   | Moved to root `sw.js` for correct PWA scope          |

---

## Key Features of Current Structure

✅ **Professional Organization**

- Separated concerns (src, public, games, scripts, docs)
- Clear directory hierarchy
- Easy to scale

✅ **Zero-Build Deploy**

- `src/css/main.css` committed (minified)
- Works on any static host without build step
- CI verifies build anyway

✅ **PWA Ready**

- Manifest + Service Worker (root scope)
- Offline fallback + shortcuts
- Installable on mobile/desktop

✅ **Quality Gates**

- ESLint + Stylelint + Prettier
- Custom validator (`scripts/validate.mjs`)
- GitHub Actions CI (lint + format + validate + sitemap)
- Node --check on all JS

✅ **Developer Experience**

- `.editorconfig` + `.nvmrc` (Node 20)
- `.gitignore` + `.gitattributes` + `.prettierignore` + `.eslintignore`
- `npm run check` runs full pipeline
- `npm run sitemap` auto-updates SEO

✅ **Games Preserved & Enhanced**

- All 3 original games refactored (a11y, persistence, bugs fixed)
- 2 new games added (Memory Match, Number Guess)
- Consistent structure: `home.html` + `assets/css/home.css` + `assets/js/home.js` + `README.md`
- OG tags + canonical URLs on all game pages

---

## File Location Reference

| Need                     | Location                              |
| ------------------------ | ------------------------------------- |
| Edit landing page        | `index.html`                          |
| Edit Tic Tac Toe         | `games/tic-tac-toe/home.html`         |
| Edit Rock Paper Scissors | `games/rock-paper-scissors/home.html` |
| Edit Bat Ball Stump      | `games/bat-ball-stump/home.html`      |
| Edit Memory Match        | `games/memory-match/home.html`        |
| Edit Number Guess        | `games/number-guess/home.html`        |
| Add utilities            | `src/js/utils/helpers.js`             |
| Add sound effects        | `src/js/sound.js`                     |
| Configure Tailwind       | `tailwind.config.js`                  |
| Add games list           | `public/data/games.json`              |
| Validate repo            | `npm run validate`                    |
| Generate sitemap         | `npm run sitemap`                     |
| Full quality check       | `npm run check`                       |
| Quick help               | `docs/QUICK_START.md`                 |

---

## Quick Commands

```bash
# View project structure
tree -L 3

# Install dependencies (Node >=20)
npm ci

# Start local server (port 8000)
npm run dev

# Build & minify CSS
npm run build:css

# Watch CSS changes
npm run watch:css

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Auto-format
npm run format

# Check formatting
npm run format:check

# Validate everything
npm run validate

# Generate sitemap.xml
npm run sitemap

# Full CI pipeline (lint + format + validate)
npm run check

# Clean generated files
npm run clean
```

---

## Learning Resources

See documentation files for:

- How to create a new game → `docs/GAME_DEVELOPMENT.md`
- How to customize styles → `docs/CONFIGURATION.md`
- How to add features → `docs/ARCHITECTURE.md`
- Build process & scripts → `docs/CONFIGURATION.md`
- Best practices → `CONTRIBUTING.md`

---

## Summary

The project is now:

- 📁 Better organized (src, public, games, scripts, docs, .github)
- 🎨 Modern (Tailwind built, CSS variables, dark mode)
- 📱 PWA-ready (manifest, SW, offline, shortcuts)
- 📖 Well documented (5 doc files + per-game READMEs + root README)
- 🛡️ Quality-gated (lint + format + validate + CI)
- 🚀 Ready to scale (5 games, extensible structure)
- 🎮 All games functional & enhanced

**All 5 games are fully playable with persistent scores, sound, and offline support!**

---

## What to Do Now

1. ✅ Review the structure
2. ✅ Run `npm run check` (should pass)
3. ✅ Run `npm run dev` and test all 5 games
4. ✅ Test PWA: install, go offline, verify games work
5. ✅ Deploy to Vercel/Netlify/GitHub Pages (static files only)

---

Happy coding! 🎮

For detailed documentation, see:

- [Main README](../README.md)
- [Quick Start](QUICK_START.md)
- [Game Development](GAME_DEVELOPMENT.md)
- [Configuration](CONFIGURATION.md)
- [Architecture](ARCHITECTURE.md)
