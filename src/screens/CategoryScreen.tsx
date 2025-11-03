import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {ProductCard} from '../components/ProductCard';
import {Header} from '../components/Header';
import {fetchProductsByCategory, ShopifyProduct} from '../services/shopifyService';

export const CategoryScreen = ({route}: any) => {
  const {category} = route.params;
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    let data;
    if (category === 'All') {
      const {fetchAllProducts} = await import('../services/shopifyService');
      data = await fetchAllProducts();
    } else {
      data = await fetchProductsByCategory(category);
    }
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading {category}...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
