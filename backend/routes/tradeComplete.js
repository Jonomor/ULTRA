// backend/routes/tradeComplete.js
import express from 'express';
import TradeLog from '../models/tradeLog.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      symbol,
      action,
      brain,
      reason,
      confidence,
      regime,
      feedback,        // GPT response summary
      timestamp,       // ISO format from webhook
      fallbackActive = false,
      priceVsMA = 0,   // % offset from 50 EMA
      outcome = 'pending' // optional override
    } = req.body;

// === PATCH /api/trade/complete/:id ===
router.patch('/complete/:id', async (req, res) => {
    try {
      const { outcome, exitPrice, gptReply, fallbackActive } = req.body;

      const update = {
        outcome,
        exitPrice,
        exitTime: new Date(),
      };

      if (gptReply) update.gptReply = gptReply;
      if (fallbackActive !== undefined) update.fallbackActive = fallbackActive;

      const updated = await TradeLog.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: "Trade not found" });


      res.json({ success: true, updated });
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

    // === REQUIRED FIELD CHECK ===
    if (!symbol || !action || !brain || !reason || confidence == null || !regime || !feedback || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields for trade sync' });
    }

// === GET /api/trade/history ===
// Returns up to 1000 past trade logs, sorted by latest
router.get('/history', async (req, res) => {
    try {
      const logs = await TradeLog.find()
        .sort({ exitTime: -1 })
        .limit(1000);

      res.json({ count: logs.length, logs });
    } catch (err) {
      console.error("History fetch failed:", err);
      res.status(500).json({ error: "Failed to load trade history" });
    }
  });


    // === LOG OBJECT BUILD ===
    const log = new TradeLog({
      symbol,
      action,
      brain,
      reason,
      confidence: Number(confidence),
      regime,
      fallbackActive,
      priceVsMA,
      gptReply: feedback,
      entryTime: new Date(timestamp),
      exitTime: new Date(timestamp), // Can update later on trade close
      outcome, // Defaults to 'pending' unless overridden
    });

    // === SAVE TO DB ===
    await log.save();
    res.json({ success: true, saved: log });

  } catch (err) {
    console.error('🔥 GPT Sync Error @ /api/trade/complete:', err);
    res.status(500).json({ error: 'Mongo sync failed' });
  }
});

export default router;
