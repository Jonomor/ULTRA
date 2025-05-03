export default function Header() {
    return (
      <header className="text-center py-16 bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
          THE SMARTEST TRADER YOU’LL HIRE
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6">
          Real-time AI signals. Ultra-precision entries. Regime-adaptive autonomy.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold">
            🚀 ULTRA SYSTEM
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded">
            📊 View Live Demo
          </button>
        </div>
      </header>
    )
  }
  