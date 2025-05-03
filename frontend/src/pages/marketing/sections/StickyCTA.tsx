// src/pages/marketing/sections/StickyCTA.tsx

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white px-4 py-3 md:hidden flex items-center justify-between shadow-lg border-t border-zinc-800">
      <span className="text-sm font-medium">
        THE ULTRA SYSTEM IS AI ACTIVATED.
      </span>

      <a
        href="#pricing"
        className="ml-4 bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
      >
        View Plans
      </a>
    </div>
  );
}
