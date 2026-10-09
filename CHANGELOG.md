# Changelog

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
