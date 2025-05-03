import React from "react";

import { useState } from "react";
import TradingViewTile from "./charts/TradingViewTile"; // adjust if needed

const strategyPresets = {
  ultra: "CME_MINI:ES1!",
  pro: "BINANCE:BTCUSDT",
  scalptr: "FX:EURUSD",
  snyder: "NASDAQ:AAPL",
  xrp: "BINANCE:XRPUSDT",
};

const strategyLabels = {
  ultra: "ULTRA+",
  pro: "ULTRA PRO+",
  scalptr: "Scalptr",
  snyder: "Snyder",
  ARMOR: "A.R.M.O.R.",
};

export default function StrategyTabs() {
  const [active, setActive] = useState<keyof typeof strategyPresets>("ultra");

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(strategyPresets).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key as keyof typeof strategyPresets)}
            className={`px-4 py-2 rounded-xl font-bold ${
              active === key ? "bg-white text-black" : "bg-zinc-800 text-white"
            }`}
          >
            {strategyLabels[key as keyof typeof strategyLabels]}
          </button>
        ))}
      </div>

      <TradingViewTile defaultSymbol={strategyPresets[active]} />
    </div>
  );
}
