const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = process.argv.includes('--dist') ? path.join(__dirname, 'dist') : __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  if (pathname === '/') pathname = '/index.html';
  const allowed = ['/index.html', '/styles.css', '/script.js', '/robots.txt', '/sitemap.xml', '/404.html'];
  const target = path.resolve(root, '.' + pathname);
  if ((!allowed.includes(pathname) && !pathname.startsWith('/assets/')) || !target.startsWith(root + path.sep)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(fs.readFileSync(path.join(root, '404.html'))); return;
  }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(fs.readFileSync(path.join(root, '404.html'))); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
