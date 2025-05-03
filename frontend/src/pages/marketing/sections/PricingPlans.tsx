// src/pages/marketing/sections/PricingPlans.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "../../../components/FilterBar";

export default function PricingPlans() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const pricingData = {
    ultra: {
      name: "ULTRA+",
      monthly: "$49/mo",
      yearly: "$490/yr",
      description: "Built for retail traders who want automated edge.",
      features: [
        "Real-time trading signals",
        "Risk-calibrated entries",
        "Real-time Email alerts",
        "Backtest insights",
      ],
      cta: "Upgrade Your Trading Experience",
      comingSoon: false,
    },
    pro: {
      name: "ULTRA PRO+",
      monthly: "$149/mo",
      yearly: "$1490/yr",
      description: "Designed for full-time traders needing speed and control.",
      features: [
        "All ULTRA+ features included",
        "Strategy Mode Selector",
        "Multi-market Support (Futures, Stocks, Crypto)",
        "Volatility & Structure Filters",
        "Regime Mode + AI Signal Override",
        "Adaptive Preset Scaling",
        "Smart Dashboard + Drawdown Guard",
      ],
      cta: "Upgrade Your Lifestyle",
      comingSoon: false,
    },
    scalptr: {
      name: "SCALPTR",
      monthly: "Coming Soon",
      yearly: "Coming Soon",
      description: "Ultra-high-frequency scalping logic for pro traders.",
      features: [
        "AI-Optimized Micro Scalping",
        "Smart Order Management",
        "Low-Latency Execution Core",
        "Exchange Spread Detection",
      ],
      cta: "Coming Soon",
      comingSoon: true,
    },
    snyper: {
      name: "SNYPER",
      monthly: "Coming Soon",
      yearly: "Coming Soon",
      description: "Precision sniper entries on high-volatility assets.",
      features: [
        "Volatility Range Compression Detection",
        "Snipe Breakouts and Fakeouts",
        "AI Timing Optimization",
        "Cross-Asset Radar Modes",
      ],
      cta: "Coming Soon",
      comingSoon: true,
    },
  };

  const filters = ["ultra", "pro", "scalptr", "snyper"];

  const plansToShow = activeFilter
    ? Object.entries(pricingData).filter(([key]) => key === activeFilter)
    : Object.entries(pricingData);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was a problem starting checkout.");
    }
  };

  return (
    <section id="pricing" className="bg-black text-white py-20 px-6 md:px-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 glow">Pricing</h2>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex gap-2 bg-zinc-800 rounded-full px-2 py-1 shadow-inner border border-zinc-700 mb-6">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              billing === "monthly"
                ? "bg-red-600 text-white shadow"
                : "bg-zinc-700 text-red-400 hover:text-red-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              billing === "yearly"
                ? "bg-red-600 text-white shadow"
                : "bg-zinc-700 text-red-400 hover:text-red-500"
            }`}
          >
            Yearly <span className="text-green-400">(2 months free)</span>
          </button>
        </div>

        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={(filter) => setActiveFilter(filter ?? null)}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter ?? "all"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto"
        >
          {plansToShow.map(([key, selected], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              className="flex flex-col justify-between bg-zinc-800 rounded-2xl p-6 text-center shadow-lg border border-zinc-700 hover:border-white transition hover:shadow-crimson-glow min-h-[480px] mx-auto"
            >
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-extrabold mb-4 tracking-widest text-white uppercase"
                style={{
                  textShadow:
                    "0 0 5px #ff4d4d, 0 0 10px #ff4d4d, 0 0 20px #ff1a1a, 0 0 30px #ff1a1a, 0 0 40px #ff1a1a, 0 0 55px #ff0000",
                }}
              >
                {selected.name}
              </motion.h3>

              <p className="text-red-500 text-3xl font-extrabold mb-6">
                {selected[billing]}
              </p>

              <p className="text-gray-400 mb-6">{selected.description}</p>

              <ul className="text-left space-y-2 mb-6">
                {selected.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-red-500">✔️</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 mb-2">
                {selected.comingSoon
                  ? "Launching soon. Get early access updates."
                  : "Start your future now. Cancel anytime."}
              </p>

              {selected.comingSoon ? (
                <button
                  disabled
                  className="inline-block bg-zinc-700 text-gray-400 font-semibold px-6 py-3 rounded-xl opacity-50 cursor-not-allowed"
                >
                  {selected.cta}
                </button>
              ) : (
                <button
                  onClick={handleCheckout}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  {selected.cta}
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
