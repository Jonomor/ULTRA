// src/components/TradeChart.tsx
import React from "react";

import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { io, Socket } from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', {
  withCredentials: true,
});


export default function TradeChart() {
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('📡 Connected to WebSocket');
      socket.emit('joinRoom', 'trading-alerts');
    });

    socket.on('newSignal', (data) => {
      console.log('📊 New signal received:', data);
      if (data.type === 'BUY') setBuyCount(prev => prev + 1);
      if (data.type === 'SELL') setSellCount(prev => prev + 1);
    });

    return () => {
      socket.off('newSignal');
      socket.disconnect();
    };
  }, []);

  const data = {
    labels: ['BUY', 'SELL'],
    datasets: [
      {
        label: 'Trade Signals',
        data: [buyCount, sellCount],
        backgroundColor: ['#10b981', '#ef4444'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📈 Live Trade Signals</h2>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
