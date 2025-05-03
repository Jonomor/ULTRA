import mongoose from 'mongoose';

const balanceHistorySchema = new mongoose.Schema({
  exchange: String, // 'kraken' or 'coinbase'
  asset: String,    // 'BTC', 'ETH'
  balance: Number,
  capturedAt: { type: Date, default: Date.now },
});

export default mongoose.model('BalanceHistory', balanceHistorySchema);
