/**
 * RTGamingHub Sound Utility — tiny WebAudio bleeps, no assets.
 * Respects `rtgaminghub-sound=off` and prefers-reduced-motion.
 */
(function () {
  'use strict';
  const KEY = 'rtgaminghub-sound';
  let ctx = null;

  function enabled() {
    try {
      if (localStorage.getItem(KEY) === 'off') return false;
    } catch (err) {
      if (err) return true;
    }
    return true;
  }

  function tone(freq, dur, type) {
    if (!enabled()) return;
    try {
      if (
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (err) {
      if (err && window.console) console.warn('Audio unavailable.');
    }
  }

  window.RTSound = {
    win: () => {
      tone(523, 0.15);
      setTimeout(() => tone(784, 0.2), 120);
    },
    lose: () => tone(196, 0.25, 'sawtooth'),
    draw: () => tone(330, 0.15, 'triangle'),
    click: () => tone(440, 0.07, 'square'),
    toggle: () => {
      try {
        const off = localStorage.getItem(KEY) === 'off';
        localStorage.setItem(KEY, off ? 'on' : 'off');
        return !off;
      } catch (_) {
        return true;
      }
    },
  };
})();
