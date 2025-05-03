// frontend/src/pages/admin/discord-test.tsx
import { useState } from "react";

export default function DiscordTest() {
  const [status, setStatus] = useState<string | null>(null);

  const sendTest = async () => {
    setStatus("Sending...");
    const res = await fetch("/api/discord/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: "BTCUSD",
        ai_signal: "Long",
        time: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus(`✅ Sent! Hash: ${data.hash}`);
    } else {
      setStatus(`❌ Failed: ${data.error}`);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📡 Discord Broadcast Tester</h1>
      <button
        onClick={sendTest}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Send Test Signal
      </button>
      {status && <p className="mt-4 text-sm text-white">{status}</p>}
    </div>
  );
}
