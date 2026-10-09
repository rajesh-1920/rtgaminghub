# RTGamingHub - Classic Games Platform

## 🎮 About

RTGamingHub is a modern web platform that brings back the joy of classic childhood games. Built entirely with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**, this project offers a lightweight, ad-free gaming experience.

## 🎯 Features

- ⚡ **Fast & Lightweight** - No frameworks, pure vanilla JavaScript
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS for a professional look
- 🎮 **5 Games Included** - Tic Tac Toe, Rock Paper Scissors, Bat Ball Stump, Memory Match, Number Guess
- 0️⃣ **No Ads** - Completely ad-free experience
- 💯 **100% Free** - Open-source and free to use
- 🌙 **Dark/Light Theme** - Toggle with persistence
- 🔍 **Search & Filter** - Find games by name, category, difficulty
- 📴 **PWA Ready** - Offline play via Service Worker
- 🔊 **Sound Effects** - WebAudio bleeps (toggleable)

## 📁 Project Structure

```
rtgaminghub/
├── index.html                 # Main landing page
├── 404.html                   # Not found page
├── offline.html               # PWA offline fallback
├── robots.txt                 # Crawl control
├── package.json               # Project configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── .nvmrc                     # Node version (20)
├── .editorconfig              # Editor settings
├── .gitignore                 # Git ignore rules
├── .gitattributes             # Git attributes
├── .prettierignore            # Prettier ignore
├── .eslintignore              # ESLint ignore
├── .stylelintrc.json          # Stylelint config
├── .eslintrc.json             # ESLint config
├── README.md                  # This file
├── CHANGELOG.md               # Version history
├── LICENSE                    # MIT License
├── CONTRIBUTING.md            # Contributing guidelines
├── CODE_OF_CONDUCT.md         # Contributor Covenant
├── SECURITY.md                # Security policy
├── src/                       # Source files
│   ├── css/
│   │   ├── input.css          # Tailwind input file
│   │   └── main.css           # Generated CSS (built, committed)
│   └── js/
│       ├── main.js            # Main application file
│       ├── sound.js           # WebAudio sound utility
│       └── utils/
│           └── helpers.js     # Utility functions (ES module + global)
├── games/                     # Game folders (5 games)
│   ├── tic-tac-toe/
│   ├── rock-paper-scissors/
│   ├── bat-ball-stump/
│   ├── memory-match/
│   └── number-guess/
├── public/                    # Public assets
│   ├── images/               # Game images (WebP)
│   ├── favicon.svg           # App icon
│   ├── manifest.json         # PWA manifest
│   ├── sitemap.xml           # SEO sitemap
│   └── data/
│       └── games.json        # Games configuration
├── scripts/                   # Build/validation scripts
│   ├── validate.mjs          # Repo validator
│   └── sitemap.mjs           # Sitemap generator
├── .github/
│   ├── workflows/ci.yml       # GitHub Actions CI
│   ├── ISSUE_TEMPLATE/        # Bug/feature templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
└── docs/                      # Documentation
```

## 🎮 Games Included

### 1. **Tic Tac Toe** 🎯

- Classic 3x3 grid strategy game
- Two players (hotseat)
- Persistent scores (localStorage)
- Difficulty: Easy

### 2. **Rock Paper Scissors** ✋

- Timeless chance-based game
- Play against computer AI
- Persistent scores & draws
- Difficulty: Easy

### 3. **Bat Ball Stump** 🏏

- Cricket-inspired action game
- Single player vs computer
- Scoreboard, streak tracking, round history
- Difficulty: Medium

### 4. **Memory Match** 🧠

- Find all 6 pairs in fewest moves
- Emoji cards, move counter, best score persistence
- Difficulty: Easy

### 5. **Number Guess** 🔢

