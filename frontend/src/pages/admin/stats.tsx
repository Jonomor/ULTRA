import { useEffect, useState } from "react";
import SignalChart from "../../components/SignalChart";
import PushTestButton from "../../components/PushTestButton"; // ✅ New
import GPTAssistant from "../../components/GPTAssistant"; 

export default function AdminStats() {
  const [stats, setStats] = useState({
    dispatch: false,
    regime: "auto",
    totalSignals: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5173/api/admin/state", {
      headers: {
        Authorization: "Bearer your_admin_token",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setStats((prev) => ({ ...prev, ...data }))
      );

    fetch("http://localhost:5173/api/signals", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((signals) =>
        setStats((prev) => ({ ...prev, totalSignals: signals.length }))
      );
  }, []);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin System Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
        <div className="bg-zinc-800 p-6 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">🚦 Dispatch</p>
          <p className="text-2xl font-bold">
            {stats.dispatch ? "ENABLED ✅" : "DISABLED ❌"}
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">📡 Regime Mode</p>
          <p className="text-2xl font-bold">{stats.regime}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">📈 Total Signals</p>
          <p className="text-2xl font-bold">{stats.totalSignals}</p>
        </div>
      </div>

      <SignalChart />
      <PushTestButton />
      <GPTAssistant />
    </div>
  );
}
