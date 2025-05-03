export default function UltraPage() {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-12 font-sans">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-red-600 text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wider uppercase">
              ⚡ Tactical Alpha Engine
            </div>
            <h1 className="text-5xl font-extrabold text-red-500 mb-3">ULTRA+</h1>
            <p className="text-lg text-gray-300">Precision Breakouts. Institutional Filters.</p>
          </div>
          {/* Info Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-lg">
            <p><strong>🧬 Strategy Style:</strong> Breakout-driven | Trend-following | Intraday speed</p>
            <p><strong>📈 Core Logic:</strong> EMA 9/50/200 alignment, volume confirmation, session filter, 20-bar high/low breakout</p>
            <p><strong>📉 Risk Handling:</strong> 12-tick stop | Trailing TP | Session guardrails | Live signal filter</p>
            <p><strong>🛠️ Features:</strong> Volume ramp detection, breakout retest logic, daily risk limits, alert-based automation</p>
            <p><strong>💰 Net Profit:</strong> <span className="text-green-400 font-bold">+64.2%</span> (backtest)</p>
            <p><strong>⏱ Suggested Timeframe:</strong> 30m–1h</p>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <button
              onClick={() => window.location.href = "/dashboard?bot=ultra"}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-lg transition-all"
            >
              🚀 Load ULTRA+ in Dashboard
            </button>
            <a
              href="/pricing?plan=ultra#pricing"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md transition"
            >
              🔍 View Subscription Plans
            </a>
          </div>

        </div>
      </div>
    );
  }
