import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  link?: string;
  group?: string;
};

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const faqs: FAQ[] = [
    { id: "1", question: "How does ULTRA+ generate signals?", answer: "It uses breakout-trend logic with EMA filters and volume confirmation." },
    { id: "2", question: "What’s the difference between ULTRA+ and PRO+?", answer: "PRO+ includes AI, regime overrides, and self-adaptive filters." },
    { id: "3", question: "Can I override AI decisions?", answer: "Yes, via the admin dashboard controls." },
    { id: "4", question: "Is this live or simulated?", answer: "By default it runs in strategy mode (simulated). Webhooks allow live execution." },
    { id: "5", question: "How do I enable drawdown protection?", answer: "Enable it in the PRO+ dashboard using the checkbox." },
    { id: "6", question: "What assets does this support?", answer: "Crypto, Futures, and Stocks (preset logic adjusts automatically)." },
    { id: "7", question: "Where can I view my past signals?", answer: "Check the Signal Log page." },
    { id: "8", question: "How often are signals updated?", answer: "Live via WebSocket or webhook — instantly when triggered." },
    { id: "9", question: "Can I export performance data?", answer: "Currently not yet, but it's coming." },
    { id: "10", question: "Does it work on mobile?", answer: "Yes, it's a responsive PWA." },
    { id: "11", question: "Can I customize the strategy?", answer: "ULTRA+ is fixed logic; PRO+ offers overrides." },
    { id: "12", question: "Do I need a TradingView account?", answer: "Yes, for charting. Webhooks work separately." }
  ];

  const grouped = faqs.reduce((acc, faq) => {
    const key = faq.group || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">Frequently Asked Questions ❓</h1>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-10">
          <h2 className="text-xl font-bold text-red-400 mb-4">{group}</h2>
          <div className="space-y-4">
            {items.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-3 font-medium text-lg rounded-t-lg transition-all"
                >
                  {faq.question}
                </button>
                {expanded === faq.id && (
                  <div className="bg-zinc-900 text-zinc-100 px-4 py-4 rounded-b-lg border-t border-red-700">
                    <p>{faq.answer}</p>
                    {faq.link && (
                      <p className="mt-2">
                        <Link to={faq.link} className="underline text-blue-400">
                          🔗 Go to section
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
