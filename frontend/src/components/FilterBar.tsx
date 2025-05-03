// src/components/FilterBar.tsx
import React from "react";
import { motion } from "framer-motion";

interface FilterBarProps {
  filters: string[];
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

// New: Color Map by Bot
const botColors: { [key: string]: string } = {
  ultra: "bg-purple-700 hover:bg-purple-800 text-white",
  pro: "bg-blue-700 hover:bg-blue-800 text-white",
  scalptr: "bg-green-700 hover:bg-green-800 text-white",
  snyper: "bg-yellow-600 hover:bg-yellow-700 text-black",
};

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide border transition-all ${
            activeFilter === filter
              ? `${botColors[filter] || "bg-white text-red-600"} border-white shadow-[0_0_8px_rgba(255,0,0,0.6)]`
              : "bg-zinc-800 text-red-400 border-zinc-700 hover:bg-zinc-700"
          }`}
        >
          {filter.toUpperCase()}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onFilterChange(null)}
        className="px-4 py-1.5 rounded-full text-sm font-bold bg-zinc-800 text-red-400 border border-zinc-700 hover:bg-zinc-700 transition"
      >
        CLEAR
      </motion.button>
    </div>
  );
}
