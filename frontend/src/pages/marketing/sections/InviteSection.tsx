// src/pages/marketing/sections/InviteSection.tsx
import React from "react";
interface InviteSectionProps {
  plan?: "ultra" | "pro";
}

export default function InviteSection({ plan = "ultra" }: InviteSectionProps) {
  return (
    <section className="bg-zinc-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 glow">
          Ready to Unlock {plan === "pro" ? "PRO+" : "ULTRA+"}?
        </h2>
        <a
          href="#pricing"
          className="inline-block mt-4 bg-crimson hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
        >
          View Plans
        </a>
      </div>
    </section>
  );
}
