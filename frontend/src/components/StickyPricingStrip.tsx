// src/pages/marketing/sections/StickyPricingStrip.tsx
import React from "react";

export default function StickyPricingStrip() {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:flex items-center justify-center bg-black border-t border-zinc-700 py-3 px-6">
        <a
          href="#pricing"
          className="bg-crimson hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg"
        >
          Choose Your Plan
        </a>
      </div>
    );
  }
  