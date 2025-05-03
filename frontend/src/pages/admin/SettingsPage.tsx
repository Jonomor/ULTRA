import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // ✅ Fixed path

const DEFAULT_PRESET = {
  breakLen: 20,
  trailPoints: 12,
  trailOffset: 10,
  strategyMode: "hybrid",
  macro: "risk-on",
  regime: "auto",
  tf_suggestion: ""
};

export default function SettingsPage() {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [preset, setPreset] = useState(DEFAULT_PRESET);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSettings(symbol);
  }, [symbol]);

  async function fetchSettings(sym: string) {
    const { data, error } = await supabase
      .from("settings")
      .select("preset")
      .eq("symbol", sym)
      .single();

    if (data) setPreset(data.preset);
    if (error) console.error(error);
  }

  async function saveSettings() {
    const { error } = await supabase
      .from("settings")
      .upsert({ symbol, preset });

    setStatus(error ? "❌ Error saving" : "✅ Saved");
  }

  function updateField(field: string, value: any) {
    setPreset({ ...preset, [field]: value });
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Strategy Presets</h1>

      <label htmlFor="symbol">Symbol</label>
      <input
        id="symbol"
        value={symbol}
        onChange={e => setSymbol(e.target.value.toUpperCase())}
        className="w-full border p-2"
        placeholder="Symbol (e.g. BTCUSD)"
      />

      <label htmlFor="strategyMode">Strategy Mode</label>
      <select
        id="strategyMode"
        title="Select strategy mode"
        value={preset.strategyMode}
        onChange={e => updateField("strategyMode", e.target.value)}
        className="w-full border p-2"
      >
        <option value="breakout">Breakout</option>
        <option value="crossover">Crossover</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <label htmlFor="breakLen">Breakout Length</label>
      <input
        id="breakLen"
        type="number"
        value={preset.breakLen}
        onChange={e => updateField("breakLen", Number(e.target.value))}
        className="w-full border p-2"
        placeholder="Breakout Length"
      />

      <label htmlFor="trailPoints">Trailing Stop (pts)</label>
      <input
        id="trailPoints"
        type="number"
        value={preset.trailPoints}
        onChange={e => updateField("trailPoints", Number(e.target.value))}
        className="w-full border p-2"
        placeholder="Trailing Stop (pts)"
      />

      <label htmlFor="trailOffset">Trigger Offset (pts)</label>
      <input
        id="trailOffset"
        type="number"
        value={preset.trailOffset}
        onChange={e => updateField("trailOffset", Number(e.target.value))}
        className="w-full border p-2"
        placeholder="Trigger Offset (pts)"
      />

      <label htmlFor="macro">Macro Toggle</label>
      <select
        id="macro"
        title="Select macro regime"
        value={preset.macro}
        onChange={e => updateField("macro", e.target.value)}
        className="w-full border p-2"
      >
        <option value="risk-on">Risk-On</option>
        <option value="risk-off">Risk-Off</option>
        <option value="neutral">Neutral</option>
      </select>

      <label htmlFor="regime">Regime Mode</label>
      <select
        id="regime"
        title="Select market regime"
        value={preset.regime}
        onChange={e => updateField("regime", e.target.value)}
        className="w-full border p-2"
      >
        <option value="trend">Trend</option>
        <option value="range">Range</option>
        <option value="auto">Auto</option>
      </select>

      <label htmlFor="tf_suggestion">Suggested Time Frame</label>
      <input
        id="tf_suggestion"
        value={preset.tf_suggestion}
        onChange={e => updateField("tf_suggestion", e.target.value)}
        className="w-full border p-2"
        placeholder="Suggested TF (e.g. 1h–2h)"
      />

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Settings
      </button>

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
