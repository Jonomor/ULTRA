import { useEffect, useState } from "react";

const symbols = ["BTCUSDT", "XRPUSDT", "ES1!", "NQ1!", "AAPL"];

type Signal = {
  symbol: string;
  brain: string;
  confidence: number;
  action: "BUY" | "SELL" | "WAIT";
  timestamp: string;
};

export default function UltraBrainDashboard() {
  const [data, setData] = useState<Signal[]>([]);
  const [highlighted, setHighlighted] = useState<{ [symbol: string]: boolean }>({});
  const [brainFilter, setBrainFilter] = useState("all");

  useEffect(() => {
    const fetchSignals = async () => {
      const res = await fetch("/api/signal/log", { credentials: "include" });
      const json = await res.json();
      const newData: Signal[] = json.recent || [];

      // Highlight updated symbols
      const newHighlights: { [symbol: string]: boolean } = {};
      newData.forEach((s) => {
        newHighlights[s.symbol] = true;
      });

      setData(newData);
      setHighlighted(newHighlights);

      setTimeout(() => {
        setHighlighted({});
      }, 2000); // blink lasts 2 seconds
    };

    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-center mb-6">
        <select
          className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600"
          value={brainFilter}
          onChange={(e) => setBrainFilter(e.target.value)}
        >
          <option value="all">🧠 All Brains</option>
          <option value="trend">Trend</option>
          <option value="structure">Structure</option>
          <option value="range">Range</option>
          <option value="volume">Volume</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-black text-white">
        {symbols.map((symbol) => {
          const signal = data.find(
            (s) => s.symbol === symbol && (brainFilter === "all" || s.brain === brainFilter)
          );
          const isBlinking = highlighted[symbol];

          return (
            <div
              key={symbol}
              className={`bg-zinc-900 rounded-xl p-4 shadow-lg border border-zinc-700 transition-all duration-500 ${
                isBlinking ? "ring-4 ring-green-400 animate-pulse" : ""
              }`}
            >
              <h2 className="text-xl font-bold text-red-500 mb-2">{symbol}</h2>
              <p>
                🧠 Brain: <strong>{signal?.brain || "—"}</strong>
              </p>
              <p>
                📊 Confidence: <strong>{signal?.confidence ?? "--"}%</strong>
              </p>
              <p>
                📈 Action:{" "}
                <strong
                  className={
                    signal?.action === "BUY"
                      ? "text-green-400"
                      : signal?.action === "SELL"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {signal?.action || "WAIT"}
                </strong>
              </p>
              <p className="text-xs mt-2 text-gray-400">⏱ {signal?.timestamp}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
