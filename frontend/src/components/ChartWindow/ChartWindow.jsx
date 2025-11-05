import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import "./ChartWindow.css";

const ChartWindow = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const [symbol, setSymbol] = useState("SPX");
  const [interval, setInterval] = useState("1d");
  const [range, setRange] = useState("6mo");

  // Create chart only once
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        background: { color: "#1f1f1f" },
        textColor: "#fbf2f2",
      },
      grid: {
        vertLines: { color: "#2a2a2a" },
        horzLines: { color: "#2a2a2a" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#0ce475",
      borderUpColor: "#0ce475",
      wickUpColor: "#0ce475",
      downColor: "#f7052d",
      borderDownColor: "#f7052d",
      wickDownColor: "#f7052d",
    });

    chartRef.current = { chart, candleSeries };

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, []);

  // Fetch data when symbol, interval, or range changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/history?symbol=${symbol}&interval=${interval}&range=${range}`
        );
        const data = await res.json();
        if (chartRef.current && data && Array.isArray(data)) {
          chartRef.current.candleSeries.setData(data);
        }
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };
    fetchData();
  }, [symbol, interval, range]);

  return (
    <div className="chart-wrapper">
      <div className="chart-toolbar">
        <input
          className="symbol-input"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol (e.g. AAPL, SPX, BTC-USD)"
        />
        <select
          className="chart-select"
          onChange={(e) => setInterval(e.target.value)}
          value={interval}
        >
          <option value="1m">1m</option>
          <option value="5m">5m</option>
          <option value="1h">1h</option>
          <option value="1d">1d</option>
          <option value="1wk">1wk</option>
        </select>
        <select
          className="chart-select"
          onChange={(e) => setRange(e.target.value)}
          value={range}
        >
          <option value="1mo">1M</option>
          <option value="3mo">3M</option>
          <option value="6mo">6M</option>
          <option value="1y">1Y</option>
          <option value="5y">5Y</option>
          <option value="max">Max</option>
        </select>
      </div>

      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default ChartWindow;
