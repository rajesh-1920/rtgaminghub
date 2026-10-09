# Number Guess 🔢

Guess the secret number between 1 and 100 in 7 tries or fewer.

## 🎮 How to Play

- Enter a number 1–100 and press Guess (or Enter)
- "Too high" / "Too low" feedback after each guess
- 7 attempts maximum
- History shows all your guesses

## 🎯 Features

- Random secret number each game
- Attempt counter (7 max)
- Win counter persistence (localStorage)
- Guess history display
- Sound effects (win/lose/click)
- Keyboard optimized (Enter to submit)

## ⌨️ Controls

- Type number, press `Enter` or click Guess
- Click "New game" to restart

## 📁 File Structure

```
number-guess/
├── home.html
├── assets/
│   ├── css/home.css
│   └── js/home.js
```

## 🔧 Development

- Uses `window.RTUtils` for helpers
- Uses `window.RTSound` for effects
- Wins stored in `localStorage` key `rtgaminghub-number-guess-wins`

## 📝 License

MIT — see root [LICENSE](../LICENSE)
