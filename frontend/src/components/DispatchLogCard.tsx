import React from "react";
export default function DispatchLogCard() {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">📡 Dispatch Logs</h2>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>✅ ULTRA triggered on BTCUSD — 84% confidence</li>
          <li>📉 SNYPER exit: AAPL 1h — +2.3% profit</li>
          <li>⚙️ PRO+ regime switch to Volatility Mode</li>
        </ul>
      </div>
    )
  }
