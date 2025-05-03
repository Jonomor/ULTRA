// src/pages/marketing/sections/LiveStats.tsx
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import "@/styles/stat-animations.css"; // sparkle + glow styles

const stats = [
  { label: "Win Rate", value: 92.3, suffix: "%" },
  { label: "Trades Executed", value: 13871 },
  { label: "Avg. Daily ROI", value: 1.27, prefix: "+", suffix: "%" },
];

export default function LiveStats() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="bg-black text-white px-4 py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-12 glow"
        >
          Live Strategy Performance
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, index) => {
            const animatedValue = useCountUp({
              end: stat.value,
              duration: 1500,
            });

            const isCounting =
              Math.floor(animatedValue) < Math.floor(stat.value);

            return (
              <motion.div
                key={stat.label}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="absolute inset-0 -z-10 sparkle" />
                <div
                  className={`text-4xl font-extrabold text-crimson ${
                    isCounting ? "glow" : ""
                  }`}
                >
                  {stat.prefix || ""}
                  {stat.value % 1 !== 0
                    ? animatedValue.toFixed(2)
                    : animatedValue.toLocaleString()}
                  {stat.suffix || ""}
                </div>
                <div className="text-neutral-400 mt-2 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
