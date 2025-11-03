import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ActivityIndicator, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {useCart} from '../context/CartContext';
import {createCheckoutSession} from '../services/kwikpassService';
import {useNavigation} from '@react-navigation/native';

export const CheckoutScreen = () => {
  const {cartItems, getCartTotal, clearCart} = useCart();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // Create checkout URL
  const checkoutUrl = createCheckoutSession({
    items: cartItems,
    subtotal: getCartTotal(),
    customerInfo: {
      // Add customer info if available
      name: 'Guest User',
      email: '',
      phone: '',
    },
  });

  const handleNavigationStateChange = (navState: any) => {
    // Check if payment is complete
    if (navState.url.includes('success') || navState.url.includes('payment-success')) {
      Alert.alert(
        'Order Placed!',
        'Your order has been placed successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('HomeTab' as never);
            },
          },
        ],
      );
    } else if (navState.url.includes('cancel') || navState.url.includes('failure')) {
      Alert.alert(
        'Payment Cancelled',
        'Your payment was cancelled. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: checkoutUrl}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

