// src/pages/admin/dashboard-v2.tsx
import AdminSidebar from "../../components/AdminSidebar";
import AdminRouteGuard from "../../components/AdminRouteGuard";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import React from "react";

export default function AdminDashboardV2() {
  const [dispatch, setDispatch] = useState(false);
  const [regime, setRegime] = useState("auto");
  const [totalSignals, setTotalSignals] = useState(0);
  const [sparklineData, setSparklineData] = useState<number[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/state`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDispatch(data.dispatch);
        setRegime(data.regime);
      });

    fetch(`${import.meta.env.VITE_API_URL}/signals/log`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalSignals(data.recent?.length || 0);
      });

    const interval = setInterval(() => {
      setSparklineData((prev) => {
        const next = [...prev.slice(-9), Math.floor(60 + Math.random() * 30)];
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sparkline = {
    labels: sparklineData.map((_, idx) => idx.toString()),
    datasets: [
      {
        data: sparklineData,
        borderColor: "#00ff88",
        backgroundColor: "transparent",
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <AdminRouteGuard>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-red-500 flex items-center gap-2">
              🛡️ Admin Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dispatch Card */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow flex flex-col">
              <span className="text-gray-400 mb-2">🚦 Dispatch</span>
              <span className={`font-bold text-2xl ${dispatch ? "text-green-400" : "text-red-400"}`}>
                {dispatch ? "Enabled" : "Disabled"}
              </span>
              <div className="mt-4 h-16">
                <Line
                  data={sparkline}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: false } },
                    elements: { line: { tension: 0.4 } },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Regime Card */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow flex flex-col">
              <span className="text-gray-400 mb-2">📡 Regime</span>
              <span className="font-bold text-2xl text-blue-400 capitalize">{regime}</span>
            </div>

            {/* Total Signals Card */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow flex flex-col">
              <span className="text-gray-400 mb-2">📈 Total Signals (24h)</span>
              <span className="font-bold text-2xl text-purple-400">{totalSignals}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
