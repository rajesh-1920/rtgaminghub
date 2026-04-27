# Architecture Guide - RTGamingHub

## System Architecture

### Overall Structure

```
┌─────────────────────────────────────────────────────┐
│          RTGamingHub Landing Page                   │
│                (index.html)                         │
└──────────────────┬──────────────────────────────────┘
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼
  Tic Tac Toe   Rock Paper   Bat Ball
                Scissors      Stump
  
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
│   └── README.md               # Main documentation
│
├── CONFIGURATION
│   ├── package.json            # npm configuration
│   ├── tailwind.config.js      # Tailwind customization
│   ├── .gitignore              # Git ignore patterns
│   ├── LICENSE                 # MIT License
│   ├── CONTRIBUTING.md         # Contributing guidelines
│   └── .git/                   # Git repository
│
├── SOURCE CODE
│   └── src/                    # All source files
│       ├── js/
│       │   ├── main.js         # Main application
│       │   └── utils/
│       │       └── helpers.js  # Shared utilities
│       └── css/
│           ├── input.css       # Tailwind input
│           └── main.css        # Generated CSS
│
├── GAMES
│   └── games/                  # All game folders
│       ├── tic-tac-toe/
│       ├── rock-paper-scissors/
│       └── bat-ball-stump/
│
├── PUBLIC ASSETS
│   └── public/
│       ├── images/             # Game images
│       └── data/
│           └── games.json      # Games metadata
│
└── DOCUMENTATION
    └── docs/
        ├── QUICK_START.md      # Quick start guide
        ├── GAME_DEVELOPMENT.md # Developer guide
        ├── CONFIGURATION.md    # Config reference
        └── PROJECT_STRUCTURE.md# This file
```

---

## Application Flow

### User Journey

```
1. User visits index.html
   ↓
2. Page loads with Tailwind CSS styling
   ↓
3. JavaScript (main.js) initializes
   ↓
4. Games data loaded from games.json
   ↓
5. Game cards displayed to user
   ↓
6. User clicks game card
   ↓
7. Redirected to game folder
   ↓
8. Game-specific HTML/CSS/JS loads
   ↓
9. User plays game
   ↓
10. Game stores stats (optional)
```

---

## Technology Stack

```
┌─────────────────────────────────┐
│     Presentation Layer          │
│   HTML5 + Tailwind CSS          │
│   (Responsive UI)               │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│     Business Logic Layer        │
│   Vanilla JavaScript            │
│   (Game mechanics)              │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│     Data Layer                  │
│   LocalStorage API              │
│   JSON configuration            │
└─────────────────────────────────┘
```

---

## Code Organization

### Landing Page (`index.html`)

```html
Header (Navigation)
│
├── Hero Section (Call-to-action)
│
├── Games Section
│   ├── Game Card 1 (Tic Tac Toe)
│   ├── Game Card 2 (Rock Paper Scissors)
│   └── Game Card 3 (Bat Ball Stump)
│
├── Features Section
│
├── About Section
│
├── CTA Section
│
└── Footer
```

### Each Game Structure

```
games/[game-name]/
├── home.html              # Game markup
├── assets/
│   ├── css/
│   │   └── home.css       # Game styles
│   ├── js/
│   │   └── home.js        # Game logic
│   └── images/            # Game assets
└── README.md              # Game documentation
```

---

## File Dependencies

### index.html depends on:
```
index.html
├── Tailwind CSS CDN
├── src/css/main.css       (optional, if built locally)
├── src/js/main.js
└── public/data/games.json (loaded via JavaScript)
```

### Game pages depend on:
```
games/[game-name]/home.html
├── Tailwind CSS CDN
├── assets/css/home.css
└── assets/js/home.js
```

---

## State Management

### Local State (Game Level)

```javascript
// Inside each game
const gameState = {
  score: 0,
  moves: [],
  gameOver: false,
  winner: null
};
```

### Global State (Application Level)

```javascript
// In src/js/main.js
const appState = {
  currentGame: null,
  userPreferences: {},
  loadedGames: []
};
```

### Persistent State (LocalStorage)

```javascript
// Saved to browser storage
localStorage.setItem('gameState', JSON.stringify(gameState));
```

---

## CSS Architecture

### Layer 1: Tailwind Base
```css
@tailwind base;
/* Reset and default styles */
```

