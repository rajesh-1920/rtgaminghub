# Rock Paper Scissors ✋

Classic game against the computer — choose Rock, Paper, or Scissors.

## 🎮 How to Play

- **Rock** crushes **Scissors**
- **Scissors** cut **Paper**
- **Paper** covers **Rock**
- Click a button or press `R`/`P`/`S`
- Scores persist in your browser

## 🎯 Features

- Persistent scores (wins/draws/losses)
- Visual feedback (green border = your choice, red = computer)
- Sound effects (WebAudio, toggleable)
- Reset button
- Keyboard accessible

## ⌨️ Controls

| Key       | Action       |
| --------- | ------------ |
| `R` / `1` | Rock         |
| `P` / `2` | Paper        |
| `S` / `3` | Scissors     |
| `X`       | Reset scores |

## 📁 File Structure

```
rock-paper-scissors/
├── home.html
├── assets/
│   ├── css/home.css
│   ├── js/home.js
│   └── image/ (rock.jpeg, paper.jpeg, scissors.jpeg)
```

## 🔧 Development

- Uses `window.RTUtils` for random & storage
- Uses `window.RTSound` for effects
- State in `localStorage` key `rtgaminghub-rock-paper-scissors`

## 📝 License

MIT — see root [LICENSE](../LICENSE)
