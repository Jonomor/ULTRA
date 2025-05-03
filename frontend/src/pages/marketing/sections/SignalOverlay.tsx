import React from "react";

interface SignalOverlayProps {
  activePlan: "ultra" | "pro";
  signals: {
    confidence?: { score: number; source?: string };
    macroOK?: boolean;
    regimeOK?: boolean;
    drawdownProtection?: boolean;
    manualDispatch?: boolean;
    filterOverride?: boolean;
    forcedRegime?: boolean;
  }[];
  gptComment: string;
}

const SignalOverlay: React.FC<SignalOverlayProps> = ({ activePlan, signals, gptComment }) => {
  const latest = signals?.[0];
  if (!latest) return null;

  const getBadgeColor = (status: boolean | string | undefined, override?: boolean) => {
    if (override) return "bg-yellow-600";
    return status ? "bg-green-600" : "bg-red-700";
  };

  const score = Math.round((latest.confidence?.score || 0) * 100);
  const widthClass =
    score >= 90 ? "w-[90%]" :
    score >= 80 ? "w-[80%]" :
    score >= 70 ? "w-[70%]" :
    score >= 60 ? "w-[60%]" :
    score >= 50 ? "w-[50%]" :
    score >= 40 ? "w-[40%]" :
    score >= 30 ? "w-[30%]" :
    score >= 20 ? "w-[20%]" :
    score >= 10 ? "w-[10%]" :
    "w-[5%]";

  const confidenceColor =
    score > 80 ? "bg-green-500" :
    score > 60 ? "bg-yellow-400" :
    "bg-red-500";

  return (
    <div className="fixed top-24 right-6 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl p-4 w-80 space-y-3 text-sm font-mono">
      <div className="text-xs font-bold text-gray-400 mb-1">
        {activePlan === "pro" ? "ULTRA PRO+" : "ULTRA+"} – Live Signal Diagnostics
      </div>

      {latest.confidence && (
        <div>
          <div className="flex justify-between text-gray-300">
            <span>🔄 AI Regime Confidence</span>
            <span>{latest.confidence.source ?? "GPT"}</span>
          </div>
          <div className="w-full bg-zinc-700 h-2 rounded mt-1">
            <div className={`h-2 rounded ${confidenceColor} ${widthClass}`} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        <span
          title="Macro condition check"
          className={`px-2 py-1 rounded text-white text-xs ${getBadgeColor(latest.macroOK, latest.filterOverride)}`}
        >
          📉 Macro
        </span>
        <span
          title="Regime alignment check"
          className={`px-2 py-1 rounded text-white text-xs ${getBadgeColor(latest.regimeOK, latest.forcedRegime)}`}
        >
          🔁 Regime
        </span>
        <span
          title="Drawdown protection active"
          className={`px-2 py-1 rounded text-white text-xs ${getBadgeColor(latest.drawdownProtection)}`}
        >
          🛡️ Drawdown
        </span>
        <span
          title="Manual dispatch override"
          className={`px-2 py-1 rounded text-white text-xs ${getBadgeColor(latest.manualDispatch)}`}
        >
          🚀 Manual
        </span>
      </div>

      <div className="text-xs mt-3 text-zinc-300 border-t border-zinc-700 pt-2">
        🧠 <span className="text-green-400">GPT:</span> {gptComment || "No comment yet."}
      </div>
    </div>
  );
};

export default SignalOverlay;
