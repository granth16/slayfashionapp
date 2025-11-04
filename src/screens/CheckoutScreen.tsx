import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useCart} from '../context/CartContext';
import {useNavigation} from '@react-navigation/native';

export const CheckoutScreen = () => {
  const {cartItems, getCartTotal, clearCart} = useCart();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD or Online

  const handlePlaceOrder = () => {
    // Validation
    if (!name || !phone || !address || !city || !state || !pincode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);

    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed Successfully!',
        `Your order will be delivered in 5-7 business days.\n\nPayment Method: ${paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}`,
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
    }, 1500);
  };

  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 99;
  const finalTotal = total + shipping + (paymentMethod === 'COD' ? 50 : 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Address (House No, Building, Street) *"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="City *"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#999"
          />
          
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State *"
              value={state}
              onChangeText={setState}
              placeholderTextColor="#999"
            />
            
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Pincode *"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
              maxLength={6}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
          
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'COD' && styles.paymentSelected]}
            onPress={() => setPaymentMethod('COD')}>
            <View style={styles.radio}>
              {paymentMethod === 'COD' && <View style={styles.radioSelected} />}
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
              <Text style={styles.paymentSubtext}>+ ₹50 COD charges</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'Online' && styles.paymentSelected]}
            onPress={() => setPaymentMethod('Online')}>
            <View style={styles.radio}>
              {paymentMethod === 'Online' && <View style={styles.radioSelected} />}
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentText}>Online Payment</Text>
              <Text style={styles.paymentSubtext}>UPI, Card, Net Banking</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
            <Text style={styles.summaryValue}>₹ {total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'FREE' : `₹ ${shipping}`}
            </Text>
          </View>
          
          {paymentMethod === 'COD' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>COD Charges</Text>
              <Text style={styles.summaryValue}>₹ 50</Text>
            </View>
          )}
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹ {finalTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={[styles.placeOrderButton, loading && styles.buttonDisabled]}
          onPress={handlePlaceOrder}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By placing an order, you agree to our Terms & Conditions and Privacy Policy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#000',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  paymentSelected: {
    borderColor: '#000',
    backgroundColor: '#f9f9f9',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 13,
    color: '#666',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 16,
    lineHeight: 18,
  },
});

