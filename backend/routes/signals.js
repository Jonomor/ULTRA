// backend/routes/signals.js
import express from "express";
import Signal from "../models/signal.js";

const router = express.Router();

// === POST /api/signal ===
router.post("/", async (req, res) => {
  try {
    const {
      symbol,
      action,
      brain,
      reason,
      confidence,
      regime,
      fallbackTriggered,
      timestamp,
    } = req.body;

    if (!symbol || !action || !brain || !reason || confidence === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSignal = new Signal({
      symbol,
      action,
      brain,
      reason,
      confidence: Number(confidence),
      regime,
      fallbackTriggered: fallbackTriggered === "true", // safely parse from Pine
      timestamp,
    });

    await newSignal.save();

    // WebSocket emit to frontend
    req.io?.to("trading-alerts")?.emit("newSignal", newSignal);

    res.json({ success: true, saved: newSignal });
  } catch (err) {
    console.error("Signal save failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// === GET /api/signal/recent — last 5 for overlay ===
router.get("/recent", async (req, res) => {
  try {
    const signals = await Signal.find().sort({ timestamp: -1 }).limit(5);
    res.json(signals);
  } catch (err) {
    console.error("Error fetching signals:", err);
    res.status(500).json({ error: "Failed to retrieve signals" });
  }
});

// === GET /api/signal/log — for dashboard sync ===
router.get("/log", async (req, res) => {
  try {
    const signals = await Signal.find().sort({ timestamp: -1 }).limit(5);
    res.json({ recent: signals }); // dashboard expects this shape
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve logs" });
  }
});

export default router;
