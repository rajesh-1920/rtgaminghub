/**
 * RTGamingHub - Main Application File
 * Handles navigation, game loading, and global functionality.
 * Uses progressive enhancement: static cards work without JS.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  });

  function initializeApp() {
    setupEventListeners();
    loadGamesData();
    setupFooterYear();
  }

  /**
   * Enhance game cards: validate links, add keyboard support.
   * Do NOT preventDefault — allow normal anchor navigation,
   * middle-click, and open-in-new-tab to keep working.
   */
  function setupEventListeners() {
    const gameCards = document.querySelectorAll('[data-game-link]');

    gameCards.forEach((card) => {
      const link = card.getAttribute('data-game-link') || card.getAttribute('href');
      if (!link) {
        card.setAttribute('aria-disabled', 'true');
        return;
      }
      // Make non-anchor cards keyboard accessible
      if (card.tagName !== 'A' && !card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToGame(link);
          }
        });
      }
    });
  }

  function navigateToGame(gamePath) {
    if (!gamePath) return;
    window.location.href = gamePath;
  }

  /**
   * Load games metadata for health-check + future dynamic rendering.
   * Fails silently in UI (static cards remain), warns in console only on error.
   */
  async function loadGamesData() {
    try {
      const response = await fetch('./public/data/games.json', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      const data = await response.json();
      const games = Array.isArray(data) ? data : data.games;
      if (!Array.isArray(games)) return;
      // Store for other scripts / search-filter (Phase 2)
      window.RTGames = games;
      document.dispatchEvent(new CustomEvent('rt:games-loaded', { detail: games }));
    } catch (error) {
      // Static cards are the fallback — no intrusive UI needed.
      if (window.console && console.warn) {
        console.warn('Games metadata unavailable, using static cards.', error);
      }
    }
  }

  function setupFooterYear() {
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  // Expose minimal API for game pages
  window.RTHub = {
    navigateToGame,
    goBackToHome: () => {
      window.location.href = './index.html';
    },
  };

  function goBackToHome() {
    window.RTHub.goBackToHome();
  }
  window.goBackToHome = goBackToHome;
})();
