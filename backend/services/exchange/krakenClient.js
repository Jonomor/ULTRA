import KrakenClient from 'kraken-api';

const kraken = new KrakenClient(process.env.KRAKEN_API_KEY, process.env.KRAKEN_SECRET);

export async function placeKrakenTrade(symbol, side, amount) {
  const pair = symbol.replace('/', ''); // BTC/USD → BTCUSD
  const type = side.toLowerCase(); // buy or sell

  try {
    const response = await kraken.api('AddOrder', {
      pair,
      type,
      ordertype: 'market',
      volume: amount,
    });

    return {
      success: true,
      orderId: response.result.txid[0],
      raw: response,
    };
  } catch (error) {
    console.error('Kraken Trade Error:', error.message || error);
    return { success: false, error: error.message || error };
  }
}

export async function fetchKrakenBalance() {
    try {
      // Simulated response for dev
      return {
        success: true,
        balance: 0.315,
        latencyMs: 97,
        lastTradeAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Kraken Balance Error:', error.message || error);
      return {
        success: false,
        balance: 0,
        latencyMs: 0,
        lastTradeAt: null,
      };
    }
  }
  