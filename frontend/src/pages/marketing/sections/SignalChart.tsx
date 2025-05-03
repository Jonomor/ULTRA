// src/pages/marketing/sections/SignalChart.tsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Helper: Generate 7 days of labels (Mon, Apr 24, etc.)
const generateLabels = () =>
  Array.from({ length: 7 }, (_, i) =>
    new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  );

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
    title: {
      display: true,
      text: "📈 Daily Signal Volume (Mock)",
      color: "#ff2c2c",
      font: {
        size: 20,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "#333",
      },
    },
    y: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "#333",
      },
    },
  },
};

export default function SignalChart() {
  const labels = useMemo(() => generateLabels(), []);
  const mockSignalCounts = useMemo(() => labels.map(() => Math.floor(Math.random() * 15 + 5)), [labels]);

  const data = {
    labels,
    datasets: [
      {
        label: "Signals Fired",
        data: mockSignalCounts,
        borderColor: "#ff2c2c",
        backgroundColor: "#ff2c2c88",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <Line data={data} options={chartOptions} className="rounded-xl bg-zinc-950 p-4 shadow-lg" />
    </section>
  );
}
