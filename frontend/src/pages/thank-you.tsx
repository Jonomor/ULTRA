// src/pages/thank-you.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

const orbitronFont = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap');
`;

export default function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Thank You | ULTRA SYSTEM";
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center p-8 relative">
      <style>{orbitronFont}</style>

      {/* Background Video (Optional) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      >
        <source src="/videos/ultra_intro.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-2xl">
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl sm:text-7xl text-green-400 mb-6"
        >
          ✅
        </motion.div>

        {/* Thank You Text */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 [font-family:'Orbitron',_sans-serif]"
        >
          Welcome to the ULTRA System!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-zinc-300 mb-8"
        >
          Your account is being activated.  
          <br />Check your email for your Welcome Pack shortly.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={() => navigate("/dashboard")}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition duration-300"
        >
          🚀 Go to Dashboard
        </motion.button>
      </div>
    </section>
  );
}
