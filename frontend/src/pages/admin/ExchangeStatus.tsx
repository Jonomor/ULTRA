import { useState, useEffect } from 'react';
import ExchangeCard from '../../components/ExchangeCard';
import BalanceChart from '../../components/BalanceChart';
import { io } from 'socket.io-client';
import React from "react";


export default function ExchangeStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [krakenHistory, setKrakenHistory] = useState<any[]>([]);
  const [coinbaseHistory, setCoinbaseHistory] = useState<any[]>([]);

  const fetchStatus = () => {
    fetch('/api/exchange-status')
      .then(res => res.json())
      .then(setStatus);
  };

  const fetchBalanceHistories = () => {
    fetch('/api/balance-history?exchange=kraken')
      .then(res => res.json())
      .then(setKrakenHistory);

    fetch('/api/balance-history?exchange=coinbase')
      .then(res => res.json())
      .then(setCoinbaseHistory);
  };

  useEffect(() => {
    fetchStatus();
    fetchBalanceHistories();
  
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', {
      withCredentials: true,
    });
    
  
    socket.on('exchange:update', (data) => {
      setStatus(data);
      setKrakenHistory(prev => [...prev.slice(-287), {
        capturedAt: new Date().toISOString(),
        balance: data.kraken.balance
      }]);
      setCoinbaseHistory(prev => [...prev.slice(-287), {
        capturedAt: new Date().toISOString(),
        balance: data.coinbase.balance
      }]);
    });
  
    return () => {
      socket.disconnect(); // ✅ Cleanup function disconnects socket properly
    };
  }, []);
  
  if (!status) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Exchange Status Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExchangeCard
          title="Kraken"
          status={status.kraken.success}
          latency={status.kraken.latencyMs}
          balance={status.kraken.balance}
          lastTrade={status.kraken.lastTradeAt || 'Unknown'}
        />
        <ExchangeCard
          title="Coinbase"
          status={status.coinbase.success}
          latency={status.coinbase.latencyMs}
          balance={status.coinbase.balance}
          lastTrade={status.coinbase.lastTradeAt || 'Unknown'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <BalanceChart history={krakenHistory} label="Kraken BTC Balance" />
        <BalanceChart history={coinbaseHistory} label="Coinbase BTC Balance" />
      </div>
    </div>
  );
}

