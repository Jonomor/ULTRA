// src/pages/marketing/sections/Features.tsx

import { motion } from "framer-motion";

interface FeaturesProps {
  plan?: "ultra" | "pro";
}

const featureData = {
  ultra: [
    "📈 Clean breakout logic with adaptive filters",
    "🎯 Session + volume precision targeting",
    "🛡️ Built-in risk controls with trailing exits",
    "📊 Real-time dashboard: trades, stats, and edge",
  ],
  pro: [
    "✅ Includes all ULTRA+ core logic",
    "🧠 AI-regime mode for trend/range adaptation",
    "🌐 External webhook input (Make.com, models, macros)",
    "📊 Diagnostic dashboard with live signal state",
  ],
};

export default function Features({ plan = "ultra" }: FeaturesProps) {
  const features = featureData[plan];

  return (
    <section className="bg-zinc-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center glow">
          What You Get with {plan === "pro" ? "ULTRA PRO+" : "ULTRA+"}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg leading-relaxed">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`rounded-xl bg-zinc-800 p-4 shadow-md transition-all group border ${
                plan === "pro" && i === 0
                  ? "border-crimson relative"
                  : "border-zinc-700"
              }`}
            >
              {plan === "pro" && i === 0 && (
                <span className="absolute top-2 right-2 text-xs bg-crimson text-white px-2 py-0.5 rounded-full uppercase font-bold">
                  Core+
                </span>
              )}
              <span className="group-hover:text-crimson transition">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
