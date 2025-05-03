// src/components/dashboard/HealthStatus.tsx
import React from "react";
export default function HealthStatus() {
    return (
      <div className="bg-zinc-800 p-4 rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center">
          <h4 className="text-sm text-gray-400">📶 Regime</h4>
          <p className="text-xl font-bold text-blue-400">auto</p>
        </div>
        <div className="text-center">
          <h4 className="text-sm text-gray-400">🧠 Manual Dispatch</h4>
          <p className="text-xl font-bold text-purple-300">Off</p>
        </div>
        <div className="text-center">
          <h4 className="text-sm text-gray-400">🛡️ Drawdown Protection</h4>
          <p className="text-xl font-bold text-green-400">On</p>
        </div>
        <div className="text-center">
          <h4 className="text-sm text-gray-400">🧠 Filter Override</h4>
          <p className="text-xl font-bold text-yellow-400">Off</p>
        </div>
        <div className="text-center">
          <h4 className="text-sm text-gray-400">📡 Forced Regime</h4>
          <p className="text-xl font-bold text-pink-400">None</p>
        </div>
      </div>
    );
  }
