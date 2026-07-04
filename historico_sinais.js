// banco_dados.js
export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key, fallback = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
}

// historico_sinais.js
import { saveData, loadData } from './banco_dados.js';

export function addSignalToHistory(signal) {
    const history = loadData('alertLog', []);
    history.push(signal);
    saveData('alertLog', history.slice(-50)); // Mantém últimos 50
}

export function getSignalHistory() {
    return loadData('alertLog', []);
}

export const signalCooldown = {
    lastSignalTime: {},
    lastSignalPrice: {},
    cooldownPeriod: 300000,
    priceThreshold: 0.01,
    canSignal(symbol, currentPrice) {
        const now = Date.now();
        const lastTime = this.lastSignalTime[symbol] || 0;
        const lastPrice = this.lastSignalPrice[symbol] || 0;
        if (now - lastTime < this.cooldownPeriod) {
            const priceChange = Math.abs(currentPrice - lastPrice) / lastPrice;
            if (priceChange < this.priceThreshold) return false;
        }
        return true;
    },
    recordSignal(symbol, price) {
        this.lastSignalTime[symbol] = Date.now();
        this.lastSignalPrice[symbol] = price;
    }
};
