// src/components/charts/TradingViewDeck.tsx
import { useRef, useState } from "react";
import TradingViewTile from "./TradingViewTile";
import UltraBrainDashboard from "../dashboard/UltraBrainDashboard";

export default function TradingViewDeck() {
  const [symbol, setSymbol] = useState<string>("BINANCE:BTCUSDT");
  const [interval, setInterval] = useState<string>("60");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const chartRef = useRef<HTMLDivElement | null>(null);

  const assetOptions: string[] = [
    "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:SOLUSDT", "BINANCE:XRPUSDT",
    "NASDAQ:AAPL", "NASDAQ:TSLA", "NASDAQ:AMZN", "NASDAQ:MSFT", "NASDAQ:NVDA",
    "FX:EURUSD", "FX:GBPUSD", "FX:USDJPY", "FX:AUDUSD",
    "CME_MINI:ES1!", "CME_MINI:NQ1!", "CME_MINI:YM1!",
  ];

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleRefresh = () => {
    const old = symbol;
    setSymbol("");
    setTimeout(() => setSymbol(old), 50);
  };

  const handleFullscreen = () => {
    chartRef.current?.requestFullscreen();
  };

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <label className="text-white text-sm">
          Symbol:
          <select
            title="Select asset"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="ml-2 bg-black text-white p-2 rounded border border-gray-600"
          >
            {assetOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="text-white text-sm">
          Interval:
          <select
            title="Select interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="ml-2 bg-black text-white p-2 rounded border border-gray-600"
          >
            <option value="1">1m</option>
            <option value="5">5m</option>
            <option value="15">15m</option>
            <option value="30">30m</option>
            <option value="60">1h</option>
            <option value="240">4h</option>
            <option value="D">1D</option>
            <option value="W">1W</option>
          </select>
        </label>

        <button
          onClick={handleThemeToggle}
          className="text-sm bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded"
        >
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          onClick={handleRefresh}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
        >
          🔁 Refresh
        </button>

        <button
          onClick={handleFullscreen}
          className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
        >
          ⛶ Fullscreen
        </button>
      </div>

      {/* Chart Area */}
      <div
        ref={chartRef}
        className="bg-black rounded shadow overflow-hidden min-h-[600px] h-[80vh]"
      >
        {symbol && (
          <TradingViewTile
            defaultSymbol={symbol}
            interval={interval}
            theme={theme}
            chartType="advanced"
          />
        )}
      </div>
    </div>
  );
}
<UltraBrainDashboard />