- Guess the secret number 1–100 in 7 tries
- History of guesses, win counter
- Difficulty: Easy

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js ≥20 (optional, for build/lint/validate)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rtgaminghub.git
   cd rtgaminghub
   ```

2. **Install dependencies & verify**

   ```bash
   npm ci
   npm run check
   ```

3. **Start development server**

   ```bash
   npm run dev
   # Opens http://localhost:8000
   ```

4. **Or open directly** (no build required)

   ```bash
   # Simply open index.html in your browser
   ```

## 📦 Build & Quality Commands

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start live-server on port 8000              |
| `npm run build:css`    | Build & minify Tailwind CSS                 |
| `npm run watch:css`    | Watch & rebuild CSS on changes              |
| `npm run lint:js`      | ESLint (src, games, scripts, sw.js)         |
| `npm run lint:css`     | Stylelint (input.css)                       |
| `npm run format`       | Auto-format with Prettier                   |
| `npm run format:check` | Check formatting only                       |
| `npm run validate`     | Validate repo structure + games.json        |
| `npm run sitemap`      | Generate sitemap.xml from games.json        |
| `npm run check`        | Full CI pipeline (lint + format + validate) |
| `npm run test`         | Alias for `check`                           |
| `npm run clean`        | Remove node_modules, locks, build artifacts |

## 🛠️ Development

### File Organization

- **HTML**: `games/*/home.html` per game, `index.html` landing
- **CSS**: Tailwind via `src/css/input.css` → `src/css/main.css` (built, committed)
- **JavaScript**: Vanilla JS, ES modules where possible, global fallback via `window.RTUtils`
- **Games**: Self-contained in `games/<id>/` with `assets/css/home.css` + `assets/js/home.js`

### Adding a New Game

1. Create `games/<new-game>/` with `home.html`, `assets/css/home.css`, `assets/js/home.js`
2. Add WebP image to `public/images/<new-game>.webp`
3. Add entry to `public/data/games.json` (run `npm run validate` to verify)
4. Run `npm run sitemap` to update sitemap.xml
5. Game appears automatically on landing page (dynamic rendering from JSON)

### Best Practices

- Keep game logic in separate files
- Use semantic HTML + ARIA labels
- Follow Tailwind CSS naming conventions
- Comment complex logic
- Test on mobile (360px) + desktop + keyboard-only
- Respect `prefers-reduced-motion` and `prefers-contrast`

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      myColor: '#ff5733',
    },
  },
}
```

### Fonts

Modify `fontFamily` in `tailwind.config.js` or use inline styles.

### Dark Mode

Theme toggle persists to `localStorage` (key: `rtgaminghub-theme`). CSS variables in `src/css/input.css` handle light/dark.

---

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## ✨ Credits

- **Creator**: Rajesh Biswas
- **Built with**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Inspiration**: Classic childhood games

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature request? Please open an issue on GitHub using our [templates](.github/ISSUE_TEMPLATE/).

## 📞 Contact & Support

- **Email**: rajeshbiswas@example.com
- **GitHub**: [RajeshBiswas](https://github.com/yourusername)

## 🎓 Learning Resources

This project is great for learning:

- HTML5 fundamentals
- CSS with Tailwind (utility-first, custom components, animations)
- Vanilla JavaScript game development (state, localStorage, DOM)
- Responsive web design (mobile-first, clamp, media queries)
- PWA basics (manifest, service worker, offline)
- Web project structure & tooling (ESLint, Prettier, Stylelint, CI)

## 🚀 Future Enhancements

- [ ] Leaderboard system (local + remote)
- [ ] User profiles with avatars
- [ ] Multiplayer via WebRTC / WebSocket
- [ ] More games (Snake, 2048, Quiz, Simon Says)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] i18n support

## 📊 Statistics (v1.2.0)

- **Games**: 5
- **Lines of Code**: ~2,500 (JS/CSS/HTML)
- **Build Size**: ~25 KB CSS (minified) + ~15 KB JS
- **Load Time**: < 1s on 3G
- **Lighthouse**: >90 Performance, >95 Accessibility

---

Made with ❤️ for game lovers everywhere. Happy gaming! 🎮
