/**
 * RTGamingHub - Main Application File
 * Handles navigation, game loading, and global functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
  loadGamesData();
}

/**
 * Setup event listeners for navigation and interactive elements
 */
function setupEventListeners() {
  const gameCards = document.querySelectorAll('[data-game-link]');
  
  gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToGame(card.dataset.gameLink);
    });
  });
}

/**
 * Navigate to a specific game
 * @param {string} gamePath - Path to the game
 */
function navigateToGame(gamePath) {
  window.location.href = gamePath;
}

/**
 * Load games data from JSON file
 */
async function loadGamesData() {
  try {
    const response = await fetch('./public/data/games.json');
    const games = await response.json();
    // Games data loaded successfully
    console.log('Games data loaded:', games);
  } catch (error) {
    console.error('Error loading games data:', error);
  }
}

/**
 * Utility function to go back to home
 */
function goBackToHome() {
  window.location.href = './';
}
