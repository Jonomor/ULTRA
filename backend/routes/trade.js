// backend/routes/trade.js
import express from 'express';
import TradeLog from '../models/tradeLog.js';

const router = express.Router();

// === POST /api/trade/complete ===
router.post('/complete', async (req, res) => {
  try {
    const {
      symbol,
      entryTime,
      exitTime,
      entryPrice,
      exitPrice,
      outcome,
      atrEntry,
      atrExit,
      volumeAtEntry,
      volumeSpike,
      priceVsMA,
      regime,
      confidence,
      fallbackActive,
      timeOfDay,
      gptFeedback,
      action,
      reason
    } = req.body;

    const log = new TradeLog({
      symbol,
      entryTime,
      exitTime,
      entryPrice,
      exitPrice,
      outcome,
      atrEntry,
      atrExit,
      volumeAtEntry,
      volumeSpike,
      priceVsMA,
      regime,
      confidence,
      fallbackActive,
      timeOfDay,
      gptFeedback,
      action,
      reason
    });

    await log.save();
    res.json({ success: true, saved: log });
  } catch (err) {
    console.error("Trade logging failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
