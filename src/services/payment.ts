export const createPaymentIntent = async () => {
  try {
    const response = await fetch('https://api-v2.ziina.com/api/payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_ZIINA_API_KEY}`
      },
      body: JSON.stringify({
        amount: 1500, // $15.00
        currency_code: "USD",
        message: "Professional Website Package",
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/`,
        failure_url: `${window.location.origin}/payment/failed`,
        test: true,
        transaction_source: "directApi"
      })
    });

    const data = await response.json();
    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    }
    return data;
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw error;
  }
};