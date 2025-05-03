// src/pages/marketing/sections/Footer.tsx
import React from "react";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="text-sm text-gray-400">
          Questions?{" "}
          <a
            href="mailto:support@jonomor.com"
            className="underline text-crimson hover:text-red-500 transition"
          >
            support@jonomor.com
          </a>
        </p>

        <p className="text-base italic text-zinc-500">
          The market is chaos. Your edge is clarity.
        </p>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} ULTRA+ / ULTRA PRO+ by Jonomor. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
