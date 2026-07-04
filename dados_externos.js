// dados_externos.js
import { assetsData, ASSETS } from './state.js';

export async function proxyFetch(url) {
    const proxy = 'https://api.allorigins.win/raw?url=';
    const resp = await fetch(proxy + encodeURIComponent(url));
    if (!resp.ok) throw new Error('Proxy fetch failed');
    return resp.json();
}

export async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const resp = await fetch(url, options);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return await resp.json();
        } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(res => setTimeout(res, 1000 * (i + 1)));
        }
    }
}

export async function fetchBinanceCandles(symbol, interval, limit = 100) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const data = await fetchWithRetry(url);
    return data.map(c => ({
        time: c[0] / 1000, open: parseFloat(c[1]), high: parseFloat(c[2]), 
        low: parseFloat(c[3]), close: parseFloat(c[4]), volume: parseFloat(c[5])
    }));
}

export async function fetchMacroData() {
    // Lógica de busca no Yahoo Finance e Fears & Greed Index
}

export function connectWebSocket() {
    // Lógica original do WebSocket da Binance que atualiza os preços e o liqMap em tempo real
}
