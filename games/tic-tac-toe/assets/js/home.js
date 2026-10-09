(() => {
  'use strict';

  const boxes = Array.from(document.querySelectorAll('.box'));
  const resetButtons = Array.from(document.querySelectorAll('.reset-btn'));
  const winPanel = document.querySelector('.result');
  const msg = document.querySelector('#message');
  const scoreLine = document.querySelector('#score-line');
  const container = document.querySelector('.container');
  const turnIndicator = document.querySelector('#turn-indicator');
  const scoreXEl = document.querySelector('#score-x');
  const scoreOEl = document.querySelector('#score-o');
  const scoreDrawEl = document.querySelector('#score-draw');

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const STORAGE_KEY = 'rtgaminghub-tic-tac-toe';
  const scores = loadScores();
  let current = 'O';
  let gameOver = false;

  paintScores();
  updateTurn();

  boxes.forEach((box, idx) => {
    box.addEventListener('click', () => handleMove(box, idx));
  });

  resetButtons.forEach((btn) => {
    btn.addEventListener('click', resetBoard);
  });

  function handleMove(box, idx) {
    if (gameOver || box.disabled || box.textContent !== '') return;
    box.textContent = current;
    box.classList.add(current === 'X' ? 'box-x' : 'box-o');
    box.setAttribute('aria-label', `Cell ${idx + 1}, ${current}`);
    box.disabled = true;
    const winner = checkWinner();
    if (winner) {
      endGame(`Congratulations! ${winner} is the winner`, winner);
      return;
    }
    if (isDraw()) {
      endGame('Match draw — please play again', 'draw');
      return;
    }
    current = current === 'O' ? 'X' : 'O';
    updateTurn();
  }

  function checkWinner() {
    for (const [a, b, c] of WIN_CONDITIONS) {
      const v0 = boxes[a].textContent;
      if (v0 !== '' && v0 === boxes[b].textContent && v0 === boxes[c].textContent) {
        return v0;
      }
    }
    return null;
  }

  function isDraw() {
    return boxes.every((b) => b.textContent !== '');
  }

  function endGame(message, result) {
    gameOver = true;
    if (result === 'X') scores.x += 1;
    else if (result === 'O') scores.o += 1;
    else scores.draws += 1;
    saveScores();
    paintScores();
    msg.textContent = message;
    if (scoreLine) {
      scoreLine.textContent = `X ${scores.x} • Draws ${scores.draws} • O ${scores.o}`;
    }
    winPanel.classList.remove('hide');
    if (container) container.style.display = 'none';
  }

  function resetBoard() {
    current = 'O';
    gameOver = false;
    boxes.forEach((box, idx) => {
      box.textContent = '';
      box.disabled = false;
      box.classList.remove('box-x', 'box-o');
      box.setAttribute('aria-label', `Cell ${idx + 1}`);
    });
    if (msg) msg.textContent = '';
    if (winPanel) winPanel.classList.add('hide');
    if (container) container.style.display = '';
    updateTurn();
  }

  function updateTurn() {
    if (turnIndicator) turnIndicator.textContent = gameOver ? 'Game over' : `${current} to move`;
  }

  function paintScores() {
    if (scoreXEl) scoreXEl.textContent = String(scores.x);
    if (scoreOEl) scoreOEl.textContent = String(scores.o);
    if (scoreDrawEl) scoreDrawEl.textContent = String(scores.draws);
  }

  function loadScores() {
    try {
      if (window.RTUtils) {
        const saved = window.RTUtils.getLocalStorage(STORAGE_KEY, null);
        if (saved && typeof saved === 'object') {
          return { x: num(saved.x), o: num(saved.o), draws: num(saved.draws) };
        }
      } else {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw);
          return { x: num(s.x), o: num(s.o), draws: num(s.draws) };
        }
      }
    } catch (e) {
      console.error('Unable to load scores', e);
    }
    return { x: 0, o: 0, draws: 0 };
  }

  function saveScores() {
    try {
      if (window.RTUtils) window.RTUtils.setLocalStorage(STORAGE_KEY, scores);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (e) {
      console.error('Unable to save scores', e);
    }
  }

  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  }
})();
