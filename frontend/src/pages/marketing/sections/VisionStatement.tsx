import React from "react";

export default function VisionStatement() {
  return (
    <section className="bg-black text-white py-20 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-crimson">
          We believe real edge is built — not bought.
        </h2>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          ULTRA exists because most bots today are hype-filled black boxes.
          <br className="hidden md:block" />
          We’re here to change that. Every module, strategy, and alert in this system is engineered for one thing:{" "}
          <span className="text-white font-semibold">precision</span>.
        </p>
        <p className="mt-6 text-gray-500 italic text-base">
          Tactical-grade intelligence — for traders who treat this like a craft, not a gamble.
        </p>
      </div>

      {/* Background pulse glow effect (non-interactive) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-zinc-800 to-black opacity-30 pointer-events-none"></div>
    </section>
  );
}
