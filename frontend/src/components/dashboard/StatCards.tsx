// src/components/dashboard/StatCards.tsx
import React from "react";
export default function StatCards() {
    return (
      <>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <h4 className="text-sm text-gray-400">Net Profit</h4>
          <p className="text-xl font-bold text-green-400">+12.4%</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <h4 className="text-sm text-gray-400">Closed Trades</h4>
          <p className="text-xl font-bold">143</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <h4 className="text-sm text-gray-400">Win Rate</h4>
          <p className="text-xl font-bold text-yellow-400">68%</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <h4 className="text-sm text-gray-400">Avg Hold Time</h4>
          <p className="text-xl font-bold">23m</p>
        </div>
      </>
    );
  }