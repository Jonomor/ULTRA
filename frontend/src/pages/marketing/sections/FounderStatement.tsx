// src/pages/marketing/sections/FounderStatement.tsx
import React from "react";
export default function FounderStatement() {
  return (
    <section className="bg-zinc-950 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 glow">Why I Built This</h2>
        <p className="text-lg text-zinc-300">
          I’ve traded for years. And I’ve tested every so-called “bot” out there. Most are hype-driven,
          laggy, and built by marketers — not traders.
        </p>
        <p className="text-lg text-zinc-400 mt-4">
          ULTRA is different. Every condition, filter, and execution block was engineered to mirror how
          a real operator makes decisions — fast, structured, and with conviction.
        </p>
        <p className="text-lg text-crimson mt-4 font-semibold">
          ULTRA isn’t another tool. It’s your control system.
        </p>
        <p className="text-md text-zinc-500 mt-6 italic">– Jonomor</p>
      </div>
    </section>
  );
}
