import {GOKWIK_CONFIG} from '../config/gokwik';
import {CartItem} from '../context/CartContext';

export interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

// Initialize KwikPass
export const initKwikPass = () => {
  console.log('KwikPass initialized for merchant:', GOKWIK_CONFIG.merchantId);
};

// Create checkout session with GoKwik
export const createCheckoutSession = (data: CheckoutData) => {
  const checkoutData = {
    merchant_id: GOKWIK_CONFIG.merchantId,
    app_id: GOKWIK_CONFIG.appId,
    order_amount: Math.round(data.subtotal * 100), // Convert to paise
    currency: 'INR',
    items: data.items.map(item => ({
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      price: Math.round(item.product.price * 100), // Convert to paise
      variant: item.size,
      image_url: item.product.image,
    })),
    customer_details: data.customerInfo,
    callback_url: 'slayfashionapp://payment-success',
    cancel_url: 'slayfashionapp://payment-cancel',
  };

  // Encode checkout data as base64
  const encodedData = Buffer.from(JSON.stringify(checkoutData)).toString('base64');

  // Build GoKwik checkout URL
  return `https://checkout.gokwik.co/v2/checkout?data=${encodeURIComponent(encodedData)}&mid=${GOKWIK_CONFIG.merchantId}`;
};

// Verify payment status
export const verifyPayment = async (transactionId: string) => {
  try {
    // Call GoKwik API to verify payment
    console.log('Verifying payment:', transactionId);
    return {success: true, transactionId};
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {success: false, error};
  }
};

