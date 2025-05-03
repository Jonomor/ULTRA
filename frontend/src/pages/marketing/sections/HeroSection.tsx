import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const orbitronFont = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap');
`;

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-black text-white overflow-hidden pt-32 pb-24">
      <style>{orbitronFont}</style>

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-15 z-0"
      >
        <source src="/videos/ultra_intro.mp4" type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight
                     [font-family:'Orbitron',_sans-serif]
                     text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-white to-zinc-400
                     drop-shadow-[0_2px_2px_rgba(255,0,0,0.6)] sm:drop-shadow-[0_4px_6px_rgba(255,0,0,0.9)]
                     glow"
        >
          THE ULTRA SYSTEM
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg sm:text-xl text-zinc-300"
        >
          Precision-built bots. AI-enhanced execution. Battle-tested for today's markets.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          <span>⚡ 99.9% Uptime</span>
          <span>📡 0.3s Signal Dispatch</span>
          <span>💰 $3.2M Traded Volume</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
        >
          <button
            onClick={() => navigate("/pricing")}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition duration-300"
          >
            🚀 Deploy Your Bot
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-full shadow-md transition duration-300"
          >
            📈 View Live Signals
          </button>
        </motion.div>
      </div>
    </section>
  );
}
