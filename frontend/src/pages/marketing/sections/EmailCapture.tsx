import { useState } from "react";

export default function EmailCapture({
  onSubmit,
  initialEmail = "",
  
}: {
  onSubmit: () => void;
  initialEmail?: string;
  persona?: "ultra" | "pro";
}) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        console.error("MailerLite error:", data.error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      console.log("✅ Email submitted:", email);
      setSubmitted(true);
      setTimeout(onSubmit, 2500);
    } catch (err) {
      console.error("❌ Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-white px-4 text-center animate-fadeIn">
        <div className="glow">
          <h2 className="text-3xl font-bold text-green-400 mb-2">You're in! ✅</h2>
          <p className="text-lg text-zinc-300">We’re unlocking your strategy breakdown...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-2 glow">Almost there!</h2>
        <p className="mb-6 text-lg text-zinc-400">
          Drop your email to unlock your strategy breakdown & performance data:
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="p-3 rounded-md border border-zinc-700 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-[var(--accent)] text-white font-semibold py-3 rounded-lg shadow-md transition w-full ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg hover:bg-red-600"
            }`}
          >
            {loading ? "Submitting..." : "Unlock the ULTRA →"}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
}
