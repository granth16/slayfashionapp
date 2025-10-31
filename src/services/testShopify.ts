// Test different store URLs
export const TEST_URLS = [
  'slay.fashion',
  'slayfashion.myshopify.com',
  'slay-fashion.myshopify.com',
  'slayofficial.myshopify.com',
];

export const testShopifyConnection = async (storeDomain: string, token: string) => {
  const url = `https://${storeDomain}/api/2024-10/graphql.json`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: `{ shop { name } }`,
      }),
    });
    
    const result = await response.json();
    console.log(`✅ ${storeDomain}: ${response.status}`, result);
    return { storeDomain, success: response.ok, data: result };
  } catch (error) {
    console.log(`❌ ${storeDomain}: Failed`, error);
    return { storeDomain, success: false, error };
  }
};

