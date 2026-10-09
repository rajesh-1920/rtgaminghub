# Architecture Guide - RTGamingHub

## System Architecture

### Overall Structure

```
┌─────────────────────────────────────────────────────┐
│          RTGamingHub Landing Page                   │
│                (index.html)                         │
└──────────────────┬──────────────────────────────────┘
                   │
       ┌───────────┼───────────┬───────────┐
       ▼           ▼           ▼           ▼
   Tic Tac    Rock Paper  Bat Ball   Memory
   Toe        Scissors    Stump      Match

       ▼
   Number Guess

   Each game has:
   - HTML structure
   - CSS styling
   - JavaScript logic
```

---

## Directory Hierarchy

```
rtgaminghub/                    # Root directory
│
├── PUBLIC-FACING FILES
│   ├── index.html              # Landing page (entry point)
│   ├── 404.html                # Not found page
│   ├── offline.html            # PWA offline fallback
│   ├── robots.txt              # Crawl control
│   └── README.md               # Main documentation
│
├── CONFIGURATION
│   ├── package.json            # npm configuration
│   ├── tailwind.config.js      # Tailwind customization
│   ├── .gitignore              # Git ignore patterns
│   ├── .gitattributes          # Git attributes
│   ├── .editorconfig           # Editor settings
│   ├── .nvmrc                  # Node version (20)
│   ├── .prettierignore         # Prettier ignore
│   ├── .eslintignore           # ESLint ignore
│   ├── .stylelintrc.json       # Stylelint config
│   ├── .eslintrc.json          # ESLint config
│   ├── LICENSE                 # MIT License
│   ├── CONTRIBUTING.md         # Contributing guidelines
│   ├── CODE_OF_CONDUCT.md      # Code of conduct
│   ├── SECURITY.md             # Security policy
│   ├── CHANGELOG.md            # Version history
│   ├── .github/                # GitHub workflows & templates
│   └── .git/                   # Git repository
│
├── SOURCE CODE
│   └── src/                    # All source files
│       ├── js/
│       │   ├── main.js         # Main application
│       │   ├── sound.js        # WebAudio sound utility
│       │   └── utils/
│       │       └── helpers.js  # Shared utilities (ES module + global)
│       └── css/
│           ├── input.css       # Tailwind input
│           └── main.css        # Generated CSS (built, committed)
│
├── GAMES
│   └── games/                  # All game folders (5 games)
│       ├── tic-tac-toe/
│       ├── rock-paper-scissors/
│       ├── bat-ball-stump/
│       ├── memory-match/
│       └── number-guess/
│
├── PUBLIC ASSETS
│   └── public/
│       ├── images/             # Game images (WebP)
│       ├── favicon.svg         # App icon
│       ├── manifest.json       # PWA manifest
│       ├── sitemap.xml         # SEO sitemap
│       ├── sw.js               # Service Worker (copied to root on deploy)
│       └── data/
│           └── games.json      # Games metadata
│
├── SCRIPTS
│   └── scripts/
│       ├── validate.mjs        # Repo validator
│       └── sitemap.mjs         # Sitemap generator
│
└── DOCUMENTATION
    └── docs/
        ├── QUICK_START.md      # Quick start guide
        ├── GAME_DEVELOPMENT.md # Developer guide
        ├── CONFIGURATION.md    # Config reference
        ├── PROJECT_STRUCTURE.md# Project structure
        ├── REDESIGN_SUMMARY.md # Redesign notes
        └── ARCHITECTURE.md     # This file
```

---

## Application Flow

### User Journey

```
1. User visits index.html
   ↓
2. Page loads with built Tailwind CSS (src/css/main.css)
   ↓
3. JavaScript (main.js) initializes
   ↓
4. Theme preference loaded from localStorage
   ↓
5. Games data loaded from games.json
   ↓
6. Dynamic game cards rendered (5 games)
   ↓
7. Search filter + theme toggle active
   ↓
8. User clicks game card
   ↓
9. Redirected to game folder
   ↓
10. Game-specific HTML/CSS/JS loads
    ↓
11. User plays game
    ↓
12. Game stores stats in localStorage
```

