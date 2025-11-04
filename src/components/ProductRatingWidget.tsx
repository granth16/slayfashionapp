import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { fetchAllProducts, ShopifyProduct } from '../services/shopifyService';

const { width } = Dimensions.get('window');

const ProductRatingWidget: React.FC = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await fetchAllProducts();
      // Take first 8 products for rating
      setProducts(allProducts.slice(0, 8));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setIsLoading(false);
    }
  };

  const handleStarPress = (rating: number) => {
    const currentProduct = products[currentIndex];
    setRatings({ ...ratings, [currentProduct.id]: rating });

    // Animate fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Move to next product or complete
      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
        // Fade back in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setIsCompleted(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  if (isLoading || products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonStars} />
        </View>
      </View>
    );
  }

  if (isCompleted) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.completedContainer}>
          <View style={styles.tickMark}>
            <Text style={styles.tickText}>✓</Text>
          </View>
          <Text style={styles.completedTitle}>Thank you for your ratings!</Text>
          <Text style={styles.completedSubtitle}>
            Your feedback helps us improve
          </Text>
        </View>
      </Animated.View>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>RATE</Text>
        <Text style={styles.title}>THIS DESIGN!</Text>
      </View>

      {/* Product Card - Polaroid Style */}
      <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
        <View style={styles.polaroid}>
          <View style={styles.polaroidInner}>
            <Image
              source={{ uri: currentProduct.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.productName} numberOfLines={2}>
            {currentProduct.name}
          </Text>
        </View>

        {/* Arrow */}
        <Image
          source={{
            uri: 'https://themenfashionco.in/cdn/shop/t/47/assets/arrow.png?v=74727433212785220081750823728',
          }}
          style={styles.arrow}
          resizeMode="contain"
        />

        {/* Star Rating */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleStarPress(star)}
              style={styles.starButton}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.star,
                  ratings[currentProduct.id] >= star && styles.starFilled,
                ]}
              >
                {ratings[currentProduct.id] >= star ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(246, 238, 220, 0.97)',
    paddingVertical: 20,
    paddingHorizontal: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 242, 230, 0.5)',
    shadowColor: 'rgba(80, 64, 48, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  titleContainer: {
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 5,
    marginBottom: 17,
    paddingRight: 40,
    paddingLeft: 20,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#352e28',
    letterSpacing: -1.5,
    lineHeight: 38,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    includeFontPadding: false,
    transform: [{ rotate: '-5deg' }],
  },
  arrow: {
    width: 120,
    height: 120,
    position: 'absolute',
    right:5,
    top: -70,
    tintColor: '#555',
  },
  
  cardContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  polaroid: {
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 18,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    transform: [{ rotate: '-4deg' }],
    maxWidth: 320,
    width: '75%',
    marginBottom: 20,
  },
  polaroidInner: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#352e28',
    textAlign: 'center',
    fontFamily: 'Courier',
    letterSpacing: 0,
    lineHeight: 18,
    marginTop: 3,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 0,
    marginTop: 5,
  },
  starButton: {
    padding: 6,
  },
  star: {
    fontSize: 42,
    color: '#352e28',
    fontWeight: '300',
  },
  starFilled: {
    color: '#352e28',
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  tickMark: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tickText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#352e28',
    marginBottom: 8,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: 12,
    color: '#352e28',
    textAlign: 'center',
  },
  skeletonCard: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  skeletonImage: {
    width: '75%',
    maxWidth: 320,
    aspectRatio: 1,
    backgroundColor: '#e8e8e8',
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonTitle: {
    width: '50%',
    height: 16,
    backgroundColor: '#e8e8e8',
    borderRadius: 4,
    marginBottom: 15,
  },
  skeletonStars: {
    width: '60%',
    height: 32,
    backgroundColor: '#e8e8e8',
    borderRadius: 16,
  },
});

export default ProductRatingWidget;

