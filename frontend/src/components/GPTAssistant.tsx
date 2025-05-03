import { useState } from "react";

export default function GPTAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("Ask me anything about the ULTRA+ system, signals, or performance.");
  const [loading, setLoading] = useState(false);

  const askGPT = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("http://localhost:3000/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_admin_token",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer || "No response.");
    } catch (err) {
      console.error("GPT request failed", err);
      setResponse("⚠️ Assistant is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 mt-12 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-semibold mb-4">🤖 ULTRA Assistant</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What does this signal mean? Why did the bot enter here? What’s the macro regime doing?"
        className="w-full p-3 mb-4 text-sm rounded-lg bg-zinc-800 text-white"
        rows={4}
      />

      <button
        onClick={askGPT}
        disabled={loading}
        className="bg-crimson text-white font-semibold px-6 py-2 rounded-xl hover:bg-red-700 transition"
      >
        {loading ? "🧠 Processing..." : "Ask Assistant"}
      </button>

      <div className="mt-6 bg-zinc-800 p-4 rounded-lg text-sm text-zinc-300 whitespace-pre-line">
        {response}
      </div>
    </div>
  );
}
