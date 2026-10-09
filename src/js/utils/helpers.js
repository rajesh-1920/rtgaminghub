/**
 * Utility Helper Functions
 * Shared utilities for game development.
 * Works as ES module AND as global `window.RTUtils` for non-module scripts.
 */

/**
 * Generate a random integer between min and max (inclusive).
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export const getRandomNumber = (min, max) => {
  const lo = Math.ceil(Number(min));
  const hi = Math.floor(Number(max));
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    throw new TypeError('getRandomNumber: min and max must be finite numbers');
  }
  if (lo > hi) {
    throw new RangeError('getRandomNumber: min must be <= max');
  }
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};

/**
 * Pick a random item from an array.
 * @param {Array} arr
 * @returns {*} Random item or undefined for empty array
 */
export const pickRandom = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[getRandomNumber(0, arr.length - 1)];
};

/**
 * Check if device is mobile / coarse pointer.
 * Prefers matchMedia over UA sniffing, falls back to UA.
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  try {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      if (window.matchMedia('(pointer: coarse)').matches) return true;
    }
  } catch (_) {
    // ignore and fall back to UA
  }
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  return false;
};

/**
 * Store data in localStorage (JSON).
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} true on success
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('LocalStorage error:', error);
    return false;
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {*} fallback - Value if missing/corrupt
 * @returns {*} Retrieved value or fallback
 */
export const getLocalStorage = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error('LocalStorage error:', error);
    return fallback;
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
 * @returns {Promise<void>}
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Format score (never negative, locale-aware).
 * @param {number} score - Score value
 * @returns {string} Formatted score
 */
export const formatScore = (score) => {
  const n = Number(score);
  const safe = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  return safe.toLocaleString('en-US');
};

// Global fallback for plain <script> (non-module) game pages.
if (typeof window !== 'undefined') {
  window.RTUtils = {
    getRandomNumber,
    pickRandom,
    isMobileDevice,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    delay,
    formatScore,
  };
}
