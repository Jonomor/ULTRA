import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import io from "socket.io-client";
import clsx from "clsx"; // ✨ Utility for conditional classes
import React from "react";

type Signal = {
  timestamp: string;
  asset?: string;
  type?: string;
  confidence?: number;
};

export default function SignalChart() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [pulse, setPulse] = useState(false); // ✅ FIXED here
  const socket = useRef<any>(null);

  useEffect(() => {
    // Initial fetch
    fetch(`${import.meta.env.VITE_API_URL}/signals/log`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSignals(data.recent || []);
        setLastUpdate(new Date());
      });

    // Connect WebSocket
    socket.current = io(import.meta.env.VITE_API_URL, { withCredentials: true });

    socket.current.on("newSignal", (signalData: any) => {
      setSignals((prev) => [
        ...prev,
        {
          asset: signalData.asset || "Unknown",
          type: signalData.type || "BUY",
          confidence: signalData.confidence || 0,
          timestamp: new Date().toISOString(),
        },
      ]);
      setLastUpdate(new Date());
      setPulse(true);           // ✅ Pulse on new signal
      setTimeout(() => setPulse(false), 300); // ✅ Stop pulse after 300ms
    });

    // Backup 30s refetch
    const interval = setInterval(() => {
      fetch(`${import.meta.env.VITE_API_URL}/signals/log`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSignals(data.recent || []);
          setLastUpdate(new Date());
        });
    }, 30_000);

    return () => {
      socket.current?.disconnect();
      clearInterval(interval);
    };
  }, []);

  const grouped = signals.reduce((acc: Record<string, number>, s) => {
    const key = new Date(s.timestamp).toLocaleDateString();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Signals per Day",
        data: Object.values(grouped),
        borderColor: "#ff4d4f",
        backgroundColor: "rgba(255,77,79,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className={clsx("bg-zinc-900 p-6 rounded-xl mt-8 shadow-lg transition-all", pulse && "ring-4 ring-purple-500/50")}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">📈 Signal Volume (Live)</h2>
        {lastUpdate && (
          <span className="text-gray-400 text-sm">
            Last update: {Math.round((Date.now() - lastUpdate.getTime()) / 1000)}s ago
          </span>
        )}
      </div>
      <Line data={chartData} />
    </div>
  );
}
