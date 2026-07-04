// graficos.js
export function initCandleChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    const chart = LightweightCharts.createChart(container, {
        width: container.clientWidth, height: 220,
        layout: { background: { color: '#0f1117' }, textColor: '#d1d4dc' },
        grid: { vertLines: { color: 'rgba(42, 46, 57, 0.3)' }, horzLines: { color: 'rgba(42, 46, 57, 0.3)' } },
    });
    const candleSeries = chart.addCandlestickSeries({
        upColor: '#00e896', downColor: '#ff4d6d', borderDownColor: '#ff4d6d', borderUpColor: '#00e896',
        wickDownColor: '#ff4d6d', wickUpColor: '#00e896'
    });
    return { chart, candleSeries };
}

export function updateCandleData(series, data) {
    if (series) series.setData(data);
}

export function initLineChart(canvasId) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    // Configuração do Chart.js (Score, ETF, Macro)
    return new Chart(ctx, { /* config original */ });
}
