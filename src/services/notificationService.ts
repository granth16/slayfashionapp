import {OneSignal} from 'react-native-onesignal';
import {ONESIGNAL_CONFIG} from '../config/onesignal';

// Initialize OneSignal
export const initNotifications = () => {
  // Initialize with your OneSignal App ID (v5 API)
  OneSignal.initialize(ONESIGNAL_CONFIG.appId);

  // Request permission for notifications
  OneSignal.Notifications.requestPermission(true);

  // Handle notification click
  OneSignal.Notifications.addEventListener('click', (event: any) => {
    console.log('Notification clicked:', event);
    handleNotificationTap(event);
  });

  // Optional: Listen to subscription changes
  OneSignal.User.pushSubscription.addEventListener('change', (subscription: any) => {
    console.log('Subscription changed:', subscription);
  });
};

// Handle notification tap
const handleNotificationTap = (notification: any) => {
  const data = notification.notification.additionalData;
  
  if (data?.screen === 'product' && data?.productId) {
    // Navigate to product detail
    console.log('Navigate to product:', data.productId);
  } else if (data?.screen === 'orders') {
    // Navigate to orders
    console.log('Navigate to orders');
  } else if (data?.screen === 'cart') {
    // Navigate to cart
    console.log('Navigate to cart');
  }
};

// Subscribe to tags for targeted notifications (v5 API)
export const setUserTags = (tags: {[key: string]: string}) => {
  OneSignal.User.addTags(tags);
};

// Example: Tag users for segmentation
export const tagUserBehavior = (action: string, value: string) => {
  OneSignal.User.addTag(action, value);
  // Examples:
  // tagUserBehavior('favorite_category', 'Shirts');
  // tagUserBehavior('last_purchase', '2025-01-15');
};

// Set external user ID (link to your customer ID)
export const setExternalUserId = (userId: string) => {
  OneSignal.login(userId);
};

// Get OneSignal Player ID (unique device identifier)
export const getDeviceId = (): string | undefined => {
  return OneSignal.User.pushSubscription.getPushSubscriptionId();
};