---

## Technology Stack

```
┌─────────────────────────────────┐
│     Presentation Layer          │
│   HTML5 + Tailwind CSS (built)  │
│   (Responsive UI, dark mode)    │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│     Business Logic Layer        │
│   Vanilla JavaScript (ES2021)   │
│   (Game mechanics, state, PWA)  │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│     Data Layer                  │
│   LocalStorage API              │
│   JSON configuration (games.json)│
│   Cache API (Service Worker)    │
└─────────────────────────────────┘
```

---

## Code Organization

### Landing Page (`index.html`)

```html
Header (Navigation: Games, About, Contact, Theme Toggle) ├── Hero Section (Call-to-action + 5 game
emojis) ├── Games Section │ ├── Search Input (filter by name/category/difficulty) │ ├── Game Grid (5
cards, dynamic from games.json) │ │ ├── Game Card 1 (Tic Tac Toe 🎯) │ │ ├── Game Card 2 (Rock Paper
Scissors ✋) │ │ ├── Game Card 3 (Bat Ball Stump 🏏) │ │ ├── Game Card 4 (Memory Match 🧠) │ │ └──
Game Card 5 (Number Guess 🔢) ├── Features Section ├── About Section ├── CTA Section └── Footer (5
game links + Resources + Legal)
```

### Each Game Structure

```
games/[game-name]/
├── home.html              # Game markup (OG tags, canonical)
├── assets/
│   ├── css/
│   │   └── home.css       # Game styles (CSS variables)
│   ├── js/
│   │   └── home.js        # Game logic (state, localStorage)
│   └── images/            # Game assets (referenced by CSS)
└── README.md              # Game documentation
```

---

## File Dependencies

### index.html depends on:

```
index.html
├── src/css/main.css       (built Tailwind, no CDN)
├── src/js/main.js         (dynamic grid, search, theme)
├── src/js/sound.js        (WebAudio utility)
├── public/data/games.json (loaded via JavaScript)
├── public/manifest.json   (PWA manifest)
├── sw.js                  (Service Worker registration)
└── Google Fonts (Inter)
```

### Game pages depend on:

```
games/[game-name]/home.html
├── assets/css/home.css
├── assets/js/home.js
└── window.RTUtils (global fallback from src/js/utils/helpers.js)
    └── window.RTSound (global from src/js/sound.js)
```

---

## State Management

### Local State (Game Level)

```javascript
// Inside each game (e.g., bat-ball-stump)
const state = {
  playerScore: 0,
  computerScore: 0,
  drawScore: 0,
  roundCount: 1,
  currentStreak: 0,
  bestStreak: 0,
  history: [], // last 12 rounds
};
```

### Global State (Application Level)

```javascript
// In src/js/main.js (IIFE, no global pollution)
const appState = {
  games: [], // loaded from games.json
  theme: 'light', // 'light' | 'dark'
  searchQuery: '', // current filter
};
```

### Persistent State (LocalStorage)

```javascript
// Keys per game + hub
rtgaminghub - theme; // theme preference
rtgaminghub - tic - tac - toe; // scores (X, O, draws)
rtgaminghub - rock - paper - scissors; // you, computer, draws
rtgaminghub - bat - ball - stump; // full state object
rtgaminghub - memory - match - best; // best move count
rtgaminghub - number - guess - wins; // win count
rtgaminghub - sound; // sound toggle
```

---

## CSS Architecture

### Layer 1: Tailwind Base

```css
@tailwind base;
/* Reset and default styles */
```

### Layer 2: Components (src/css/input.css)

```css
@layer components {
  .btn-primary { ... }
  .btn-secondary { ... }
  .game-card { ... }
  .game-card-image { ... }
  .game-card-content { ... }
  .game-card-title { ... }
  .game-card-description { ... }
  .section-title { ... }
  .container-lg { ... }
}
```

### Layer 3: Utilities

```css
@tailwind utilities;
/* Single-purpose utilities */
```

