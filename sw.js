/* RTGamingHub Service Worker — cache-first for offline play, scope: / */
const CACHE = 'rtgaminghub-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './src/css/main.css',
  './src/js/main.js',
  './src/js/sound.js',
  './public/data/games.json',
  './public/manifest.json',
];

async function precacheAll() {
  const cache = await caches.open(CACHE);
  await cache.addAll(CORE_ASSETS);
  try {
    const res = await fetch('./public/data/games.json');
    const data = await res.json();
    const games = Array.isArray(data) ? data : data.games;
    for (const g of games) {
      if (g.path) {
        const path = g.path.replace(/^\.\//, '');
        await cache.add('./' + path);
      }
    }
  } catch (err) {
    // ignore precache failures
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(precacheAll().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.destination === 'document') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./offline.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
