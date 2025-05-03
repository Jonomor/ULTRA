// src/pages/marketing/sections/EarlyAccess.tsx

import { useState } from "react";
import { motion } from "framer-motion";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("YOUR_MAILERLITE_FORM_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        console.error("MailerLite Error", res.status);
      }
    } catch (error) {
      console.error("MailerLite Error", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-red-500 mb-6 tracking-wider uppercase"
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
        Secure Early Access
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-400 mb-8 max-w-xl"
      >
        Be the first to access SCALPTR, SNYPER, and new ULTRA+ launches.
      </motion.p>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-green-600 px-6 py-3 rounded-2xl font-semibold"
        >
          ✅ Thank you! You’re on the Early Access list.
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your best email..."
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-72"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-md"
          >
            Join Early Access
          </button>
        </motion.form>
      )}
    </div>
  );
}
