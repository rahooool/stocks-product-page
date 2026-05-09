// Unified dev-server proxy.
//   /yf/...       -> Yahoo Finance (charts)
//   /groww        -> Groww MCP JSON-RPC (quotes, symbols)
//   /             -> health check
//
// Run alongside Expo: node mcp-proxy.mjs   (auto-started by `npm start` if used)

import http from 'http';
import https from 'https';

const PORT = process.env.MCP_PROXY_PORT ? Number(process.env.MCP_PROXY_PORT) : 8082;
const GROWW_MCP_URL = process.env.GROWW_MCP_URL || 'http://10.154.66.209:5002/internal/v2/mcp/';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

http.createServer(async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url || '/';

  // Health check
  if (url === '/' || url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, groww: GROWW_MCP_URL }));
    return;
  }

  // Yahoo Finance
  if (url.startsWith('/v8/') || url.startsWith('/yf/')) {
    const path = url.startsWith('/yf/') ? url.slice(3) : url;
    const target = `https://query1.finance.yahoo.com${path}`;
    https.get(target, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      res.writeHead(r.statusCode || 502, { 'Content-Type': 'application/json' });
      r.pipe(res);
    }).on('error', (e) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    });
    return;
  }

  // Groww MCP — POST forwards JSON-RPC body, parses SSE response, returns clean JSON
  if (url.startsWith('/groww')) {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'POST only' }));
      return;
    }
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const u = new URL(GROWW_MCP_URL);
      const opts = {
        hostname: u.hostname,
        port: u.port || 80,
        path: u.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          'Content-Length': Buffer.byteLength(body),
        },
      };
      const lib = u.protocol === 'https:' ? https : http;
      const upstream = lib.request(opts, (r) => {
        let raw = '';
        r.on('data', (c) => (raw += c));
        r.on('end', () => {
          // Parse SSE if needed
          let payload = raw;
          const m = raw.match(/^data: (.+)$/m);
          if (m) payload = m[1];
          res.writeHead(r.statusCode || 502, { 'Content-Type': 'application/json' });
          res.end(payload);
        });
      });
      upstream.on('error', (e) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      });
      upstream.write(body);
      upstream.end();
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'unknown route', url }));
}).listen(PORT, () => console.log(`MCP/YF proxy on http://localhost:${PORT} (Groww: ${GROWW_MCP_URL})`));
