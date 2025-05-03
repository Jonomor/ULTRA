// src/pages/marketing/sections/ComparisonTable.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "../../../components/FilterBar";
import { useFilter } from "../../../context/FilterContext";

export default function ComparisonTable() {
  const { selectedFilter, setSelectedFilter } = useFilter();

  const features = [
    ["Market Signals", true, true, true, true],
    ["Email Alerts", true, true, false, false],
    ["Dashboard Control", false, true, true, true],
    ["Multi-Market (Stocks, Crypto, FX)", false, true, true, true],
    ["Drawdown Guard", false, true, false, false],
    ["Volatility/Structure Filters", false, true, true, true],
    ["Strategy Mode Selector", false, true, false, false],
  ];

  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 glow animate-glowPulse">
          📊 Compare Tactical Units
        </h2>

        {/* Plan Filter */}
        <FilterBar
  filters={["ultra", "pro", "scalptr", "snyper"]}
  activeFilter={selectedFilter}
  onFilterChange={(filter) => setSelectedFilter(filter ?? "all")}
/>



        <div className="overflow-x-auto rounded-lg shadow border border-zinc-800 mt-6">
          <table className="min-w-full bg-zinc-900 text-sm">
            <thead className="bg-zinc-800 text-crimson uppercase text-xs font-semibold">
              <tr>
                <th className="p-4 text-left">Feature</th>
                {(selectedFilter === "all" || selectedFilter === "ultra") && (
                  <th className="p-4 text-center">ULTRA+</th>
                )}
                {(selectedFilter === "all" || selectedFilter === "pro") && (
                  <th className="p-4 text-center bg-indigo-900 text-indigo-300">PRO+</th>
                )}
                {(selectedFilter === "all" || selectedFilter === "scalptr") && (
                  <th className="p-4 text-center bg-green-900 text-green-300">SCALPTR</th>
                )}
                {(selectedFilter === "all" || selectedFilter === "snyper") && (
                  <th className="p-4 text-center bg-pink-900 text-pink-300">SNYPER</th>
                )}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {features.map(([feature, ultra, pro, scalptr, snyper], i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-zinc-800 hover:bg-zinc-800 transition"
                  >
                    <td className="p-4 font-medium text-zinc-200">{feature}</td>
                    {(selectedFilter === "all" || selectedFilter === "ultra") && (
                      <td className="p-4 text-center">{ultra ? "✔️" : <span className="text-crimson">❌</span>}</td>
                    )}
                    {(selectedFilter === "all" || selectedFilter === "pro") && (
                      <td className="p-4 text-center">{pro ? "✔️" : <span className="text-crimson">❌</span>}</td>
                    )}
                    {(selectedFilter === "all" || selectedFilter === "scalptr") && (
                      <td className="p-4 text-center">{scalptr ? "✔️" : <span className="text-crimson">❌</span>}</td>
                    )}
                    {(selectedFilter === "all" || selectedFilter === "snyper") && (
                      <td className="p-4 text-center">{snyper ? "✔️" : <span className="text-crimson">❌</span>}</td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          PRO+ includes full AI signal control, macro filtering, and risk override automation.
        </p>
      </div>
    </section>
  );
}
