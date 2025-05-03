// src/components/dashboard/SignalTable.tsx
import React from "react";
export default function SignalTable() {
  const mockSignals = [
    { asset: "BTCUSDT", type: "BUY", confidence: 93, timestamp: "2025-04-21T14:00:00Z" },
    { asset: "ETHUSDT", type: "SELL", confidence: 87, timestamp: "2025-04-21T13:45:00Z" },
    { asset: "ES1!", type: "BUY", confidence: 78, timestamp: "2025-04-21T13:30:00Z" },
  ];

  return (
    <div className="relative overflow-x-auto mt-6">
      <table className="w-full text-sm relative z-10">
        <thead>
          <tr className="text-left border-b border-zinc-700">
            <th className="p-2">Asset</th>
            <th className="p-2">Type</th>
            <th className="p-2">Confidence</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {mockSignals.map((signal, i) => {
            const isUltraConfident = signal.confidence >= 90;
            return (
              <tr
                key={i}
                className={`border-t border-zinc-700 relative ${
                  isUltraConfident ? 'bg-zinc-900 sparkle' : ''
                }`}
              >
                <td className="p-2">{signal.asset}</td>
                <td className={`p-2 ${isUltraConfident ? 'glow text-red-500 font-bold' : ''}`}>
                  {signal.type}
                </td>
                <td className="p-2">{signal.confidence}%</td>
                <td className="p-2">{new Date(signal.timestamp).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
