// indicador.js

export function calculateEMA(data, period) {
    if (data.length < period) return null;
    const k = 2 / (period + 1);
    let ema = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
    for (let i = period; i < data.length; i++) {
        ema = (data[i] - ema) * k + ema;
    }
    return ema;
}

export function calculateRSI(closes, period = 14) {
    if (closes.length < period + 1) return 50;
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
        const diff = closes[i] - closes[i - 1];
        if (diff >= 0) gains += diff; else losses -= diff;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    for (let i = period + 1; i < closes.length; i++) {
        const diff = closes[i] - closes[i - 1];
        avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
        avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
    }
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

export function calculateATR(candles, period = 14) {
    if (candles.length < 2) return 0;
    let atr = 0;
    // Lógica do ATR
    return atr;
}

export function detectSwingPoints(candles) {
    // Lógica de detecção de topos e fundos (swingHighs, swingLows)
}

export function checkBreakOfStructure(candles, swingHighs, swingLows) {
    // Lógica BOS e SMC
}
