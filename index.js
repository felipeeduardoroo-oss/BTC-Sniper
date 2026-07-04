// index.js
import { assetsData, ASSETS, previousScores, scoreHistory } from './state.js';
import { fetchBinanceCandles, connectWebSocket, fetchMacroData } from './dados_externos.js';
import { calculateEMA, calculateRSI, detectSwingPoints } from './indicador.js';
import { initCandleChart, updateCandleData, initLineChart } from './graficos.js';
import { sendTradeAlert, updateTelegramUI } from './telegram.js';
import { addSignalToHistory, signalCooldown } from './historico_sinais.js';
import { runBacktest } from './backteste.js';

// Inicialização do Painel
let charts = {};

async function init() {
    console.log("V2 Engine Initializing...");
    updateTelegramUI();
    
    // Inicializar Gráficos
    charts['btc'] = initCandleChart('candle-btc');
    charts['eth'] = initCandleChart('candle-eth');
    charts['sol'] = initCandleChart('candle-sol');
    
    // Buscar dados iniciais
    await loadInitialData();
    
    // Conectar WebSockets
    connectWebSocket();

    // Listeners
    document.getElementById('test-telegram-btn')?.addEventListener('click', () => {
        sendTradeAlert('BTCUSDT', 'long', 85, 65000, 63000, [{price: 68000, rr: 1.5}, {price: 71000, rr: 3}], 'Teste Manual', 1.0, null);
    });
}

async function loadInitialData() {
    for (const symbol of ASSETS) {
        try {
            const candles1H = await fetchBinanceCandles(symbol, '1h');
            assetsData[symbol].candles1H = candles1H;
            updateCandleData(charts[symbol.toLowerCase()]?.candleSeries, candles1H);
            
            // Cálculo de Indicadores
            const closes = candles1H.map(c => c.close);
            assetsData[symbol].ema50_1H = calculateEMA(closes, 50);
            assetsData[symbol].rsi_1H = calculateRSI(closes);
            
        } catch (e) {
            console.error(`Erro ao carregar ${symbol}:`, e);
        }
    }
    await fetchMacroData();
}

// Iniciar
document.addEventListener('DOMContentLoaded', init);
