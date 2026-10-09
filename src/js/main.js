/**
 * RTGamingHub - Main Application File
 * Dynamic game grid + search + theme toggle. Progressive enhancement.
 */
(function () {
  'use strict';

  const GRADIENTS = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-orange-400 to-red-600',
    'from-green-400 to-teal-600',
    'from-pink-400 to-rose-600',
    'from-indigo-400 to-blue-600',
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  });

  function initializeApp() {
    setupFooterYear();
    setupThemeToggle();
    loadGamesData();
    setupSearch();
  }

  function navigateToGame(gamePath) {
    if (!gamePath) return;
    window.location.href = gamePath;
  }

  async function loadGamesData() {
    const grid = document.getElementById('games-grid');
    try {
      const response = await fetch('./public/data/games.json', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      const games = Array.isArray(data) ? data : data.games;
      if (!Array.isArray(games)) throw new Error('Invalid games.json');
      window.RTGames = games;
      if (grid) renderGames(grid, games);
      document.dispatchEvent(new CustomEvent('rt:games-loaded', { detail: games }));
    } catch (error) {
      if (window.console && console.warn) console.warn('Games metadata unavailable.', error);
      // Fallback: keep any static cards; if grid empty show message
      if (grid && grid.children.length === 0) {
        grid.innerHTML =
          '<p class="col-span-full text-center text-gray-500">Unable to load games. Please refresh.</p>';
      }
    }
  }

  function renderGames(grid, games) {
    grid.innerHTML = '';
    games.forEach((game, i) => {
      const card = document.createElement('a');
      card.href = game.path;
      card.className = 'game-card group';
      card.setAttribute('data-game-link', game.path);
      card.setAttribute(
        'data-search',
        [game.name, game.description, game.category, game.difficulty].join(' ').toLowerCase()
      );
      const gradient = GRADIENTS[i % GRADIENTS.length];
      const playersLabel = game.players === '1' ? '1 Player' : game.players + ' Players';

      const visual = document.createElement('div');
      visual.className =
        'relative h-48 bg-gradient-to-br ' +
        gradient +
        ' flex items-center justify-center overflow-hidden';
      const emoji = document.createElement('div');
      emoji.className = 'text-8xl group-hover:scale-125 transition-transform duration-300';
      emoji.textContent = game.icon || '🎮';
      emoji.setAttribute('aria-hidden', 'true');
      visual.appendChild(emoji);

      const content = document.createElement('div');
      content.className = 'game-card-content';
      const title = document.createElement('h3');
      title.className = 'game-card-title';
      title.textContent = game.name;
      const desc = document.createElement('p');
      desc.className = 'game-card-description';
      desc.textContent = game.description;
      const meta = document.createElement('div');
      meta.className = 'flex justify-between items-center text-sm text-gray-500';
      const left = document.createElement('span');
      left.textContent = (game.players === '1' ? '👤 ' : '👥 ') + playersLabel;
      const right = document.createElement('span');
      right.textContent = '⭐ ' + game.difficulty;
      meta.append(left, right);
      content.append(title, desc, meta);
      card.append(visual, content);
      grid.appendChild(card);
    });
  }

  function setupSearch() {
    const input = document.getElementById('game-search');
    const grid = document.getElementById('games-grid');
    const empty = document.getElementById('game-empty');
    if (!input || !grid) return;
    const apply = () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      grid.querySelectorAll('[data-search]').forEach((card) => {
        const hit = !q || card.getAttribute('data-search').includes(q);
        card.style.display = hit ? '' : 'none';
        if (hit) visible += 1;
      });
      if (empty) empty.classList.toggle('hidden', visible !== 0);
    };
    input.addEventListener('input', apply);
    document.addEventListener('rt:games-loaded', apply);
  }

  function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const KEY = 'rtgaminghub-theme';
    const apply = (theme) => {
      const dark = theme === 'dark';
      document.body.classList.toggle('dark', dark);
      document.body.classList.toggle('from-slate-50', !dark);
      document.body.classList.toggle('to-slate-100', !dark);
      document.body.classList.toggle('bg-slate-900', dark);
      if (btn) btn.textContent = dark ? '☀️' : '🌙';
      try {
        localStorage.setItem(KEY, theme);
      } catch (err) {
        if (err && window.console) console.warn('Theme persistence unavailable.');
      }
    };
    let initial = 'light';
    try {
      initial = localStorage.getItem(KEY) || 'light';
    } catch (err) {
      if (err && window.console) console.warn('Theme read unavailable.');
    }
    apply(initial);
    if (btn)
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark');
        apply(isDark ? 'light' : 'dark');
      });
  }

  function setupFooterYear() {
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  window.RTHub = {
    navigateToGame,
    goBackToHome: () => {
      window.location.href = './index.html';
    },
  };
  window.goBackToHome = window.RTHub.goBackToHome;
})();
