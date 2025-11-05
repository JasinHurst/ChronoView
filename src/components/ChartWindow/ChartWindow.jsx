import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import './ChartWindow.css';

const ChartWindow = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // ✅ create chart
    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: '#1f1f1f' },
        textColor: '#fbf2f2',
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
    });

    chartRef.current = chart;

    // ✅ add candle data
    const series = chart.addCandlestickSeries({
      upColor: '#0f0',
      downColor: '#f00',
      wickUpColor: '#0f0',
      wickDownColor: '#f00',
      borderVisible: false,
    });

    // ✅ sample candles
    series.setData([
      { time: '2024-11-01', open: 184, high: 188, low: 182, close: 187 },
      { time: '2024-11-02', open: 187, high: 189, low: 184, close: 185 },
      { time: '2024-11-03', open: 185, high: 190, low: 183, close: 189 },
      { time: '2024-11-04', open: 189, high: 191, low: 187, close: 188 },
    ]);

    // ✅ resize observer
    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="chart-window">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default ChartWindow;
