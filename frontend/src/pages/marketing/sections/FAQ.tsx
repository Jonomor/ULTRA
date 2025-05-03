import { useState } from "react";
import React from "react";

const faqs = [
  { question: "Is this bot beginner-friendly?", answer: "Yes, ULTRA+ is engineered for both beginners and full-time traders." },
  { question: "Does ULTRA PRO+ work across all markets?", answer: "Yes. Futures, Stocks, Crypto, Forex. It dynamically adapts." },
  { question: "Can I cancel anytime?", answer: "Yes, cancel instantly inside your dashboard. No lock-ins." },
  { question: "What makes AI signals special?", answer: "ULTRA PRO+ fuses price structure with real-world AI data for smarter signals." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-red-500 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-12 glow">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col items-center gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full max-w-2xl bg-zinc-900 rounded-xl border border-crimson p-4 shadow hover:shadow-crimson-glow transition-all">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center text-lg md:text-xl font-semibold text-crimson"
              >
                <span>{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-red-400 text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
