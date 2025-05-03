// backend/models/tradeLog.js
import mongoose from 'mongoose';

const tradeLogSchema = new mongoose.Schema({
  symbol: String,
  entryTime: Date,
  exitTime: Date,
  entryPrice: Number,
  exitPrice: Number,
  outcome: { type: String, enum: ['win', 'loss', 'breakeven'] },
  atrEntry: Number,
  atrExit: Number,
  volumeAtEntry: Number,
  volumeSpike: Boolean,
  priceVsMA: Number, // Percentage above or below 50EMA at entry
  regime: String,    // trend, range, high-vol
  confidence: Number,
  fallbackActive: Boolean,
  timeOfDay: String, // e.g., "morning", "afternoon", "evening"
  gptFeedback: String,          // ✅ Optional GPT insight
  action: String,               // BUY / SELL
  reason: String
});

export default mongoose.model('TradeLog', tradeLogSchema);
