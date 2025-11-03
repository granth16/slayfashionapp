// GoKwik / KwikPass Configuration

export const GOKWIK_CONFIG = {
  merchantId: '5perimfdj5x2t',
  appId: 'app_id_72c711a281394052b5635dbae0512094',
  appSecret: 'app_secret_5f1722d7a68b4f9cb32ece1018e40796',
  environment: 'production',
};

// GoKwik checkout URL builder
export const buildCheckoutUrl = (orderData: any) => {
  const baseUrl = 'https://api.gokwik.co/v1/checkout';
  // Build checkout URL with your order data
  return `${baseUrl}?merchant_id=${GOKWIK_CONFIG.merchantId}`;
};

