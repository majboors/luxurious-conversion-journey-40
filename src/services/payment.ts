import { getApiKey } from "@/utils/apiConfig";

export const createPaymentIntent = async () => {
  try {
    const apiKey = getApiKey();
    const response = await fetch('https://api-v2.ziina.com/api/payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Payment API Error:', errorData);
      throw new Error(errorData.message || 'Payment creation failed');
    }

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