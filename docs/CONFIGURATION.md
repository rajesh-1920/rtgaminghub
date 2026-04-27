# RTGamingHub Configuration Guide

## Project Configuration Files

This guide explains all configuration files in the RTGamingHub project.

### 📋 `package.json`

Main project configuration file.

```json
{
  "name": "rtgaminghub",
  "version": "1.0.0",
  "description": "A web platform of various childhood games",
  "scripts": {
    "dev": "live-server",
    "build:css": "npx tailwindcss -i ./src/css/input.css -o ./src/css/main.css",
    "watch:css": "npx tailwindcss -i ./src/css/input.css -o ./src/css/main.css --watch"
  }
}
```

**Usage:**
```bash
npm run dev          # Start development server
npm run build:css    # Build CSS once
npm run watch:css    # Watch and rebuild CSS
```

---

### 🎨 `tailwind.config.js`

Tailwind CSS configuration and customization.

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./games/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      }
    }
  }
}
```

**Key Sections:**
- **content**: Files to scan for Tailwind classes
- **theme**: Customization of colors, fonts, sizes, etc.
- **plugins**: Add Tailwind plugins

---

### 🎨 `src/css/input.css`

Input file for Tailwind CSS preprocessing.

Contains Tailwind directives that get compiled to `main.css`:
- `@tailwind base`    - Reset and default styles
- `@tailwind components` - Component classes
- `@tailwind utilities`  - Utility classes

---

### 🎮 `public/data/games.json`

Game configuration and metadata.

```json
{
  "games": [
    {
      "id": "tic-tac-toe",
      "name": "Tic Tac Toe",
      "description": "...",
      "path": "./games/tic-tac-toe/home.html",
      "icon": "🎯",
      "category": "strategy",
      "players": "2",
      "difficulty": "Easy"
    }
  ]
}
```

**Usage:** Can be loaded dynamically to render game cards.

---

### 📝 `.gitignore`

Tells Git which files to ignore.

```
node_modules/
.DS_Store
.env
dist/
build/
*.log
```

---

## 📁 File Locations Reference

| File | Purpose | Location |
|------|---------|----------|
| Landing Page | Main entry point | `index.html` |
| Project Config | NPM scripts | `package.json` |
| Tailwind Config | CSS customization | `tailwind.config.js` |
| Global CSS | Tailwind input | `src/css/input.css` |
| CSS Output | Generated CSS | `src/css/main.css` |
| Main JS | App logic | `src/js/main.js` |
| Utilities | Helper functions | `src/js/utils/helpers.js` |
| Games List | Game metadata | `public/data/games.json` |

---

## 🔧 Customization Examples

### Add New Color

In `tailwind.config.js`:
```javascript
colors: {
  primary: '#3b82f6',
  myColor: '#ff5733',  // Add this
}
```

Then use: `<div class="bg-myColor">...</div>`

### Add New Font

In `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui'],
  serif: ['Georgia', 'serif'],
  custom: ['MyFont', 'sans-serif'],
}
```

### Add Screen Size

In `tailwind.config.js`:
```javascript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'huge': '1400px',  // Add this
}
```

Then use: `<div class="huge:text-2xl">...</div>`

---

## 📊 Build Process

### Development
```
Local Files → Tailwind CDN → Browser
(No build needed)
```

### Production
```
Source CSS (input.css)
        ↓
Tailwind CLI
        ↓
Built CSS (main.css)
        ↓
Minify & Deploy
```

Command:
```bash
npm run build:css
```

---

## 🚀 Environment Setup

### Required
- Modern browser
- Text editor

### Optional
- Node.js (for build process)
- npm (for dependencies)

### Installation

```bash
# Node.js comes with npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# Or download from nodejs.org
```

---

## 🐛 Common Issues

**Issue**: Tailwind classes not working
- **Fix**: Ensure Tailwind CDN is loaded or CSS is built

**Issue**: npm commands not found
- **Fix**: Install Node.js from nodejs.org

**Issue**: Games not loading
- **Fix**: Check `games.json` paths and file existence

---

## 📚 Additional Resources

- [Tailwind Config Docs](https://tailwindcss.com/docs/configuration)
- [npm Scripts Docs](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [HTML Meta Tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)

---

## ✅ Checklist for New Setup

- [ ] Clone/download project
- [ ] Open `index.html` in browser
- [ ] All games load correctly
- [ ] (Optional) Run `npm install`
- [ ] (Optional) Run `npm run build:css`
- [ ] Ready to develop!

---

For more details, see [README.md](../README.md)
