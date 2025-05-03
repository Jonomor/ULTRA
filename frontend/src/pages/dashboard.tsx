// src/pages/dashboard.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Bar } from 'react-chartjs-2';
import PresetSummary from "../components/PresetSummary";
import StatCards from "../components/dashboard/StatCards";
import HealthStatus from "../components/dashboard/HealthStatus";
import SignalTable from "../components/dashboard/SignalTable";
import FCMHandler from '../components/FCMHandler';
import UltraBrainDashboard from "../components/dashboard/UltraBrainDashboard";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 🔥 Setup WebSocket
const socket: Socket = io('http://localhost:4000', {
  withCredentials: true,
});

// 🔥 MLModelSuggestions Component
function MLModelSuggestions() {
  const [suggestedSettings, setSuggestedSettings] = useState<any>(null);

  const fetchSuggestions = async () => {
    const features = {
      atrEntry: 1.2,
      volumeAtEntry: 50000,
      volumeSpike: true,
      priceVsMA: 0.03,
      confidence: 75,
      fallbackActive: false,
    };

    const res = await fetch('http://localhost:4000/api/model/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features),
    });

    const data = await res.json();
    setSuggestedSettings(data);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg mt-8 text-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">🤖 ML Suggested Optimizations</h2>
      <button
        onClick={fetchSuggestions}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4"
      >
        Fetch Suggestion
      </button>

      {suggestedSettings && (
        <div className="text-green-400">
          <p><strong>Predicted Best Setting:</strong> {suggestedSettings.prediction === 1 ? "Trade (Good)" : "No Trade (Risky)"}</p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [dispatchEnabled, setDispatchEnabled] = useState(false);
  const [regime, setRegime] = useState('auto');
  const [logs, setLogs] = useState<any[]>([]);
  const [_gptInput, _setGptInput] = useState('');
  const [_gptOutput, _setGptOutput] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [botMode, setBotMode] = useState<'ultra' | 'pro'>('ultra');
  const [manualDispatch, setManualDispatch] = useState(false);
  const [drawdownProtection, setDrawdownProtection] = useState(true);
  const [filterOverride, setFilterOverride] = useState(false);
  const [forcedRegime, setForcedRegime] = useState('');
  const [mlStatus, setMlStatus] = useState<any>(null);

  console.log(message, botMode, setBotMode, manualDispatch, drawdownProtection, filterOverride, forcedRegime);


  // ✅ Socket.io Connection
  useEffect(() => {
    socket.on('connect', () => {
      setSocketConnected(true);
      socket.emit('joinRoom', 'trading-alerts');
    });

    socket.on('disconnect', () => setSocketConnected(false));

    socket.on('newSignal', (data) => {
      if (data.type === 'BUY') setBuyCount((prev) => prev + 1);
      if (data.type === 'SELL') setSellCount((prev) => prev + 1);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('newSignal');
      socket.disconnect();
    };
  }, []);

  // ✅ Auth Check
  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setUsername(data.username);
        setRole(data.role);
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  // ✅ Admin Config
  useEffect(() => {
    fetch('http://localhost:4000/api/admin/state', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setDispatchEnabled(data.dispatch);
        setRegime(data.regime);
      });

    fetch('http://localhost:4000/api/admin/override', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setManualDispatch(data.manualDispatch);
        setDrawdownProtection(data.drawdownProtection);
        setFilterOverride(data.filterOverride);
        setForcedRegime(data.forcedRegime);
      });
  }, []);

  // ✅ Logs
  useEffect(() => {
    fetch('http://localhost:4000/api/signals/recent', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setLogs(data.recent || []));
  }, []);

  // ✅ ML Model Status
  useEffect(() => {
    fetch('http://localhost:4000/api/ml/status')
      .then((res) => res.json())
      .then((data) => setMlStatus(data));
  }, []);

  // ✅ Admin Actions
  const sendTestSignal = async () => {
    await fetch('http://localhost:4000/api/admin/test-signal', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'This is a test broadcast' }),
    });
  };

  const toggleDispatch = async () => {
    const newState = !dispatchEnabled;
    await fetch('http://localhost:4000/api/admin/dispatch', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newState }),
    });
    setDispatchEnabled(newState);
  };

  const updateRegime = async (newMode: string) => {
    setRegime(newMode);
    await fetch('http://localhost:4000/api/admin/regime', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode }),
    });
  };

  const updateOverride = async (updates: any) => {
    const res = await fetch('http://localhost:4000/api/admin/override', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (data.success) {
      Object.entries(data.updated).forEach(([key, val]) => {
        if (key === 'manualDispatch') setManualDispatch(val as boolean);
        if (key === 'drawdownProtection') setDrawdownProtection(val as boolean);
        if (key === 'filterOverride') setFilterOverride(val as boolean);
        if (key === 'forcedRegime') setForcedRegime(val as string);
      });
    }
  };


  const chartData = {
    labels: ['BUY', 'SELL'],
    datasets: [
      {
        label: 'Trade Signals',
        data: [buyCount, sellCount],
        backgroundColor: ['#10b981', '#ef4444'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  // ✅ Console log to silence unused warnings
  console.log(username, role, regime, logs, socketConnected, botMode, sendTestSignal, toggleDispatch, updateRegime, updateOverride);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <PresetSummary symbol="BTCUSD" />
      <StatCards />
      <HealthStatus />
      <MLModelSuggestions />
      <UltraBrainDashboard />
      <SignalTable />
      <FCMHandler />

      {/* ML Status */}
      {mlStatus && (
        <div className="bg-blue-900 p-4 rounded mt-6 text-white">
          <h3 className="text-lg font-bold mb-2">🧠 ML Model Status</h3>
          <p>Last Retrained: {new Date(mlStatus.lastModified).toLocaleString()}</p>
          <p>Model Size: {(mlStatus.sizeBytes / 1024).toFixed(2)} KB</p>
          <p>Status: {mlStatus.status}</p>
        </div>
      )}

      {/* Live Trade Signals Chart */}
      <div className="my-6 bg-white shadow rounded p-6 text-black">
        <h2 className="text-xl font-semibold mb-4 text-red-500">📈 Live Trade Signals</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      {/* Logout */}
      <button
        onClick={() => {
          fetch('http://localhost:4000/api/logout', {
            method: 'POST',
            credentials: 'include',
          }).finally(() => {
            window.location.href = '/';
          });
        }}
        className="text-sm text-red-600 underline mt-6 block"
      >
        Log out
      </button>
    </div>
  );
}
