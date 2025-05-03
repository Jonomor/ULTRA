import { useEffect, useState } from "react";
import "../../ultra-theme.css";

import Quiz from "./sections/Quiz";
import EmailCapture from "./sections/EmailCapture";
import Features from "./sections/Features";
import BotProfiles from "./sections/BotProfiles";
import Performance from "./sections/Performance";
import LiveStats from "./sections/LiveStats";
import PricingPlans from "./sections/PricingPlans";
import Testimonials from "./sections/Testimonials";
import VisionStatement from "./sections/VisionStatement";
import FounderStatement from "./sections/FounderStatement";
import FAQ from "./sections/FAQ";
import VideoSection from "./sections/VideoSection";
import InviteSection from "./sections/InviteSection";
import Footer from "./sections/Footer";
import StickyCTA from "./sections/StickyCTA";
import SignalOverlay from "./sections/SignalOverlay";
import { FilterProvider } from "../../context/FilterContext";

export default function LandingPage() {
  const [stage, setStage] = useState<"quiz" | "email" | "page">("quiz");
  const [activePlan] = useState<"ultra" | "pro">("ultra");
  const [quizPersona, setQuizPersona] = useState<"ultra" | "pro" | null>(null);
  const [quizEmail, setQuizEmail] = useState<string | null>(null);
  const [liveSignals, setLiveSignals] = useState<any[]>([]);
  const [gptComment, setGptComment] = useState<string>("");

  // ✅ Guarded logic for query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("page") === "home") {
        setStage("page");
      }
    }
  }, []);

  // ✅ Safe path check (no useLocation)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/pricing") {
        setStage("page");
      }
    }
  }, []);

  // ✅ Signal fetch guarded
  useEffect(() => {
    if (stage === "page") {
      const fetchSignals = async () => {
        try {
          const res = await fetch("/api/signals/recent");
          const json = await res.json();
          if (Array.isArray(json)) {
            setLiveSignals(json);
            if (json[0]?.comment) {
              setGptComment(json[0].comment);
            }
          }
        } catch (err) {
          console.error("Failed to fetch signals:", err);
        }
      };

      fetchSignals();
      const interval = setInterval(fetchSignals, 10000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="bg-black text-white min-h-screen">
      <StickyCTA />
      <FilterProvider>
        {stage === "quiz" && (
          <Quiz
            onComplete={({ persona, email }) => {
              setQuizPersona(persona);
              setQuizEmail(email);
              setStage("email");
            }}
          />
        )}

        {stage === "email" && (
          <EmailCapture
            onSubmit={() => setStage("page")}
            initialEmail={quizEmail ?? ""}
            persona={quizPersona ?? "ultra"}
          />
        )}

        {stage === "page" && (
          <>
            <SignalOverlay
              activePlan={activePlan}
              signals={liveSignals}
              gptComment={gptComment}
            />
            <Features plan={activePlan} />
            <BotProfiles />
            <Performance plan={activePlan} />
            <LiveStats />
            <PricingPlans />
            <Testimonials />
            <VisionStatement />
            <FounderStatement />
            <FAQ />
            <VideoSection />
            <InviteSection />
            <Footer />
          </>
        )}
      </FilterProvider>
    </div>
  );
}
