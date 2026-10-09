(() => {
  'use strict';
  const MAX_TRIES = 7;
  const KEY = 'rtgaminghub-number-guess-wins';
  const form = document.getElementById('form');
  const input = document.getElementById('guess');
  const statusEl = document.getElementById('status');
  const leftEl = document.getElementById('left');
  const bestEl = document.getElementById('best');
  const historyEl = document.getElementById('history');
  const restartBtn = document.getElementById('restart');
  let secret = 0,
    tries = 0,
    over = false;

  init();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (over) return;
    const v = Number(input.value);
    if (!Number.isInteger(v) || v < 1 || v > 100) {
      statusEl.textContent = 'Enter a whole number 1–100.';
      return;
    }
    tries += 1;
    const li = document.createElement('li');
    li.textContent = String(v);
    historyEl.appendChild(li);
    if (v === secret) {
      statusEl.textContent = `Correct! It was ${secret} in ${tries} ${tries === 1 ? 'try' : 'tries'}. 🎉`;
      if (window.RTSound) window.RTSound.win();
      bumpWins();
      over = true;
    } else if (tries >= MAX_TRIES) {
      statusEl.textContent = `Out of tries! It was ${secret}. Try again.`;
      if (window.RTSound) window.RTSound.lose();
      over = true;
    } else if (v < secret) {
      statusEl.textContent = `${v} is too low. ${MAX_TRIES - tries} left.`;
      if (window.RTSound) window.RTSound.click();
    } else {
      statusEl.textContent = `${v} is too high. ${MAX_TRIES - tries} left.`;
      if (window.RTSound) window.RTSound.click();
    }
    leftEl.textContent = String(MAX_TRIES - tries);
    input.value = '';
    input.focus();
  });
  restartBtn.addEventListener('click', init);

  function init() {
    secret = 1 + Math.floor(Math.random() * 100);
    tries = 0;
    over = false;
    historyEl.innerHTML = '';
    leftEl.textContent = String(MAX_TRIES);
    statusEl.textContent = 'Make your first guess!';
    paintBest();
  }
  function bumpWins() {
    try {
      const n = Number(localStorage.getItem(KEY)) || 0;
      localStorage.setItem(KEY, String(n + 1));
      paintBest();
    } catch (e) {
      console.error(e);
    }
  }
  function paintBest() {
    try {
      bestEl.textContent = (localStorage.getItem(KEY) || '0') + ' wins';
    } catch (_) {
      bestEl.textContent = '—';
    }
  }
})();
