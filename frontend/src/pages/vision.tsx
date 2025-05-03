// src/pages/vision.tsx
import { useEffect } from 'react';

export default function Vision() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      <div className="max-w-4xl mx-auto space-y-14">

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600 mb-4">The ULTRA VISION</h1>
          <p className="text-gray-300 text-xl mb-6">Machine-trained. Voice-commanded. Trader-deployed.</p>
          <iframe
            className="rounded-lg shadow-lg mx-auto"
            width="100%" height="315"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Meet ULTRA+ in 60 Seconds"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Why It Exists */}
        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-2">🧠 Why ULTRA SYSTEM Exists</h2>
          <p className="text-gray-400">
            Retail traders are outgunned. Institutions move with precision. ULTRA SYSTEM levels the field.
            This isn't a tool — it's a precision AI trader. Trained by data. Tuned for live market combat.
          </p>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">🛠 The Intelligence Stack</h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>🧠 ULTRA+ / PRO+ / SCALPTR / SNYPER strategies</li>
            <li>⚡ WebSocket-triggered dispatch & regime filters</li>
            <li>🎙️ GPT-powered voice control (Strategist Juno)</li>
            <li>📉 Live data overlays & PineScript execution</li>
            <li>📲 Fully PWA-wrapped & mobile ready</li>
          </ul>
        </section>

        {/* Juno Logs */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-400 mb-2">🧠 Juno Logs</h2>
          <div className="space-y-2 text-sm text-gray-400 border-l-2 border-indigo-500 pl-4">
            <p><strong>[2024.11.08]</strong> — Signal engine v1 compiled on TradingView v6</p>
            <p><strong>[2025.01.19]</strong> — AI macro filters integrated (PRO+)</p>
            <p><strong>[2025.02.10]</strong> — Juno voice module activated. Mission: vocal command autonomy.</p>
            <p><strong>[2025.03.01]</strong> — ULTRA SYSTEM enters private alpha with live dispatching</p>
          </div>
        </section>

        {/* What We're Building */}
        <section>
          <h2 className="text-2xl font-bold text-green-400 mb-2">🚀 What We’re Building</h2>
          <p className="text-gray-400">
            A real-time, AI-powered, voice-controllable signal command system.
            One that adapts to macro regime shifts, runs in your pocket, and outpaces laggy indicators by a mile.
          </p>
          <p className="text-gray-400 mt-2 italic">This is not a script. It's a system. And it's yours.</p>
        </section>

        {/* Powered By */}
        <section>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">🧬 Powered By</h2>
          <p className="text-sm text-gray-500">
            TradingView · GPT-4 · Firebase · Supabase · Render · Capacitor · Tailwind · WebSockets
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-10">
          <a href="/dashboard" className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-3 rounded">
            🚀 Launch Command Center
          </a>
        </div>
      </div>
    </div>
  )
}
