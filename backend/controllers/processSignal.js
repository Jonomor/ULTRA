// backend/controllers/processSignal.js
import db from "../db/index.js";

export async function handleIncomingSignal(req, res) {
  try {
    const { symbol, ai_signal, macro, regime, time } = req.body;

    if (!symbol || !ai_signal) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.logSignal({ symbol, ai_signal, macro, regime, time });

    // Optionally forward to webhook (Make.com, Discord, etc.)
    if (process.env.FORWARD_WEBHOOK_URL) {
      await fetch(process.env.FORWARD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Signal handler error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
