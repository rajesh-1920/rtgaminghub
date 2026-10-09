/** Repo validator: games.json schema + required files + images + docs + PWA */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0, warned = 0;
const fail = (m) => { process.stderr.write('FAIL: ' + m + '\n'); failed += 1; };
const warn = (m) => { process.stderr.write('WARN: ' + m + '\n'); warned += 1; };
const ok = (m) => { process.stdout.write('OK: ' + m + '\n'); };

const required = [
  'index.html',
  'src/js/main.js',
  'src/js/utils/helpers.js',
  'src/js/sound.js',
  'src/css/input.css',
  'src/css/main.css',
  'public/data/games.json',
  'public/manifest.json',
  'public/sitemap.xml',
  'robots.txt',
  'sw.js',
  'offline.html',
  '404.html',
];
for (const f of required) {
  if (!existsSync(join(root, f))) fail(`missing ${f}`);
  else ok(`found ${f}`);
}

// Validate games.json
try {
  const raw = readFileSync(join(root, 'public/data/games.json'), 'utf8');
  const data = JSON.parse(raw);
  const games = Array.isArray(data) ? data : data.games;
  if (!Array.isArray(games) || games.length === 0) fail('games.json has no games');
  else {
    const ids = new Set();
    const categories = new Set(['strategy', 'chance', 'action', 'puzzle']);
    const difficulties = new Set(['Easy', 'Medium', 'Hard']);
    for (const g of games) {
      if (!g.id) fail('game missing id');
      else if (ids.has(g.id)) fail(`duplicate game id: ${g.id}`);
      else ids.add(g.id);
      for (const k of ['name', 'description', 'path', 'icon', 'category', 'players', 'difficulty', 'image']) {
        if (!g[k]) fail(`game ${g.id} missing ${k}`);
      }
      if (g.category && !categories.has(g.category)) warn(`game ${g.id} unknown category: ${g.category}`);
      if (g.difficulty && !difficulties.has(g.difficulty)) warn(`game ${g.id} unknown difficulty: ${g.difficulty}`);
      const p = join(root, g.path.replace(/^\.\//, ''));
      if (!existsSync(p)) fail(`game path missing: ${g.path}`);
      if (g.image) {
        const imgPath = join(root, g.image.replace(/^\.\//, ''));
        if (!existsSync(imgPath)) fail(`game ${g.id} image missing: ${g.image}`);
      }
    }
    ok(`${games.length} games validated`);
  }
} catch (e) {
  fail('games.json parse: ' + e.message);
}

// Check per-game READMEs
const gamesDir = join(root, 'games');
if (existsSync(gamesDir)) {
  for (const g of readdirSync(gamesDir)) {
    const readme = join(gamesDir, g, 'README.md');
    if (existsSync(readme)) {
      const size = readFileSync(readme, 'utf8').trim().length;
      if (size < 100) warn(`games/${g}/README.md very short (${size} chars)`);
      else ok(`games/${g}/README.md present`);
    } else {
      warn(`games/${g}/README.md missing`);
    }
  }
}

// Validate manifest.json basic structure
try {
  const mf = JSON.parse(readFileSync(join(root, 'public/manifest.json'), 'utf8'));
  if (!mf.shortcuts || mf.shortcuts.length === 0) warn('manifest.json missing shortcuts');
  if (!mf.icons || mf.icons.length === 0) warn('manifest.json missing icons');
  ok('manifest.json structure valid');
} catch (e) {
  fail('manifest.json parse: ' + e.message);
}

// Validate sitemap.xml exists and has entries
try {
  const sm = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
  const urls = (sm.match(/<loc>/g) || []).length;
  if (urls < 2) warn('sitemap.xml has few URLs');
  else ok(`sitemap.xml has ${urls} URLs`);
} catch (e) {
  fail('sitemap.xml: ' + e.message);
}

// Validate public/images has all game images
try {
  const imgs = readdirSync(join(root, 'public/images')).filter(f => f.endsWith('.webp'));
  ok(`public/images: ${imgs.length} WebP files`);
} catch (e) {
  warn('public/images check: ' + e.message);
}

// No node_modules in repo
if (existsSync(join(root, 'node_modules'))) warn('node_modules present (should be ignored)');

if (failed > 0) {
  process.stderr.write(`${failed} error(s), ${warned} warning(s)\n`);
  process.exit(1);
} else {
  process.stdout.write(`All checks passed (${warned} warnings)\n`);
}