// src/hooks/useDashboardData.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000', { withCredentials: true });

export function useDashboardData() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [config, setConfig] = useState({
    dispatch: false,
    regime: 'auto',
    manualDispatch: false,
    drawdownProtection: true,
    filterOverride: false,
    forcedRegime: ''
  });

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
  
    fetch(`${API}/dashboard`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username);
        setRole(data.role);
        setMessage(data.message);
      });
  
    fetch(`${API}/admin/state`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setConfig(prev => ({ ...prev, dispatch: data.dispatch, regime: data.regime }));
      });
  
    fetch(`${API}/admin/override`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setConfig(prev => ({ ...prev, ...data }));
      });
  
    fetch(`${API}/signals/recent`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setLogs(data.recent || []));
  }, []);
  

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
      socket.disconnect();
    };
  }, []);

  return {
    username,
    role,
    message,
    logs,
    buyCount,
    sellCount,
    config,
    setConfig,
    socketConnected,
  };
}