### Layer 2: Components
```css
@layer components {
  .btn-primary { /* button styles */ }
  .game-card { /* card styles */ }
}
```

### Layer 3: Utilities
```css
@tailwind utilities;
/* Single-purpose utilities */
```

### Layer 4: Custom
```css
/* Custom animations, keyframes */
@keyframes fadeInUp { /* ... */ }
```

---

## Data Flow

### Configuration Data

```
games.json (public/data/)
    ↓
main.js (loads and parses)
    ↓
appState (stores in memory)
    ↓
index.html (renders game cards)
```

### Game Data

```
User action (click game)
    ↓
Event handler (main.js)
    ↓
Navigate to game page
    ↓
Game starts (home.js)
    ↓
Update game state
    ↓
Save to localStorage (optional)
```

---

## Performance Considerations

### Loading Performance
```
1. Critical Path
   - HTML
   - Tailwind CDN
   - Main JS
   - Games JSON
   
2. Non-Critical
   - Game images
   - Individual game JS (lazy loaded)
   
3. Optimization
   - Minify CSS/JS
   - Compress images
   - Enable caching
```

### Runtime Performance
```
- Use event delegation
- Cache DOM queries
- Minimize reflows/repaints
- Optimize animations
- Debounce resize handlers
```

---

## Scalability Plan

### Easy to Add
```
✅ New Games
  └── Create new folder in /games/
  
✅ New Pages
  └── Create new HTML file in root
  
✅ New Features
  └── Add components to src/
  
✅ New Utilities
  └── Add functions to src/js/utils/
```

### Medium Complexity
```
⚠️ User Accounts
  └── Need backend/database
  
⚠️ Multiplayer
  └── Need WebSocket/Server
  
⚠️ Analytics
  └── Need tracking service
```

### High Complexity
```
❌ Real-time multiplayer
  └── WebSocket server needed
  
❌ User monetization
  └── Payment processor needed
  
❌ Mobile app
  └── React Native/Flutter needed
```

---

## Security Considerations

### Current Protections
- ✅ No external API calls
- ✅ No user authentication
- ✅ localStorage (browser sandbox)
- ✅ CSP headers (if deployed)

### Best Practices
- ✅ Sanitize any user input
- ✅ Validate data before storing
- ✅ Use HTTPS in production
- ✅ Implement rate limiting

---

## Deployment Architecture

### Development
```
Local Machine
    ↓
Live Server / HTTP Server
    ↓
Browser (http://localhost:8000)
```

### Production
```
Source Files (GitHub)
    ↓
Build Process (npm run build:css)
    ↓
Optimized Files
    ↓
Web Server (Nginx/Apache)
    ↓
CDN (CloudFlare)
    ↓
User Browser
```

---

## Future Architecture Improvements

### Phase 1 (Current)
- ✅ Static files
- ✅ Client-side rendering
- ✅ Vanilla JavaScript

### Phase 2 (Planned)
- 🔲 Service Worker (PWA)
- 🔲 IndexedDB for offline
- 🔲 Build tools (Webpack/Vite)

### Phase 3 (Vision)
- 🔲 Backend API
- 🔲 User authentication
- 🔲 Leaderboard system
- 🔲 Cloud deployment

---

## Integration Points

### External Services
```
- Tailwind CDN (CSS)
- Google Fonts (Fonts)
- [Optional] Analytics
- [Optional] Backend API
```

### Internal Services
```
- localStorage API
- DOM API
- Fetch API
- Event system
```

---

## Testing Strategy

### Unit Tests
```javascript
// Test individual game logic
test('calculateScore', () => { ... });
```

### Integration Tests
```javascript
// Test component interactions
test('loadGame', () => { ... });
```

### E2E Tests
```javascript
// Test user workflows
test('userPlaysGame', () => { ... });
```

---

## Monitoring & Logging

### Development
```javascript
console.log('Game started');
console.error('Game error');
```

### Production
```javascript
// Optional: Send to logging service
logEvent('game_started', { gameId: 'tic-tac-toe' });
```

---

## References

- [HTML5 Spec](https://html.spec.whatwg.org/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [MDN Docs](https://developer.mozilla.org/)
- [Web Performance](https://web.dev/performance/)

---

This architecture provides a solid foundation for growth and scalability!

For more details, see other documentation files.
