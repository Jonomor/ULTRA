import React from "react";

export default function ScalptrPage() {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-12 font-sans">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wider uppercase">
              🎯 Micro Scalping Engine
            </div>
            <h1 className="text-5xl font-extrabold text-blue-400 mb-3">SCALPTR</h1>
            <p className="text-lg text-gray-300">Fast in, fast out. Optimized for high-frequency setups.</p>
            <p className="text-sm text-yellow-400 font-semibold mt-2">🚧 Coming Soon – Bot under construction</p>
          </div>
          {/* Info Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-lg">
            <p><strong>⚙️ Strategy Type:</strong> High-frequency | Micro timeframe | Tight stops</p>
            <p><strong>📊 Logic Stack:</strong> VWAP, RSI, trend-snap entries, EMA channels</p>
            <p><strong>📉 Avg Drawdown:</strong> <span className="text-yellow-400 font-bold">-1.2%</span></p>
            <p><strong>⏱ Timeframe:</strong> 1m–5m</p>
          </div>
          {/* Launch Button */}
          <div className="flex justify-center mt-12">
            <button
              disabled
              className="bg-blue-900 text-blue-400 font-bold px-8 py-3 rounded-2xl text-lg shadow-lg cursor-not-allowed"
            >
              🚧 Coming Soon
            </button>
          </div>

        </div>
      </div>
    );
  }
