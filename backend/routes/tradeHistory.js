import express from 'express';
import TradeLog from '../models/trade_logs.js';

const router = express.Router();

// GET /api/trade/history
router.get('/', async (req, res) => {
  try {
    const { symbol, limit = 20 } = req.query;

    const query = symbol ? { symbol } : {};

    const logs = await TradeLog.find(query)
      .sort({ entryTime: -1 })
      .limit(Number(limit));

    res.json({ success: true, history: logs });
  } catch (err) {
    console.error('[Trade History Error]:', err);
    res.status(500).json({ error: 'Failed to fetch trade logs' });
  }
});

export default router;
