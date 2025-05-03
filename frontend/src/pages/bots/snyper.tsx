export default function SnpyerPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gray-600 text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wider uppercase">
            🎯 Stealth Swing Bot
          </div>
          <h1 className="text-5xl font-extrabold text-gray-300 mb-3">SNYPER</h1>
          <p className="text-lg text-gray-400">Low noise. High intent. Swing setups that strike.</p>
          <p className="text-sm text-yellow-400 font-semibold mt-2">🚧 Coming Soon – Not yet available for live deployment</p>
        </div>

        {/* Info Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-lg">
          <p><strong>🧠 Strategy Type:</strong> Swing entry + hold | Pattern-based | Minimal alerts</p>
          <p><strong>🎯 Core Logic:</strong> S/R bounce zones, ATR compression, structure breaks</p>
          <p><strong>💎 Win Rate:</strong> <span className="text-green-400 font-bold">68.9%</span></p>
          <p><strong>⏱ Timeframe:</strong> 1h–4h</p>
        </div>

        {/* Launch Button */}
        <div className="flex justify-center mt-12">
          <button
            disabled
            className="bg-gray-800 text-gray-500 font-bold px-8 py-3 rounded-2xl text-lg shadow-lg cursor-not-allowed"
          >
            🚧 Coming Soon
          </button>
        </div>

      </div>
    </div>
  );
}
