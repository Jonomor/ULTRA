// src/pages/marketing/sections/BotProfiles.tsx
import React from "react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../../../components/FilterBar'; // 🆕 Import FilterBar
import ultraLogo from "../../../assets/ULTRA+.png";
import proLogo from "../../../assets/ULTRA PRO+.png";
import scalptrLogo from "../../../assets/SCALPR.png";
import snyperLogo from "../../../assets/SNYPER.png";

interface BotCard {
  logo: string;
  name: string;
  tagline: string;
  features: string[];
  badgeColor: string;
  linkPath: string;
  tags: string[];
}

const bots: BotCard[] = [
  {
    logo: ultraLogo,
    name: "Core Strategy Unit",
    tagline: "The cleanest breakout logic, filtered and refined for real-time execution.",
    features: [
      "📈 Structured Breakout Logic",
      "🛡️ Risk-Filtered Entries",
      "📊 Real-Time Stats Dashboard",
      "📍 Volume + Session Guards",
    ],
    badgeColor: "bg-crimson",
    linkPath: "/bots/ultra",
    tags: ["ultra", "breakout"],
  },
  {
    logo: proLogo,
    name: "AI Hybrid Unit",
    tagline: "Self-sensing. Externally aware. Adaptable in all conditions.",
    features: [
      "🧠 AI Regime Filtering",
      "🔌 Webhook Signal Input (Make.com, models)",
      "📶 Volatility Awareness",
      "🧪 Adaptive Presets + Mode Switching",
    ],
    badgeColor: "bg-indigo-600",
    linkPath: "/bots/pro",
    tags: ["pro", "ai", "adaptive"],
  },
  {
    logo: scalptrLogo,
    name: "Precision Scalping Engine",
    tagline: "Micro-timeframe targeting. Seconds matter. Zero lag logic.",
    features: [
      "⚙️ Multi-tick Entry Logic",
      "📍 VWAP + Order Flow Triggers",
      "🕒 1s–15s Scalping Modes",
      "📈 Real-Time Price Compression Detection",
    ],
    badgeColor: "bg-amber-500",
    linkPath: "/bots/scalptr",
    tags: ["ultra", "scalping", "micro"],
  },
  {
    logo: snyperLogo,
    name: "AI Tactical Override Unit",
    tagline: "Targets high-probability setups with intelligence-based overrides.",
    features: [
      "🎯 Swing Sniper Logic",
      "🤖 External AI Integration",
      "📦 Risk-Aware Entry Zones",
      "📡 Macro-Sentiment Relay Ready",
    ],
    badgeColor: "bg-green-600",
    linkPath: "/bots/snpyer",
    tags: ["pro", "ai", "override"],
  },
];

export default function BotProfiles() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filters = ["ultra", "pro", "breakout", "ai", "scalping", "override"];

  const filteredBots = activeFilter
    ? bots.filter(bot => bot.tags.includes(activeFilter))
    : bots;

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Updated h2 */}
        <h2 id="tactical-units" className="text-4xl font-extrabold mb-12 text-crimson glow tracking-wide">
          Tactical Units
        </h2>

        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter ?? "all"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredBots.map((bot, idx) => (
              <motion.div
                key={bot.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-700 hover:border-white transition hover:shadow-crimson-glow"
              >
                <motion.img
                  src={bot.logo}
                  alt={bot.name}
                  className="h-8 w-auto mx-auto mb-3"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h3 className="text-xl font-bold">{bot.name}</h3>
                <p className="text-sm text-zinc-400 mt-2 mb-4">{bot.tagline}</p>
                <ul className="text-left text-sm space-y-2 text-zinc-300">
                  {bot.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
                <a
                  href={bot.linkPath}
                  className="mt-6 inline-block bg-crimson hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition"
                >
                  Learn More
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredBots.length === 0 && (
          <p className="text-gray-400 mt-10">No units match this filter.</p>

        )}
      </div>
    </section>
  );
}
