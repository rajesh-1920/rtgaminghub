/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './404.html',
    './offline.html',
    './src/**/*.{js,jsx}',
    './scripts/**/*.{js,mjs}',
    './games/**/*.{html,js}',
    './public/**/*.{html,json,js}',
    './sw.js',
  ],
  safelist: [
    'animate-fade-in-up',
    'btn-primary',
    'btn-secondary',
    'game-card',
    'game-card-image',
    'game-card-content',
    'game-card-title',
    'game-card-description',
    'section-title',
    'container-lg',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
