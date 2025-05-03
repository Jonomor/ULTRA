import { useProDashboardData } from "../../hooks/useProDashboardData";
import OverrideControl from "../../components/OverrideControl";

export default function DashboardPRO() {
  const {
    signals,
    loading,
    overrides,
    setOverrides,
  } = useProDashboardData();

  return (
    <div className="max-w-6xl mx-auto p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">ULTRA PRO+ AI Dashboard</h1>

      <div className="bg-zinc-800 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Reinforcement Controls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <OverrideControl
            label="Manual Dispatch"
            value={overrides.manualDispatch}
            onChange={(val: boolean) =>
              setOverrides((prev) => ({ ...prev, manualDispatch: val }))
            }
          />
          <OverrideControl
            label="Filter Override"
            value={overrides.filterOverride}
            onChange={(val: boolean) =>
              setOverrides((prev) => ({ ...prev, filterOverride: val }))
            }
          />
          <select
            title="Forced Regime Selector"
            value={overrides.forcedRegime}
            onChange={(e) =>
              setOverrides((prev) => ({ ...prev, forcedRegime: e.target.value }))
            }
            className="p-2 bg-white text-black rounded w-full"
          >
            <option value="none">-- No Override --</option>
            <option value="trend">Trend</option>
            <option value="flat">Flat</option>
            <option value="volatility">Volatility</option>
          </select>
        </div>
      </div>

      <div className="bg-zinc-900 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold text-blue-400 mb-2">🧠 Last 10 AI Signals</h2>

        {loading ? (
          <p className="text-gray-400">Loading signals...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="p-2">Asset</th>
                <th className="p-2">Type</th>
                <th className="p-2">Confidence</th>
                <th className="p-2">Regime</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((s: any, i: number) => (
                <tr key={i} className="border-t border-zinc-700">
                  <td className="p-2">{s.asset}</td>
                  <td className="p-2">{s.type}</td>
                  <td className="p-2">{s.confidence}%</td>
                  <td className="p-2">{s.regime}</td>
                  <td className="p-2">{new Date(s.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
