import { fetchKrakenBalance } from '../services/exchange/krakenClient.js';
import { fetchCoinbaseBalance } from '../services/exchange/coinbaseClient.js';
import BalanceHistory from '../models/balanceHistory.js';

export async function getExchangeStatus(req, res) {
  try {
    const kraken = await fetchKrakenBalance();
    const coinbase = await fetchCoinbaseBalance();

    res.json({
      kraken,
      coinbase,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBalanceHistory(req, res) {
  try {
    const { exchange } = req.query;
    const history = await BalanceHistory.find({ exchange })
      .sort({ capturedAt: 1 })
      .limit(288); // 24h if every 5 mins
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
