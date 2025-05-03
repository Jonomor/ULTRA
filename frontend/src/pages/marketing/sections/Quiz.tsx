// src/pages/marketing/sections/Quiz.tsx
import { useEffect, useRef, useState } from "react";
import "../../../ultra-theme.css";
import React from "react";

interface QuizProps {
  onComplete: ({ persona, email }: { persona: "ultra" | "pro"; email: string }) => void;
}

const quizSteps = [
  { question: "How long have you been trading?", options: ["Just starting", "1–2 years", "3+ years"] },
  { question: "What’s your trading style?", options: ["Scalping", "Swing Trading", "Day Trading"] },
  { question: "Preferred market?", options: ["ES Futures", "Crypto", "Stocks/FX"] },
  { question: "What matters most to you?", options: ["Simplicity", "Speed", "Control"] },
  { question: "Are you looking for automation?", options: ["Yes – automate it", "No – just alerts", "Not sure yet"] },
];

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (answer: string) => {
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);

    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      const persona = nextAnswers[0] === "Just starting" ? "ultra" : "pro";
      const email = ""; // replace with email capture if you collect in quiz
      localStorage.setItem("quizAnswers", JSON.stringify(nextAnswers));
      localStorage.setItem("quizPersona", persona);
      onComplete({ persona, email });
    }
  };

  useEffect(() => {
    const progressPercent = ((step + 1) / quizSteps.length) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${progressPercent}%`;
    }
  }, [step]);

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* Replace img with video */}
        <video 
          src="/videos/bvb.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full rounded-xl mb-6"
        />
        
        <div className="mb-4 text-sm text-gray-400">
          Step {step + 1} of {quizSteps.length}
        </div>
        <div className="progress-bar-wrapper mb-6">
          <div ref={progressRef} className="progress-bar-fill"></div>
        </div>

        {quizSteps[step] && (
          <>
            <h2 className="text-2xl font-bold mb-6">{quizSteps[step].question}</h2>

            <div className="flex flex-col gap-4">
              {quizSteps[step].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="py-3 px-6 rounded-xl font-semibold shadow-md transition-all bg-[var(--accent)] text-white hover:bg-red-700"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
