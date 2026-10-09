# Memory Match 🧠

Find all 6 matching pairs in as few moves as possible.

## 🎮 How to Play

- Click a card to flip it
- Find the matching pair
- Complete all 6 pairs to win
- Fewer moves = better score

## 🎯 Features

- 6 unique emoji pairs (12 cards)
- Move counter & pair counter
- Best score persistence (localStorage)
- Sound effects on flip/win
- Responsive grid (4×3 on desktop, 3×4 on mobile)
- Keyboard accessible (Tab + Enter)

## ⌨️ Controls

- Click/Tap cards to flip
- `R` or click "Restart" for new game

## 📁 File Structure

```
memory-match/
├── home.html
├── assets/
│   ├── css/home.css
│   └── js/home.js
```

## 🔧 Development

- Uses `window.RTUtils` for helpers
- Uses `window.RTSound` for effects
- Best score stored in `localStorage` key `rtgaminghub-memory-match-best`

## 📝 License

MIT — see root [LICENSE](../LICENSE)
