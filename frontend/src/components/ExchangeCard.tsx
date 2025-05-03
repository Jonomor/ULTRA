import React from "react";
interface ExchangeCardProps {
  title: string;
  status: boolean;
  latency: number;
  balance: number;
  lastTrade: string;
}

export default function ExchangeCard({ title, status, latency, balance, lastTrade }: ExchangeCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow text-white">
      <h2 className="text-2xl mb-2">{title}</h2>
      <p>Status: {status ? '✅ Connected' : '❌ Disconnected'}</p>
      <p>Latency: {latency} ms</p>
      <p>Available BTC: {balance.toFixed(4)}</p>
      <p>Last Trade: {lastTrade}</p>
    </div>
  );
}
