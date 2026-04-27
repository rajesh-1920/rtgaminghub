/**
 * Utility Helper Functions
 * Shared utilities for game development
 */

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Store data in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage error:', error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {*} Retrieved value or null
 */
export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('LocalStorage error:', error);
    return null;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('LocalStorage error:', error);
  }
};

/**
 * Delay function for async operations
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Format score with proper formatting
 * @param {number} score - Score value
 * @returns {string} Formatted score
 */
export const formatScore = (score) => {
  return Math.max(0, score).toString();
};
