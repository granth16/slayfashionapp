import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {ProductCard} from '../components/ProductCard';
import {ImageSlideshow} from '../components/ImageSlideshow';
import {Header} from '../components/Header';
import {fetchAllProducts, ShopifyProduct} from '../services/shopifyService';

export const HomeScreen = () => {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
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
    
    setAllProducts(data);
    setLoading(false);
  };

  // Organize products into sections
  const sections = [
    {
      title: 'FEATURED COLLECTION',
      data: allProducts.slice(0, 4),
    },
    {
      title: 'NEW ARRIVALS',
      data: allProducts.slice(4, 8),
    },
    {
      title: 'POPULAR',
      data: allProducts.slice(8, 12),
    },
    {
      title: 'TRENDING NOW',
      data: allProducts.slice(12),
    },
  ].filter(section => section.data.length > 0);

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

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const renderContent = () => (
    <>
      <ImageSlideshow />
      {sections.map((section, sectionIndex) => (
        <View key={sectionIndex}>
          {renderSectionHeader(section.title)}
          <View style={styles.productsGrid}>
            {section.data.map((product, index) => (
              <View key={product.id} style={styles.productWrapper}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showMenu={true} />
      <FlatList
        data={[{key: 'content'}]}
        renderItem={() => renderContent()}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1.2,
  },
  sectionLine: {
    height: 0,
    width: 0,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
  },
  productWrapper: {
    width: '50%',
  },
});
