import { placeKrakenTrade } from '../services/exchange/krakenClient.js';
import { placeCoinbaseTrade } from '../services/exchange/coinbaseClient.js';
import TradeLog from '../models/trade_logs.js';

const exchangeKeys = {
  ultra: 'coinbase',
  pro: 'kraken',
  scalptr: 'kraken',
  snpyer: 'coinbase',
};

export async function executeTestTrade(req, res) {
  const { bot, symbol, side, amount } = req.body;

  if (!bot || !symbol || !side || !amount) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  const exchange = exchangeKeys[bot];
  let result;

  try {
    if (exchange === 'kraken') {
      result = await placeKrakenTrade(symbol, side, amount);
    } else if (exchange === 'coinbase') {
      result = await placeCoinbaseTrade(symbol, side, amount);
    } else {
      return res.status(400).json({ error: 'Unknown exchange for bot.' });
    }

    const log = new TradeLog({
      bot,
      exchange,
      symbol,
      side,
      amount,
      orderId: result.success ? result.orderId : null,
      executedAt: new Date(),
      status: result.success ? 'success' : 'fail',
    });

    await log.save();

    return res.json({
      success: result.success,
      orderId: result.orderId,
      message: result.success ? 'Trade Executed' : 'Trade Failed',
    });

  } catch (error) {
    console.error('Trade Execution Error:', error.message || error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
