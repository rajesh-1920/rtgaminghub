(() => {
  'use strict';

  const CHOICES = ['rock', 'paper', 'scissors'];
  const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  const LABELS = { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' };
  const STORAGE_KEY = 'rtgaminghub-rock-paper-scissors';

  const buttons = Array.from(document.querySelectorAll('[data-choice]'));
  const resultEl = document.querySelector('.result');
  const yourScoreEl = document.querySelector('#your-score');
  const computerScoreEl = document.querySelector('#computer-score');
  const drawScoreEl = document.querySelector('#draw-score');
  const resetBtn = document.querySelector('#reset-btn');

  const state = loadState();
  paint();

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => play(btn.dataset.choice));
  });

  if (resetBtn) resetBtn.addEventListener('click', resetScores);

  function play(playerChoice) {
    if (!CHOICES.includes(playerChoice)) return;
    const computerChoice = randomChoice();
    const outcome = getOutcome(playerChoice, computerChoice);

    buttons.forEach((b) => b.classList.remove('is-active', 'is-win', 'is-lose'));
    const playerBtn = buttons.find((b) => b.dataset.choice === playerChoice);
    const computerBtn = buttons.find((b) => b.dataset.choice === computerChoice);
    if (playerBtn) playerBtn.classList.add('is-active', outcome === 'win' ? 'is-win' : outcome === 'lose' ? 'is-lose' : 'is-win');
    if (computerBtn && computerChoice !== playerChoice) {
      computerBtn.classList.add(outcome === 'win' ? 'is-lose' : 'is-win');
    }

    if (outcome === 'win') {
      state.you += 1;
      setResult(`You win! Computer chose ${LABELS[computerChoice]}.`);
    } else if (outcome === 'lose') {
      state.computer += 1;
      setResult(`You lost. Computer chose ${LABELS[computerChoice]}.`);
    } else {
      state.draws += 1;
      setResult(`Draw! Computer also chose ${LABELS[computerChoice]}.`);
    }
    saveState();
    paint();
  }

  function getOutcome(player, computer) {
    if (player === computer) return 'draw';
    return BEATS[player] === computer ? 'win' : 'lose';
  }

  function randomChoice() {
    try {
      if (window.RTUtils) return CHOICES[window.RTUtils.getRandomNumber(0, 2)];
    } catch (_) { /* fallback */ }
    return CHOICES[Math.floor(Math.random() * 3)];
  }

  function setResult(text) {
    if (resultEl) resultEl.textContent = text;
  }

  function paint() {
    if (yourScoreEl) yourScoreEl.textContent = String(state.you);
    if (computerScoreEl) computerScoreEl.textContent = String(state.computer);
    if (drawScoreEl) drawScoreEl.textContent = String(state.draws);
  }

  function resetScores() {
    state.you = 0;
    state.computer = 0;
    state.draws = 0;
    buttons.forEach((b) => b.classList.remove('is-active', 'is-win', 'is-lose'));
    setResult('Scores reset. Pick a move to start.');
    saveState();
    paint();
  }

  function loadState() {
    const fallback = { you: 0, computer: 0, draws: 0 };
    try {
      const raw = window.RTUtils
        ? window.RTUtils.getLocalStorage(STORAGE_KEY, null)
        : JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && typeof raw === 'object') {
        return { you: num(raw.you), computer: num(raw.computer), draws: num(raw.draws) };
      }
    } catch (e) {
      console.error('Unable to load RPS state', e);
    }
    return fallback;
  }

  function saveState() {
    try {
      if (window.RTUtils) window.RTUtils.setLocalStorage(STORAGE_KEY, state);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Unable to save RPS state', e);
    }
  }

  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  }
})();
