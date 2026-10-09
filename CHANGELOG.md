# Changelog

## [1.2.0] - 2026-10-10

### Fixed

- `.gitignore` no longer ignores itself; covers node_modules/env/logs/OS/IDE/build
- `.gitattributes`, `.editorconfig`, `.nvmrc` (Node 20), `.prettierignore`, `.eslintignore`
- `LICENSE` updated (2024-2026, Rajesh Biswas)
- Tailwind `main.css` rebuilt with `fade-in-up` keyframe, focus-visible, reduced-motion
- Legacy `assets/` folder removed (duplicate of `public/images/`)
- Tailwind CDN removed from `index.html` — built `main.css` only
- Service Worker moved from `public/sw.js` to root `sw.js` (correct PWA scope)
- `tailwind.config.js` content paths extended + safelist for dynamic classes
- ESLint overrides for ES modules (helpers, scripts) + service worker + tailwind.config
- Stylelint config for Tailwind at-rules
- GitHub Actions CI hardened: permissions, concurrency, npm cache, node-version-file, full pipeline

### Added

- **Governance**: `SECURITY.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), issue/PR templates, `CODEOWNERS`
- **PWA**: `robots.txt`, `public/sitemap.xml` + `scripts/sitemap.mjs`, `404.html`, `offline.html`, `public/favicon.svg`
- **Manifest v2**: shortcuts for all 5 games, maskable SVG icons, categories, display_override
- **Validator** (`scripts/validate.mjs`): required files, games.json schema, images, READMEs, manifest, sitemap
- **5 games total**: Memory Match 🧠 + Number Guess 🔢 added to existing 3
- **Per-game READMEs**: bat-ball-stump, memory-match, number-guess, rock-paper-scissors (TTT already had)
- **Search & filter**: dynamic game grid from `games.json` with client-side search
- **Theme toggle**: dark/light mode with localStorage persistence
- **WebAudio sound utility**: `src/js/sound.js` (win/lose/draw/click, respects reduced-motion + toggle)
- **Helpers upgrade**: `window.RTUtils` global fallback + validation, `pickRandom`, `formatScore` locale
- **Tic-Tac-Toe**: persistent scores, a11y labels, fixed reset bug, "winer" typo fixed
- **Rock-Paper-Scissors**: DRY refactor, unbiased RNG, `<button>` elements, keyboard support, persistence
- **Bat-Ball-Stump**: XSS-safe history render, consistent reset, dead CSS removed
- **OG/canonical meta tags** on all 5 game pages + `index.html` hero/footer updated to 5 games
- **Docs**: `README.md` fully rewritten, `docs/CONFIGURATION.md` fully rewritten
- **CI**: GitHub Actions workflow with lint:js, lint:css, format:check, validate, sitemap, link checks

### Changed

- Package.json v1.2.0, engines node>=20, new scripts: lint:css, format, validate, sitemap, check, test, clean
- `public/manifest.json` expanded with shortcuts, scope, categories, screenshots placeholders
- `index.html`: hero shows 5 emojis, footer lists 5 games, search input + theme toggle in nav
- All game pages: canonical URLs, OG tags, consistent meta structure
- `tailwind.config.js`: added scripts/, public/, sw.js, 404.html, offline.html to content

---

## [1.1.0] - 2026-10-10

### Fixed

- `.gitignore` no longer ignores itself; covers node_modules/dist/env/logs
- Image pipeline: `public/images/*.webp` populated, `games.json` paths fixed
- Tailwind `main.css` built (was 88B stub), focus + reduced-motion support
- Tic-Tac-Toe reset bugs, typos, missing labels; persistent scores
- Rock-Paper-Scissors DRY refactor, unbiased RNG, buttons + keyboard + persistence
- Bat-Ball-Stump XSS-safe history, consistent reset, dead-code cleanup

### Added

- Dynamic game grid from `games.json` + search filter
- Dark/light theme toggle with persistence
- SEO/OG tags, manifest hook, skip link, dynamic footer year
- ESLint + Prettier + `scripts/validate.mjs` + GitHub Actions CI
- PWA manifest + service worker, sound utility, Memory Match + Number Guess games
