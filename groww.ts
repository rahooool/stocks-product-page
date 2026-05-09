// Thin client for the Groww MCP via the local proxy (mcp-proxy.mjs).
// All calls go through http://localhost:8082/groww which forwards JSON-RPC
// to the upstream MCP and unwraps SSE responses.

import { Platform } from 'react-native';

const PROXY = Platform.OS === 'web'
  ? 'http://localhost:8082/groww'
  : null; // native cannot reach the dev proxy from a device — caller falls back

export interface LtpRow {
  symbol: string;
  ltp: number;
  day_change: number;
  day_change_perc: number;
  open: number;
  high: number;
  low: number;
  prev_close: number;
}

/** Returns a map of `<EXCHANGE>-<COMPANY>` → LtpRow for the requested symbols. */
export async function getLtp(searchQueries: string[]): Promise<Record<string, LtpRow>> {
  if (!PROXY) return {};
  const res = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: 'get_ltp',
        arguments: { search_queries: searchQueries, segment: 'CASH' },
      },
    }),
  });
  if (!res.ok) throw new Error(`Groww LTP HTTP ${res.status}`);
  const json = await res.json();
  const sc = json?.result?.structuredContent?.result?.ltp_results;
  if (sc) return sc;
  // Fallback: parse the text content blob
  const txt = json?.result?.content?.[0]?.text;
  if (typeof txt === 'string') {
    try {
      const parsed = JSON.parse(txt);
      return parsed?.result?.ltp_results ?? {};
    } catch {/* swallow */}
  }
  return {};
}

/** Resolve a single ticker (e.g. "ETERNAL") to the NSE LTP row. */
export function pickNseRow(rows: Record<string, LtpRow>, ticker: string): LtpRow | undefined {
  for (const k of Object.keys(rows)) {
    if (k.startsWith('NSE-') && rows[k]?.symbol === ticker) return rows[k];
  }
  return undefined;
}
