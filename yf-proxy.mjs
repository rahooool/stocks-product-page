// Simple Yahoo Finance CORS proxy for local development.
// Run alongside the Expo dev server: node yf-proxy.mjs
// Then set EXPO_PUBLIC_YF_PROXY=http://localhost:8082 (or just use the default).

import http from 'http';
import https from 'https';

const PORT = 8082;

http.createServer((req, res) => {
  // Allow requests from the Expo dev server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const target = `https://query1.finance.yahoo.com${req.url}`;
  https.get(target, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (proxy) => {
    res.writeHead(proxy.statusCode, { 'Content-Type': 'application/json' });
    proxy.pipe(res);
  }).on('error', (e) => {
    res.writeHead(502);
    res.end(JSON.stringify({ error: e.message }));
  });
}).listen(PORT, () => console.log(`YF proxy listening on http://localhost:${PORT}`));
