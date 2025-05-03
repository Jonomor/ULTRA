import React from "react";
const bots = [
    { name: 'ULTRA+', color: 'text-red-500', description: 'Breakout sniper with filter intelligence.' },
    { name: 'PRO+', color: 'text-purple-400', description: 'AI-tuned with macro + regime control.' },
    { name: 'SCALPTR', color: 'text-blue-400', description: 'Micro-timeframe execution beast.' },
    { name: 'SNYPER', color: 'text-gray-300', description: 'One-shot kill logic. No noise.' },
  ]

  export default function BotGrid() {
    return (
      <>
        {bots.map(bot => (
          <div
            key={bot.name}
            className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:shadow-lg transition"
          >
            <h3 className={`text-2xl font-bold ${bot.color} mb-2`}>{bot.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{bot.description}</p>
            <button className="text-teal-400 hover:underline">View Strategy →</button>
          </div>
        ))}
      </>
    )
  }
