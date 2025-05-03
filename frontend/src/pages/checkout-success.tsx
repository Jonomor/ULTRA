// src/pages/checkout-success.tsx
import React from "react";
import { motion } from "framer-motion";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-red-500 mb-6 tracking-wider"
        style={{
          textShadow: `
            0 0 5px #ff4d4d, 
            0 0 10px #ff1a1a, 
            0 0 20px #ff1a1a, 
            0 0 30px #ff1a1a, 
            0 0 40px #ff1a1a, 
            0 0 55px #ff0000
          `
        }}
      >
        Welcome to The ULTRA SYSTEM
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-400 mb-8 max-w-xl"
      >
        Your journey to elite precision trading starts now.  
        Join the ULTRA Discord to access signals, setups, and updates.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="https://discord.gg/YOUR_DISCORD_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition"
        >
          Join Discord Community
        </a>

        <a
          href="/dashboard"
          className="bg-zinc-800 hover:bg-white hover:text-black border border-zinc-700 font-semibold px-8 py-4 rounded-2xl transition"
        >
          Go to Dashboard
        </a>
      </motion.div>
    </div>
  );
}
