# Bat Ball Stump 🏏

A cricket-inspired action game where you play Bat, Ball, or Stump against the computer.

## 🎮 How to Play

- **Bat** beats **Stump** (bat knocks stumps)
- **Stump** beats **Ball** (stumps stop ball)
- **Ball** beats **Bat** (ball hits bat)
- Click a choice or press keyboard shortcut (B/A/S)
- Scores persist in your browser (localStorage)

## 🎯 Features

- Round counter & best win streak
- Recent rounds history (last 12)
- Sound effects (WebAudio, toggleable)
- Dark theme with glassmorphism UI
- Responsive: works on mobile & desktop
- Offline playable (PWA)

## ⌨️ Controls

| Key       | Action       |
| --------- | ------------ |
| `B` / `1` | Choose Bat   |
| `A` / `2` | Choose Ball  |
| `S` / `3` | Choose Stump |
| `R`       | New Round    |
| `X`       | Reset Scores |

## 📁 File Structure

```
bat-ball-stump/
├── home.html           # Main game page
├── assets/
│   ├── css/home.css    # Styles (CSS variables, animations)
│   └── js/home.js      # Game logic (state, localStorage, UI)
```

## 🔧 Development

- No build step — open `home.html` directly
- Uses `window.RTUtils` for helpers (random, storage)
- Uses `window.RTSound` for sound effects
- State persisted to `localStorage` key `rtgaminghub-bat-ball-stump`

## 📝 License

MIT — see root [LICENSE](../LICENSE)
