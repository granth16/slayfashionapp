import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Header} from '../components/Header';

export const ReturnsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>↩️</Text>
        </View>
        <Text style={styles.title}>Return Policy</Text>
        
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Free Size Exchanges</Text>
          <Text style={styles.policyText}>
            • Exchange for different size within 7 days{'\n'}
            • No return fee for size exchanges{'\n'}
            • Product must be unused and in original condition
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Returns (₹100 Fee)</Text>
          <Text style={styles.policyText}>
            • ₹100 return fee applies for non-size exchange returns{'\n'}
            • Refunds processed to original payment method{'\n'}
            • Return fee deducted from refund amount
          </Text>
        </View>

        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>How to Return</Text>
          <Text style={styles.policyText}>
            1. Contact us within 7 days of delivery{'\n'}
            2. Pack the item in original packaging{'\n'}
            3. We'll arrange pickup{'\n'}
            4. Refund processed after quality check
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
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  policySection: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  policyText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
});

