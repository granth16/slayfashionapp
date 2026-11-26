// GoKwik / KwikPass Configuration
//
// Credentials are read from the environment (see `.env.example`) and must NOT be
// hardcoded or committed to source control. `appSecret` is the authenticating
// `x-api-key` for api.gokwik.co; treat it as a secret and prefer keeping it
// server-side rather than shipping it in the client bundle.

// Read from the runtime environment without assuming a typed `process` global,
// so this works whether or not @types/node / a dotenv transform is present.
const ENV: Record<string, string | undefined> =
  (globalThis as any)?.process?.env ?? {};

export const GOKWIK_CONFIG = {
  merchantId: '5perimfdj5x2t',
  appId: ENV.GOKWIK_APP_ID ?? '',
  appSecret: ENV.GOKWIK_APP_SECRET ?? '',
  environment: 'production',
};

// GoKwik checkout URL builder
export const buildCheckoutUrl = (orderData: any) => {
  const baseUrl = 'https://api.gokwik.co/v1/checkout';
  // Build checkout URL with your order data
  return `${baseUrl}?merchant_id=${GOKWIK_CONFIG.merchantId}`;
};

