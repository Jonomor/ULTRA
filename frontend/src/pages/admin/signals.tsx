import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminRouteGuard from "../../components/AdminRouteGuard";

type Signal = {
  _id: string;
  type: string;
  asset: string;
  confidence: number;
  timestamp: string;
  comment?: string;
};

export default function AdminSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/signals/log`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}` },
    })
      .then((res) => {
        if (res.status === 403) {
          navigate("/403");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch signals");
        return res.json();
      })
      .then((data) => setSignals(data.recent || []))
      .catch((err) => {
        console.error("Error loading signals:", err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filtered = signals.filter((s) =>
    [s.type, s.asset, String(s.confidence)].some((val) =>
      val.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <AdminRouteGuard>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <h1 className="text-3xl font-bold text-red-500 mb-6">📡 Signals</h1>

          <div className="max-w-2xl mx-auto mb-6">
            <input
              type="text"
              placeholder="🔍 Filter by type, asset or confidence..."
              className="w-full px-4 py-2 border rounded bg-black text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="text-gray-400 text-center">Loading signals...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 text-center">No matching signals found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-zinc-900 text-white text-sm rounded shadow">
                <thead className="bg-zinc-800 text-gray-400">
                  <tr>
                    <th className="px-4 py-2">Asset</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Confidence</th>
                    <th className="px-4 py-2">Timestamp</th>
                    <th className="px-4 py-2">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((signal) => (
                    <tr key={signal._id} className="border-b border-zinc-700 hover:bg-zinc-800">
                      <td className="px-4 py-2">{signal.asset}</td>
                      <td className="px-4 py-2">{signal.type}</td>
                      <td className="px-4 py-2">{signal.confidence}%</td>
                      <td className="px-4 py-2">{new Date(signal.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2">{signal.comment || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminRouteGuard>
  );
}
