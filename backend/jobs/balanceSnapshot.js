import { placeKrakenTrade, fetchKrakenBalance } from '../services/exchange/krakenClient.js';
import { placeCoinbaseTrade, fetchCoinbaseBalance } from '../services/exchange/coinbaseClient.js';
import BalanceHistory from '../models/balanceHistory.js';

export async function captureBalanceSnapshot() {
  try {
    const krakenBalance = await fetchKrakenBalance();
    if (krakenBalance.success) {
      await new BalanceHistory({
        exchange: 'kraken',
        asset: 'BTC',
        balance: krakenBalance.balance,
      }).save();
    }

    const coinbaseBalance = await fetchCoinbaseBalance();
    if (coinbaseBalance.success) {
      await new BalanceHistory({
        exchange: 'coinbase',
        asset: 'BTC',
        balance: coinbaseBalance.balance,
      }).save();
    }

    console.log('✅ Balance snapshot captured at', new Date().toISOString());

    // ✅ Emit WebSocket update — INSIDE function, AFTER io exists
    if (global.io) {
      global.io.emit('exchange:update', {
        kraken: {
          success: true,
          balance: krakenBalance.balance,
          latencyMs: krakenBalance.latencyMs,
          lastTradeAt: krakenBalance.lastTradeAt,
        },
        coinbase: {
          success: true,
          balance: coinbaseBalance.balance,
          latencyMs: coinbaseBalance.latencyMs,
          lastTradeAt: coinbaseBalance.lastTradeAt,
        },
      });
    }

  } catch (error) {
    console.error('❌ Error capturing balance snapshot:', error.message || error);
  }
}
