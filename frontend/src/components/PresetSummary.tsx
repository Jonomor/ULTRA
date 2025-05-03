import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

type Preset = {
  breakLen: number
  trailPoints: number
  trailOffset: number
  strategyMode: string
  macro: string
  regime: string
  tf_suggestion: string
}

export default function PresetSummary({ symbol }: { symbol: string }) {
  const [preset, setPreset] = useState<Preset | null>(null)

  useEffect(() => {
    if (!symbol) return
    supabase
      .from("settings")
      .select("preset")
      .eq("symbol", symbol)
      .single()
      .then(({ data }) => {
        if (data) setPreset(data.preset)
      })
  }, [symbol])

  if (!preset) return <div className="text-gray-500">Loading preset...</div>

  return (
    <div className="bg-white shadow rounded p-4 border w-full max-w-md space-y-2">
      <h2 className="text-lg font-bold">📊 {symbol} Strategy Preset</h2>
      <p><strong>Mode:</strong> {preset.strategyMode}</p>
      <p><strong>Breakout Length:</strong> {preset.breakLen}</p>
      <p><strong>Trail Stop:</strong> {preset.trailPoints} pts</p>
      <p><strong>Offset:</strong> {preset.trailOffset} pts</p>
      <p><strong>Macro:</strong> {preset.macro}</p>
      <p><strong>Regime:</strong> {preset.regime}</p>
      <p><strong>Suggested TF:</strong> {preset.tf_suggestion}</p>
    </div>
  )
}
