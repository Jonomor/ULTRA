// pages/bots/[bot].tsx
import React from "react";
import { useParams } from 'react-router-dom'

type BotKey = 'ultra' | 'pro'

const botDescriptions: Record<BotKey, {
  name: string
  tagline: string
  style: string
  logic: string
  netProfit: string
  tf: string
}> = {
  ultra: {
    name: 'ULTRA+',
    tagline: 'Precision Breakouts. Institutional Filters.',
    style: 'Breakout-driven | Trend-following | Intraday speed',
    logic: 'EMA 9/50/200 alignment, volume confirmation, session filter',
    netProfit: '+34.2%',
    tf: '30m–1h',
  },
  pro: {
    name: 'PRO+',
    tagline: 'AI-Tuned. Regime Adaptive. Signal-Aware.',
    style: 'Hybrid logic | Regime + Macro filters | AI Reinforced',
    logic: 'Breakout + Crossover + Volatility + Structure + GPT flags',
    netProfit: '+41.8%',
    tf: '15m–1h',
  },
}

export default function BotProfile() {
  const { bot } = useParams<{ bot: string }>()
  const info = botDescriptions[bot as BotKey]

  if (!info) return <p className="text-white p-6">Bot not found.</p>

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-red-500 mb-2">{info.name}</h1>
      <p className="text-lg text-gray-300 mb-6">{info.tagline}</p>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4 max-w-2xl">
        <p><strong>🧬 Strategy Style:</strong> {info.style}</p>
        <p><strong>📈 Core Logic:</strong> {info.logic}</p>
        <p><strong>💰 Net Profit:</strong> <span className="text-green-400">{info.netProfit}</span></p>
        <p><strong>⏱ Suggested Timeframe:</strong> {info.tf}</p>
      </div>

      <button
        onClick={() => window.location.href = '/dashboard?bot=' + bot}
        className="mt-10 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-lg"
      >
        Load {info.name} in Dashboard
      </button>
    </div>
  )
}