### Layer 4: Custom (src/css/input.css)

```css
@keyframes fade-in-up { ... }

@layer utilities {
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
}

/* Accessibility */
:focus-visible { outline: 3px solid #3b82f6; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up { animation: none; }
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

### Game-Specific CSS Variables

Each game defines its own palette in `assets/css/home.css`:

```css
:root {
  --primary: #3b82f6;
  --bg-dark: #0a0e27;      /* bat-ball-stump */
  --bg-teal: #48A6A7;      /* tic-tac-toe */
  --win: #10b981;          /* success */
  --danger: #ef4444;       /* lose */
  ...
}
```

---

## Data Flow

### Configuration Data

```
games.json (public/data/)
    ↓
main.js (fetch + parse)
    ↓
appState.games (in-memory)
    ↓
index.html (render dynamic cards)
    ↓
Event listeners attached
```

### Game Data

```
User action (click game card)
    ↓
Event handler (main.js → navigateToGame)
    ↓
Navigate to game page
    ↓
Game starts (home.js)
    ↓
Update game state
    ↓
Save to localStorage (RTUtils.setLocalStorage)
    ↓
Sound effect (RTSound.win/lose/draw/click)
```

### PWA Offline Flow

```
Service Worker (sw.js, root scope)
    ↓
Install: precache core + all game pages
    ↓
Fetch: cache-first + stale-while-revalidate
    ↓
Navigate: network → cache → offline.html
    ↓
Activate: cleanup old caches
```

---

## Performance Considerations

### Loading Performance

```
1. Critical Path
   - HTML (index.html)
   - Built CSS (src/css/main.css, minified ~25KB)
   - Main JS (src/js/main.js + sound.js, ~15KB)
   - Games JSON (public/data/games.json)

2. Non-Critical
   - Game images (WebP, lazy-loaded if used)
   - Individual game JS/CSS (loaded on navigation)
   - Google Fonts (preconnect + display=swap)

3. Optimization
   - CSS minified (npm run build:css --minify)
   - JS syntax-checked (node --check)
   - Images: WebP format, appropriate sizes
   - HTTP caching headers (configure on host)
   - Service Worker precache for repeat visits
```

### Runtime Performance

```
- Event delegation (game cards, choice buttons)
- Cached DOM queries (elements object)
- Minimize reflows/repaints (class toggles > style mutations)
- CSS animations over JS (transform/opacity)
- Respect prefers-reduced-motion
- Debounce search input (native input event)
```

---

## Scalability Plan

### Easy to Add

```
✅ New Games
   └── Create folder in /games/ + add to games.json + run npm run sitemap

✅ New Pages
   └── Create HTML in root + link from nav/footer

✅ New Features
   └── Add components to src/ + use in games

✅ New Utilities
   └── Add to src/js/utils/helpers.js (ES module + global)
```

### Medium Complexity

```
⚠️ User Accounts
   └── Need backend/database (Firebase, Supabase, custom)

⚠️ Multiplayer (local hotseat already in TTT)
   └── Need WebSocket/WebRTC for remote

⚠️ Analytics
   └── Add GA/Plausible/Umami snippet
```

### High Complexity

```
❌ Real-time multiplayer
   └── WebSocket server + matchmaking needed

❌ User monetization
   └── Payment processor + legal compliance

❌ Mobile app
   └── Capacitor/PWA-to-app or React Native/Flutter
```

---

## Security Considerations

### Current Protections

- ✅ No external API calls (self-contained)
- ✅ No user authentication (anonymous play)
- ✅ localStorage (browser sandbox, same-origin)
- ✅ CSP headers (configure on host: `Content-Security-Policy: default-src 'self' fonts.googleapis.com fonts.gstatic.com; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data:; connect-src 'self';`)
- ✅ No eval/Function constructor
- ✅ Input validation (helpers.getRandomNumber guards, localStorage try/catch)
- ✅ XSS-safe DOM (textContent over innerHTML)

### Best Practices

- ✅ Sanitize any user input (none accepted currently)
- ✅ Validate data before storing (helpers guards)
- ✅ Use HTTPS in production (required for PWA/SW)
- ✅ Implement rate limiting (on host/CDN)
- ✅ Keep dependencies updated (npm audit, Dependabot)

---

## Deployment Architecture

### Development

```
Local Machine
    ↓
