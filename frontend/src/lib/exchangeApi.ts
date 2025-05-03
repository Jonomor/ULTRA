interface OrderParams {
    symbol: string;
    side: 'BUY' | 'SELL';
    quantity: number;
  }

  export async function placeOrder(params: OrderParams) {
    const response = await fetch('/api/exchange/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    return await response.json();
  }

  export async function getBalance() {
    const response = await fetch('/api/exchange/balance', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }

    return await response.json();
  }
