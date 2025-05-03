import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Title } from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { ChartOptions } from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Title);

interface BalanceHistoryPoint {
  capturedAt: string;
  balance: number;
}

interface BalanceChartProps {
  history: BalanceHistoryPoint[];
  label: string;
}

export default function BalanceChart({ history, label }: BalanceChartProps) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-black p-4 rounded-lg shadow text-white text-center">
        <p>No Balance Data Available</p>
      </div>
    );
  }

  const data = {
    labels: history.map((h) => new Date(h.capturedAt)),
    datasets: [
      {
        label,
        data: history.map((h) => h.balance),
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'PPpp',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'BTC Balance',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow text-white">
      <Line data={data} options={options} />
    </div>
  );
}
