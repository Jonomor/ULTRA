// src/pages/about.tsx
import React from "react";
export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-gray-100 bg-black min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-white">About ULTRA by Jonomor</h1>

      <p className="mb-4 text-lg text-zinc-300">
        ULTRA isn’t just another bot. It’s a precision-grade trading system, engineered to respond
        like a high-performance operator under pressure. No gimmicks. No delays. Just tactical execution.
      </p>

      <p className="mb-4 text-lg text-zinc-400">
        Created by <strong>Jonomor</strong> — a trader who grew tired of flashy tools with no real edge — ULTRA was
        built from the ground up to mirror the logic and discipline of live traders. From adaptive filters to real-time volume
        validation, everything is purpose-built.
      </p>

      <p className="mb-8 text-lg text-zinc-400">
        This system is designed to simplify complexity without sacrificing precision.
        Whether you're deploying ULTRA+ or AI-powered ULTRA PRO+, you're not guessing — you're executing with conviction.
      </p>

      <hr className="border-zinc-700 my-8" />

      <h2 className="text-2xl font-bold mb-4 text-white">Why I Built This</h2>
      <p className="mb-4 text-zinc-400">
        I’ve traded for years. I’ve tested the “top” bots. I’ve paid for the dashboards. What I saw was mostly noise.
        ULTRA is my answer. A fully transparent, modular system that gives me control — and gives you edge.
      </p>
      <p className="italic text-zinc-500 mb-6">– Jonomor</p>

      <a
        href="/dashboard"
        className="inline-block bg-crimson hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition"
      >
        🚀 Launch Command Center
      </a>
    </div>
  );
}

