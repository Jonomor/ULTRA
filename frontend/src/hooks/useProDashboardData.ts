import { useEffect, useState } from "react";

type Signal = {
  asset: string;
  type: string;
  confidence: number;
  regime: string;
  timestamp: string;
};

export function useProDashboardData() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState({
    manualDispatch: false,
    filterOverride: false,
    forcedRegime: "none",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Fetch AI signals
        const signalRes = await fetch("http://localhost:4000/api/pro/signals/recent", {
          credentials: "include", // 🔐 Include cookie
        });
        if (!signalRes.ok) throw new Error("Failed to fetch signals");
        const signalData = await signalRes.json();
        setSignals(signalData.signals || []);

        // ✅ Fetch admin overrides
        const overrideRes = await fetch("http://localhost:4000/api/admin/override", {
          credentials: "include", // 🔐 Include cookie
        });
        if (!overrideRes.ok) throw new Error("Failed to fetch overrides");
        const overrideData = await overrideRes.json();
        setOverrides({
          manualDispatch: overrideData.manualDispatch,
          filterOverride: overrideData.filterOverride,
          forcedRegime: overrideData.forcedRegime || "none",
        });
      } catch (err: any) {
        console.error("📉 useProDashboardData Error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    signals,
    loading,
    error,
    overrides,
    setOverrides,
  };
}
