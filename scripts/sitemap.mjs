/** Generate sitemap.xml from games.json + static routes */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const gamesFile = join(root, 'public/data/games.json');
const outFile = join(root, 'public/sitemap.xml');
const baseUrl = process.env.SITE_URL || 'https://yourusername.github.io/rtgaminghub';

const gamesRaw = readFileSync(gamesFile, 'utf8');
const gamesData = JSON.parse(gamesRaw);
const games = Array.isArray(gamesData) ? gamesData : gamesData.games;

const today = new Date().toISOString().split('T')[0];
const urls = [
  { url: baseUrl + '/', changefreq: 'weekly', priority: '1.0' },
  { url: baseUrl + '/index.html', changefreq: 'weekly', priority: '0.9' },
];

for (const g of games) {
  if (g.path) {
    const p = g.path.replace(/^\.\//, '');
    urls.push({ url: baseUrl + '/' + p, changefreq: 'monthly', priority: '0.8' });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(outFile, xml);