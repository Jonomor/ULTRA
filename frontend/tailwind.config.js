/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // ✅ disables Tailwind reset
  },
  theme: {
    extend: {
      boxShadow: {
        'crimson-glow': '0 0 15px rgba(255, 0, 80, 0.4)',
      },
      animation: {
        glowPulse: "glowPulse 1.5s ease-in-out infinite",
        sparkleShift: "sparkleShift 3s infinite linear",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { textShadow: "0 0 0px rgba(255, 0, 60, 0.6)" },
          "50%": { textShadow: "0 0 12px rgba(255, 0, 80, 0.9)" },
        },
        sparkleShift: {
          "0%": { transform: "scale(1) translateY(0)", opacity: "0.8" },
          "50%": { transform: "scale(1.05) translateY(-3px)", opacity: "1" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};


