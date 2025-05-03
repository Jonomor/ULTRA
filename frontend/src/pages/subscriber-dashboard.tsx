import PresetSummary from "../components/PresetSummary";
import StatCards from "../components/dashboard/StatCards";
import HealthStatus from "../components/dashboard/HealthStatus";
import SignalTable from "../components/dashboard/SignalTable";
import FCMHandler from "../components/FCMHandler";
import React from "react";

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

export default function SubscriberDashboard() {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <PresetSummary symbol="BTCUSD" />
      <StatCards />
      <HealthStatus />
      <SignalTable />
      <FCMHandler />
    </div>
  );
}
