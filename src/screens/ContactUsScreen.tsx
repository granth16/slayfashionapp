import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {Header} from '../components/Header';

export const ContactUsScreen = () => {
  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/919980794499');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:customercare@f3lifestyle.in');
  };

  const handleCall = () => {
    Linking.openURL('tel:+919980794499');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>
          Have questions? We're here to help.
        </Text>

        <View style={styles.contactBox}>
          <Text style={styles.contactLabel}>📧 Email Us</Text>
          <Text style={styles.contactSubtext}>Have a question or need support?</Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
            <Text style={styles.contactButtonText}>customercare@f3lifestyle.in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactLabel}>💬 WhatsApp Support</Text>
          <Text style={styles.contactSubtext}>Chat with us directly for quick help</Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleWhatsApp}>
            <Text style={styles.contactButtonText}>+91 99807 94499</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactLabel}>📞 Phone Number</Text>
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.contactText}>+91 99807 94499</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactLabel}>🕐 Working Hours</Text>
          <Text style={styles.contactText}>Monday to Saturday</Text>
          <Text style={styles.contactText}>10:00 AM – 7:00 PM</Text>
        </View>

        <View style={styles.addressBox}>
          <Text style={styles.contactLabel}>📍 Physical Address</Text>
          <Text style={styles.addressText}>F3.LIFESTYLE</Text>
          <Text style={styles.addressText}>
            Ground Floor, Honeykomb by BHIVE{'\n'}
            649, 13th Cross Road, 27th Main{'\n'}
            CPWD Quarters Rd, Sector 1, HSR Layout{'\n'}
            BENGALURU, KARNATAKA{'\n'}
            Pin code: 560102
          </Text>
        </View>

        <View style={styles.storeBox}>
          <Text style={styles.storeLabel}>Store Email</Text>
          <Text style={styles.storeText}>store@f3lifestyle.in</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  contactBox: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  contactSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  contactButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  addressBox: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  addressText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 24,
    marginTop: 8,
  },
  storeBox: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
  },
  storeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  storeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

