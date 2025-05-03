// src/pages/charts/ultra.tsx
import withAuth from "../../utils/withAuth";
import StrategyTabs from "../../components/StrategyTabs";
import React from "react";

function UltraPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📈 ULTRA+ Strategy Charts</h1>
      <p className="text-gray-400 mb-6">
        Live strategy view with switchable chart presets for ULTRA+, PRO+, SCALPTR, and SNYPR. Compare markets and monitor performance.
      </p>
      <StrategyTabs />
    </div>
  );
}

export default withAuth(UltraPage);

