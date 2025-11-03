import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export const LoginScreen = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return;
    }
    
    // Move to OTP step
    setStep('otp');
    
    // Note: Real OTP will be sent once GoKwik provides correct API endpoints
    // For testing, you can enter any 6-digit code
  };

  const handleVerifyOTP = () => {
    if (otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the OTP');
      return;
    }

    // Simulate login success
    Alert.alert('Login Successful!', 'You are now logged in with KwikPass', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.icon}>⚡</Text>
          <Text style={styles.logo}>KWIKPASS LOGIN</Text>
          <Text style={styles.subtitle}>Quick & Secure Authentication</Text>
        </View>

        {step === 'phone' ? (
          <View style={styles.form}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneWrapper}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter 10-digit number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
              <Text style={styles.buttonText}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Enter OTP</Text>
            <Text style={styles.hint}>Sent to +91 {phoneNumber}</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="• • • • • •"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              autoFocus
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>VERIFY & LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => {
                setStep('phone');
                setOtp('');
              }}>
              <Text style={styles.changeText}>Change Number</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerNote}>
            Note: Complete GoKwik integration requires contacting GoKwik support for proper API endpoints and documentation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  icon: {
    fontSize: 60,
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    fontSize: 18,
    color: '#000',
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 20,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 12,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  changeButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  changeText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  footerNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

