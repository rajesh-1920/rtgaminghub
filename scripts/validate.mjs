/** Simple repo validator: games.json schema + required files. */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
const fail = (m) => {
  console.error('FAIL:', m);
  failed += 1;
};
const ok = (m) => console.log('OK:', m);

const required = [
  'index.html',
  'src/js/main.js',
  'src/js/utils/helpers.js',
  'src/css/input.css',
  'src/css/main.css',
  'public/data/games.json',
  'public/manifest.json',
];
for (const f of required) {
  if (!existsSync(join(root, f))) fail(`missing ${f}`);
  else ok(`found ${f}`);
}

try {
  const raw = readFileSync(join(root, 'public/data/games.json'), 'utf8');
  const data = JSON.parse(raw);
  const games = Array.isArray(data) ? data : data.games;
  if (!Array.isArray(games) || games.length === 0) fail('games.json has no games');
  else {
    for (const g of games) {
      for (const k of ['id', 'name', 'description', 'path', 'difficulty']) {
        if (!g[k]) fail(`game ${g.id || '?'} missing ${k}`);
      }
      const p = join(root, g.path.replace(/^\.\//, ''));
      if (!existsSync(p)) fail(`game path missing: ${g.path}`);
    }
    ok(`${games.length} games validated`);
  }
} catch (e) {
  fail('games.json parse: ' + e.message);
}

if (failed > 0) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
} else {
  console.log('All checks passed');
}
