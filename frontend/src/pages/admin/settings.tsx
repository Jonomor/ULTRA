import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminRouteGuard from '../../components/AdminRouteGuard';
import React from "react";

export default function AdminSettings() {
  const [isDispatchEnabled, setDispatchEnabled] = useState(false);
  const [regimeMode, setRegimeMode] = useState('auto');

  const toggleDispatch = async () => {
    const nextState = !isDispatchEnabled;
    setDispatchEnabled(nextState);

    await fetch(`${import.meta.env.VITE_API_URL}/admin/dispatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
      credentials: 'include',
      body: JSON.stringify({ enabled: nextState }),
    });
  };

  const changeRegime = async (mode: string) => {
    setRegimeMode(mode);

    await fetch(`${import.meta.env.VITE_API_URL}/admin/regime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
      credentials: 'include',
      body: JSON.stringify({ mode }),
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/state`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDispatchEnabled(data.dispatch);
        setRegimeMode(data.regime);
      });
  }, []);

  return (
    <AdminRouteGuard>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6 text-white">
          <h1 className="text-3xl font-bold mb-6">⚙️ Admin Settings</h1>

          <div className="mb-6">
            <label className="block mb-2">🚦 Signal Dispatch</label>
            <button
              onClick={toggleDispatch}
              className={`px-4 py-2 rounded ${
                isDispatchEnabled ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isDispatchEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div>
            <label className="block mb-2">📡 Regime Mode</label>
            <select
              value={regimeMode}
              onChange={(e) => changeRegime(e.target.value)}
              className="bg-black p-2 rounded"
            >
              <option value="auto">Auto</option>
              <option value="trend">Trend</option>
              <option value="range">Range</option>
              <option value="volatility">Volatility-Aware</option>
            </select>
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
