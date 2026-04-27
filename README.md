# RTGamingHub - Classic Games Platform

## 🎮 About

RTGamingHub is a modern web platform that brings back the joy of classic childhood games. Built entirely with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**, this project offers a lightweight, ad-free gaming experience.

## 🎯 Features

- ⚡ **Fast & Lightweight** - No frameworks, pure vanilla JavaScript
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS for a professional look
- 🎮 **Multiple Games** - Collection of classic games to play
- 0️⃣ **No Ads** - Completely ad-free experience
- 💯 **100% Free** - Open-source and free to use

## 📁 Project Structure

```
rtgaminghub/
├── index.html                 # Main landing page
├── package.json               # Project configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── README.md                  # This file
├── LICENSE                    # MIT License
├── CONTRIBUTING.md            # Contributing guidelines
├── .gitignore                 # Git ignore rules
│
├── src/                       # Source files
│   ├── css/
│   │   ├── input.css          # Tailwind input file
│   │   └── main.css           # Generated CSS (from build process)
│   └── js/
│       ├── main.js            # Main application file
│       └── utils/
│           └── helpers.js     # Utility functions
│
├── games/                     # Game folders
│   ├── tic-tac-toe/          # Tic Tac Toe game
│   ├── rock-paper-scissors/  # Rock Paper Scissors game
│   └── bat-ball-stump/       # Bat Ball Stump game
│
├── public/                    # Public assets
│   ├── images/               # Game images and assets
│   └── data/
│       └── games.json        # Games configuration
│
└── docs/                      # Documentation
```

## 🎮 Games Included

### 1. **Tic Tac Toe** 🎯
- Classic 3x3 grid strategy game
- Play against another player
- Difficulty: Easy

### 2. **Rock Paper Scissors** ✋
- Timeless chance-based game
- Play against AI
- Difficulty: Easy

### 3. **Bat Ball Stump** 🏏
- Cricket-inspired action game
- Single player challenge
- Difficulty: Medium

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for Tailwind CSS build process)

### Quick Start

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/rtgaminghub.git
   cd rtgaminghub
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

3. **Build Tailwind CSS (Optional)**
   ```bash
   npm install
   npm run build:css
   ```

## 📦 Installation

### Using the Tailwind CSS CDN (Recommended for beginners)
The project is pre-configured to use Tailwind CSS via CDN. No additional setup needed!

### Using Build Process
For production optimization:

```bash
# Install dependencies
npm install

# Build CSS
npm run build:css

# Watch for changes (development)
npm run watch:css
```

## 🛠️ Development

### File Organization

- **HTML**: Game-specific HTML files in each game folder
- **CSS**: Tailwind CSS with custom components in `src/css/`
- **JavaScript**: Vanilla JS utilities and game logic

### Adding a New Game

1. Create a new folder in `/games/`
2. Add `home.html`, `assets/css/home.css`, and `assets/js/home.js`
3. Update `public/data/games.json` with game info
4. Add game card to `index.html` or use JavaScript to load from JSON

### Best Practices

- Keep game logic in separate files
- Use semantic HTML
- Follow Tailwind CSS naming conventions
- Comment your code
- Test on multiple devices

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
    },
  },
}
```

### Fonts
Modify the font configuration in the same file or inline styles in HTML.

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## ✨ Credits

- **Creator**: Rajesh Biswas
- **Built with**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Inspiration**: Classic childhood games

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature request? Please open an issue on GitHub or contact us directly.

## 📞 Contact & Support

- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com)
- **GitHub**: [Your Profile](https://github.com)

## 🎓 Learning Resources

This project is great for learning:
- HTML5 fundamentals
- CSS with Tailwind
- Vanilla JavaScript game development
- Responsive web design
- Web project structure

## 🚀 Future Enhancements

- [ ] Add more games
- [ ] Leaderboard system
- [ ] User profiles
- [ ] Multiplayer functionality
- [ ] Offline support (PWA)
- [ ] Sound effects
- [ ] Dark mode

## 📊 Statistics

- **Games**: 3+
- **Lines of Code**: 1000+
- **Build Size**: < 100KB
- **Load Time**: < 1s

---

Made with ❤️ for game lovers everywhere. Happy gaming! 🎮
