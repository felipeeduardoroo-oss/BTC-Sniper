// state.js
export const ASSETS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

export let assetsData = {};
ASSETS.forEach(symbol => {
    assetsData[symbol] = {
        price: 0, candles1H: [], candles4H: [], candles1D: [],
        ema50_1H: 0, ema200_4H: 0, rsi_1H: 50, atr_1H: 0,
        atrHistory: [], swingHighs: [], swingLows: [], currentBOS: 'NEUTRAL', mtfTrend: 'NEUTRAL',
        oiDelta: 0, volumeRel: 1.0, rsiState: { avgGain: 0, avgLoss: 0, rsi: 50 },
        bbWidth: 0.1, volumeAvg: 0, currentVolume: 0, fundingRate: 0, trend4H: 'NEUTRAL', trend1D: 'NEUTRAL',
        mvrv: 1.2, sopr: 0.95, realizedPrice: 53600,
        htfStructure: { bias: 'NEUTRAL', lastSwingHigh: 0, lastSwingLow: Infinity }, mtfConfluence: null
    };
});

export let activePositions = {};
export let alertCooldowns = {};
export let telegramStatus = 'online';
export let scoreHistory = [];
export let previousScores = { 'BTCUSDT': 50, 'ETHUSDT': 50, 'SOLUSDT': 50 };
export let liqMap = { 'BTCUSDT': { longs: 0, shorts: 0 }, 'ETHUSDT': { longs: 0, shorts: 0 }, 'SOLUSDT': { longs: 0, shorts: 0 } };

// Funções helpers globais
export function getCurrentTimestamp() {
    return new Date().toLocaleString('pt-BR');
}