npm run dev (live-server --port=8000)
    ↓
Browser (http://localhost:8000)
```

### Production (Static Hosting)

```
Source Files (GitHub)
    ↓
GitHub Actions CI (lint + format + validate + build + sitemap)
    ↓
Deploy to Vercel/Netlify/GitHub Pages/Cloudflare Pages
    ↓
Static Files Served
    ↓
Service Worker registers (scope /)
    ↓
User Browser (PWA installable)
```

**Note**: `src/css/main.css` is committed (built artifact) so static hosts work without build step. CI also runs `npm run build:css` to verify.

---

## Future Architecture Improvements

### Phase 1 (Current — v1.2.0)

- ✅ Static files, no build required for deploy
- ✅ Client-side rendering (dynamic from JSON)
- ✅ Vanilla JavaScript (ES2021, IIFE pattern)
- ✅ PWA: manifest + SW + offline.html + shortcuts
- ✅ Search, theme, sound, per-game persistence
- ✅ ESLint + Prettier + Stylelint + CI + validator

### Phase 2 (Planned — v1.3.0)

- 🔲 IndexedDB for larger offline data (scores, history export)
- 🔲 Web Share API for game results
- 🔲 Keyboard shortcuts help overlay (`?` key)
- 🔲 Game-specific settings (difficulty, sound toggle per game)

### Phase 3 (Vision — v2.0.0)

- 🔲 Backend API (leaderboards, cloud sync)
- 🔲 User authentication (anonymous → named)
- 🔲 Remote multiplayer (WebRTC or WebSocket)
- 🔲 i18n (intl, multiple languages)

---

## Integration Points

### External Services

```
- Google Fonts (Inter, preconnect, display=swap)
- [Optional] Analytics (Plausible/GA/Umami)
- [Optional] Error tracking (Sentry)
- [Optional] CDN for images (currently local WebP)
```

### Internal Services

```
- localStorage API (persistence)
- Cache API (Service Worker offline)
- DOM API (rendering)
- Fetch API (games.json, SW precache)
- Event system (CustomEvent: rt:games-loaded)
- BroadcastChannel (future: cross-tab sync)
```

---

## Testing Strategy

### Unit Tests (future)

```javascript
// Test individual game logic
test('calculateScore', () => { ... });
test('getOutcome', () => { ... });
test('helpers.getRandomNumber guards', () => { ... });
```

### Integration Tests (future)

```javascript
// Test component interactions
test('loadGamesData renders cards', () => { ... });
test('theme toggle persists', () => { ... });
test('search filters games', () => { ... });
```

### E2E Tests (future)

```javascript
// Test user workflows
test('userPlaysTicTacToe', async () => { ... });
test('offlineFallbackWorks', async () => { ... });
```

### Current Validation (CI)

```
npm run check
  ├── lint:js (ESLint: src, games, scripts, sw.js, tailwind.config.js)
  ├── lint:css (Stylelint: input.css)
  ├── format:check (Prettier)
  ├── validate (scripts/validate.mjs)
  └── sitemap (scripts/sitemap.mjs)
```

---

## Monitoring & Logging

### Development

```javascript
console.log('Games data loaded:', games);
console.warn('Games metadata unavailable, using static cards.', error);
console.error('Unable to save game state:', error);
```

### Production (on host)

```javascript
// Optional: Send to logging service
logEvent('game_started', { gameId: 'tic-tac-toe' });
logEvent('game_completed', { gameId: 'memory-match', moves: 14, won: true });
```

---

## References

- [HTML5 Spec](https://html.spec.whatwg.org/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [MDN Docs](https://developer.mozilla.org/)
- [Web Performance](https://web.dev/performance/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

This architecture provides a solid foundation for growth and scalability!

For more details, see other documentation files.
