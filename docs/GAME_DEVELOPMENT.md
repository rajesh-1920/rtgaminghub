# RTGamingHub - Game Development Guide

Welcome to the RTGamingHub game development guide! This document will help you understand the project structure and best practices for developing games.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Game Development](#game-development)
4. [Styling Guide](#styling-guide)
5. [JavaScript Utilities](#javascript-utilities)
6. [Best Practices](#best-practices)

## Project Overview

RTGamingHub is a platform for classic childhood games built with:
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No frameworks or dependencies

## Directory Structure

```
rtgaminghub/
├── src/
│   ├── css/          # Global styles (Tailwind)
│   └── js/
│       ├── main.js   # Application entry point
│       └── utils/    # Shared utilities
├── games/            # All game folders
├── public/           # Public assets
└── docs/             # Documentation
```

## Game Development

### Creating a New Game

1. **Create game folder**
   ```
   games/[game-name]/
   ├── home.html
   ├── README.md
   └── assets/
       ├── css/
       │   └── home.css
       ├── js/
       │   └── home.js
       └── images/
   ```

2. **HTML Structure**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Game Name</title>
       <script src="https://cdn.tailwindcss.com"></script>
       <link rel="stylesheet" href="./assets/css/home.css">
   </head>
   <body>
       <!-- Game content -->
       <script src="./assets/js/home.js"></script>
   </body>
   </html>
   ```

3. **Update games.json**
   ```json
   {
       "id": "game-id",
       "name": "Game Name",
       "description": "Game description",
       "path": "./games/game-name/home.html",
       "icon": "🎮",
       "category": "category",
       "players": "1",
       "difficulty": "Easy",
       "image": "/public/images/game-name.webp"
   }
   ```

## Styling Guide

### Using Tailwind CSS

All games should use Tailwind CSS for styling:

```html
<!-- Instead of custom CSS -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Click Me
</button>
```

### Common Classes

```html
<!-- Spacing -->
<div class="p-4 mb-8">Content</div>

<!-- Colors -->
<div class="bg-blue-600 text-white">Blue Box</div>

<!-- Responsive -->
<div class="text-sm md:text-lg lg:text-xl">Responsive Text</div>

<!-- Flexbox -->
<div class="flex justify-center items-center space-x-4">
    <item>1</item>
    <item>2</item>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Grid items -->
</div>
```

## JavaScript Utilities

Use helper functions from `/src/js/utils/helpers.js`:

```javascript
import { 
    getRandomNumber, 
    isMobileDevice, 
    setLocalStorage, 
    getLocalStorage 
} from './helpers.js';

// Random number
const random = getRandomNumber(1, 10);

// Check device
if (isMobileDevice()) {
    // Mobile specific code
}

// Store score
setLocalStorage('game-score', 100);
const score = getLocalStorage('game-score');
```

## Best Practices

### Performance
- Minimize DOM manipulation
- Use event delegation
- Cache DOM queries
- Optimize images (use WebP)
- Lazy load images when possible

### Accessibility
- Use semantic HTML
- Include alt text for images
- Support keyboard navigation
- Ensure color contrast
- Test with screen readers

### User Experience
- Clear game instructions
- Visual feedback for actions
- Loading indicators
- Error handling
- Mobile-friendly layout

### Code Quality
- Write self-documenting code
- Add comments for complex logic
- Use meaningful variable names
- Keep functions focused
- Test thoroughly

### Mobile Optimization
```css
/* Touch-friendly buttons */
min-height: 44px;
min-width: 44px;

/* Prevent zoom on input */
font-size: 16px;

/* Full viewport height */
height: 100vh;
width: 100vw;
```

### Game State Management

```javascript
// Keep game state organized
const gameState = {
    score: 0,
    level: 1,
    gameOver: false,
    playerName: 'Player1',
};

// Update state
gameState.score += 10;

// Save/load from localStorage
function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
    }
}
```

### Event Handling

```javascript
// Delegation for dynamic elements
document.addEventListener('click', (e) => {
    if (e.target.matches('.game-btn')) {
        handleGameBtnClick(e.target);
    }
});

// Cleanup listeners
function removeGameListeners() {
    document.removeEventListener('click', handleGameBtnClick);
}
```

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

## Getting Help

- Check existing game implementations
- Review the main index.html
- Consult the utilities file
- Open an issue on GitHub

---

Happy game developing! 🎮
