import React from "react";

export default function ProPage() {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-12 font-sans">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-purple-600 text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wider uppercase">
              🧠 AI-Augmented Core
            </div>
            <h1 className="text-5xl font-extrabold text-purple-500 mb-3">ULTRA PRO+</h1>
            <p className="text-lg text-gray-300">AI-Tuned. Regime Adaptive. Signal-Aware.</p>
          </div>

          {/* Info Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-lg">
            <p><strong>🧬 Strategy Style:</strong> Hybrid logic | Macro filters | AI overrides</p>
            <p><strong>📈 Core Logic:</strong> Breakout + Crossover + ATR + Swing Structure + Macro/Regime layers</p>
            <p><strong>🧠 Adaptive Engine:</strong> Auto adjusts risk, timing, and targets using historical context</p>
            <p><strong>🗂️ Control Panel:</strong> Google Sheet signal toggles, manual dispatch, volatility guards</p>
            <p><strong>💰 Net Profit:</strong> <span className="text-green-400 font-bold">+81.8%</span> (backtest)</p>
            <p><strong>⏱ Suggested Timeframe:</strong> 15m–1h</p>
          </div>
  
          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <button
              onClick={() => window.location.href = "/dashboard?bot=pro"}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-lg transition-all"
            >
              🧠 Load PRO+ in Dashboard
            </button>
            <a
              href="/pricing?plan=pro#pricing"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md transition"
            >
              🔍 View Subscription Plans
            </a>
          </div>
  
        </div>
      </div>
    );
  }
  