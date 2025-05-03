// src/pages/ChartStation.tsx
import React, { useEffect } from "react";
import withAuth from "../utils/withAuth";
import TradingViewTile from "../components/charts/TradingViewTile";
import TradingViewDeck from "../components/charts/TradingViewDeck";

useEffect(() => {
  const API = import.meta.env.VITE_API_URL;
  fetch(`${API}/dashboard`, {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      // handle data
    });
}, []);

function ChartStation() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-green-400">📊 Chart Station</h1>

      <div className="bg-white shadow rounded p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-green-600">🧠 BTC Market Chart</h2>
        <TradingViewTile defaultSymbol="BINANCE:BTCUSDT" />
      </div>

      <div className="bg-white shadow rounded p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">🧩 Chart Deck (Multiple)</h2>
        <TradingViewDeck />
      </div>

      {/* 🔍 FAQ */}
      <div className="bg-zinc-900 shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">❓ Common Charting Questions</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
          <li>What timeframe should I use for scalping?</li>
          <li>What does the AI consider before triggering a long or short?</li>
          <li>How do macro filters affect the signal timing?</li>
          <li>Why is BTC chart used as the default?</li>
          <li>Can I monitor NASDAQ, Forex, and Crypto all at once?</li>
          <li>How does the chart theme affect analysis?</li>
          <li>Why does the chart sometimes reset on refresh?</li>
          <li>How does TradingView decide what data to stream live?</li>
          <li>What does “interval: 60” mean in the embed?</li>
          <li>Can I expand a single chart to full screen?</li>
        </ul>
      </div>
    </div>
  );
}

export default withAuth(ChartStation);
