(() => {
  'use strict';
  const EMOJI = ['🎮', '🎯', '🏏', '✋', '🧩', '🚀'];
  const KEY = 'rtgaminghub-memory-match-best';
  const board = document.getElementById('board');
  const movesEl = document.getElementById('moves');
  const pairsEl = document.getElementById('pairs');
  const bestEl = document.getElementById('best');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');
  let deck = [],
    first = null,
    lock = false,
    moves = 0,
    pairs = 0;

  init();
  restartBtn.addEventListener('click', init);

  function init() {
    deck = shuffle([...EMOJI, ...EMOJI]);
    first = null;
    lock = false;
    moves = 0;
    pairs = 0;
    board.innerHTML = '';
    deck.forEach((emo, i) => {
      const b = document.createElement('button');
      b.className = 'card';
      b.type = 'button';
      b.dataset.emo = emo;
      b.dataset.idx = i;
      b.setAttribute('aria-label', 'Card ' + (i + 1));
      b.textContent = emo;
      b.addEventListener('click', () => flip(b));
      board.appendChild(b);
    });
    paint();
    setStatus('Find all pairs!');
    paintBest();
  }
  function flip(btn) {
    if (lock || btn.classList.contains('open') || btn.classList.contains('matched')) return;
    btn.classList.add('open');
    if (window.RTSound) window.RTSound.click();
    if (!first) {
      first = btn;
      return;
    }
    moves += 1;
    if (first.dataset.emo === btn.dataset.emo) {
      first.classList.add('matched');
      btn.classList.add('matched');
      first = null;
      pairs += 1;
      paint();
      if (pairs === EMOJI.length) win();
    } else {
      lock = true;
      const a = first;
      first = null;
      paint();
      setTimeout(() => {
        a.classList.remove('open');
        btn.classList.remove('open');
        lock = false;
      }, 700);
    }
    paint();
  }
  function win() {
    setStatus(`You won in ${moves} moves! 🎉`);
    if (window.RTSound) window.RTSound.win();
    try {
      const best = Number(localStorage.getItem(KEY));
      if (!Number.isFinite(best) || best === 0 || moves < best) {
        localStorage.setItem(KEY, String(moves));
        paintBest();
      }
    } catch (e) {
      console.error(e);
    }
  }
  function paint() {
    movesEl.textContent = moves;
    pairsEl.textContent = pairs;
  }
  function paintBest() {
    try {
      const b = localStorage.getItem(KEY);
      bestEl.textContent = b ? b + ' moves' : '—';
    } catch (_) {
      bestEl.textContent = '—';
    }
  }
  function setStatus(t) {
    statusEl.textContent = t;
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
})();
