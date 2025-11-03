import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.drawerHeader}>
        <Text style={styles.brandName}>SLAY.FASHION</Text>
        <Text style={styles.tagline}>Elevated Mens Fashion</Text>
      </View>
      
      <ScrollView style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </ScrollView>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerSubtext}>Made with ❤️ in India</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#000',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 12,
    color: '#ccc',
    letterSpacing: 0.5,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#ccc',
  },
});

