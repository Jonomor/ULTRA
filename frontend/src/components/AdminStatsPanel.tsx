// src/components/AdminStatsPanel.tsx
import React from "react";
import { useEffect, useState } from 'react';

export default function AdminStatsPanel() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-100 p-6 rounded mb-8">
      <h2 className="text-xl font-semibold mb-4">📊 ULTRA+ Bot Stats (24h)</h2>
      <ul className="text-sm space-y-2 text-gray-700">
        <li>🔢 Signal Count: <strong>{stats.signalCount}</strong></li>
        <li>🚦 Dispatch: <strong>{stats.dispatchEnabled ? 'Enabled' : 'Disabled'}</strong></li>
        <li>📡 Regime: <strong>{stats.regimeMode}</strong></li>
        <li>🛡️ Drawdown Protection: <strong>{stats.drawdownProtection ? 'On' : 'Off'}</strong></li>
        <li>🧠 Filter Override: <strong>{stats.filterOverride ? 'On' : 'Off'}</strong></li>
        <li>✋ Manual Dispatch: <strong>{stats.manualDispatch ? 'On' : 'Off'}</strong></li>
        <li>🤖 AI Accuracy: <strong>{stats.aiAccuracy}%</strong></li>
      </ul>
    </div>
  );
}
