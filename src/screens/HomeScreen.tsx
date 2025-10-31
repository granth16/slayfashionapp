import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {ProductCard} from '../components/ProductCard';
import {fetchAllProducts, ShopifyProduct} from '../services/shopifyService';

export const HomeScreen = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    
    // Debug: Test the connection
    console.log('🔍 Testing Shopify connection...');
    console.log('Store domain:', 'slayfashion.myshopify.com');
    console.log('API Version:', '2024-10');
    
    const data = await fetchAllProducts();
    console.log('📦 Products received:', data.length);
    
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
