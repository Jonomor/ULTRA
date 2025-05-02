// models/signal.js
import mongoose from 'mongoose';

const SignalSchema = new mongoose.Schema({
  symbol: String,                // e.g. BTCUSD
  action: String,                // BUY / SELL
  brain: String,                 // structure, trend, range, volume
  reason: String,                // explanation
  confidence: Number,            // 0–100
  regime: String,                // trend / range / risk-on etc.
  fallbackTriggered: Boolean,    // true or false
  timestamp: String,             // ISO format (from Pine Script)
  discordHash: String,           // optional for Discord tracking
  gptReply: String,              // optional GPT commentary
});

export default mongoose.model('Signal', SignalSchema);
