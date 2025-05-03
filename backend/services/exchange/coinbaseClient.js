import CoinbasePro from 'coinbase-pro';

const client = new CoinbasePro.AuthenticatedClient(
  process.env.COINBASE_API_KEY,
  process.env.COINBASE_SECRET,
  process.env.COINBASE_PASSPHRASE, // Make sure this is in your .env too
  'https://api.pro.coinbase.com' // LIVE server URL
);

export async function placeCoinbaseTrade(symbol, side, amount) {
  const [base, quote] = symbol.split('/');
  const product_id = `${base}-${quote}`;

  try {
    const order = await client.placeOrder({
      side: side.toLowerCase(),
      type: 'market',
      product_id,
      size: amount.toString(),
    });

    return {
      success: true,
      orderId: order.id,
      raw: order,
    };
  } catch (error) {
    console.error('Coinbase Trade Error:', error.message || error);
    return { success: false, error: error.message || error };
  }
}

export async function fetchCoinbaseBalance() {
    try {
      // Simulated balance response for now — replace with real Coinbase logic later
      return {
        success: true,
        balance: 0.428,
        latencyMs: 85,
        lastTradeAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Coinbase Balance Error:', error.message || error);
      return {
        success: false,
        balance: 0,
        latencyMs: 0,
        lastTradeAt: null,
      };
    }
  }
  