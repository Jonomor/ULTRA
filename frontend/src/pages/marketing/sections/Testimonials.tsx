import { motion } from "framer-motion";
import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "ULTRA+ helped me go from break-even to profitable in 2 weeks.",
      name: "James L.",
    },
    {
      quote: "I use PRO+ every day — the dashboard & filters are game changers.",
      name: "Sophia M.",
    },
    {
      quote: "I’ve tested 20+ tools. This is the only one that earns its cost.",
      name: "David R.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black to-zinc-900 text-white py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 glow text-crimson">
          What Traders Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-xl text-left hover:shadow-crimson-glow transition"
            >
              <p className="text-lg text-gray-100 italic mb-4 leading-relaxed">“{t.quote}”</p>
              <div className="mt-4">
                <span className="block text-sm font-semibold text-zinc-400">
                  — {t.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
