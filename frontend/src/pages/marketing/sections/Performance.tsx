// src/pages/marketing/sections/Performance.tsx
import React from "react";
import ultraChart from "../../../assets/performanceChart.png";
import proChart from "../../../assets/performanceChart.png";

interface PerformanceProps {
  plan: "ultra" | "pro";
}

const performanceData = {
  ultra: {
    chart: ultraChart,
    winRate: "62.4%",
    avgTrades: "3.2/day",
    backtestSize: "10,000+ trades",
    maxDrawdown: "-8.1%",
  },
  pro: {
    chart: proChart,
    winRate: "71.2%",
    avgTrades: "6.7/day",
    backtestSize: "16,000+ trades",
    maxDrawdown: "-5.4%",
  },
};

export default function Performance({ plan }: PerformanceProps) {
  const data = performanceData[plan];

  return (
    <section className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 glow">Backtest Performance</h2>
        <p className="text-gray-400 mb-8">
          Proof of logic. Engineered edge. Transparent stats.
        </p>

        <img
          src={data.chart}
          alt={`Backtest chart for ${plan}`}
          className="w-full max-w-3xl mx-auto rounded-xl shadow-xl mb-10"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base text-center">
          <div className="bg-zinc-800 rounded-xl py-4">
            <div className="text-xl font-bold text-crimson">{data.winRate}</div>
            <div className="text-gray-400">Win Rate</div>
          </div>
          <div className="bg-zinc-800 rounded-xl py-4">
            <div className="text-xl font-bold">{data.avgTrades}</div>
            <div className="text-gray-400">Avg Trades/Day</div>
          </div>
          <div className="bg-zinc-800 rounded-xl py-4">
            <div className="text-xl font-bold">{data.backtestSize}</div>
            <div className="text-gray-400">Backtest Sample</div>
          </div>
          <div className="bg-zinc-800 rounded-xl py-4">
            <div className="text-xl font-bold">{data.maxDrawdown}</div>
            <div className="text-gray-400">Max Drawdown</div>
          </div>
        </div>
      </div>
    </section>
  );
}
