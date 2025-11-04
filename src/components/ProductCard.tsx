import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShopifyProduct} from '../services/shopifyService';
import {RootStackParamList} from '../../App';

interface ProductCardProps {
  product: ShopifyProduct;
  variant?: 'grid' | 'carousel';
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const ProductCard: React.FC<ProductCardProps> = ({product, variant = 'grid'}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('ProductDetail', {product});
  };

  const isCarousel = variant === 'carousel';

  return (
    <TouchableOpacity
      style={[styles.card, isCarousel ? styles.cardCarousel : styles.cardGrid]}
      onPress={handlePress}
    >
      <Image
        source={{uri: product.image}}
        style={[styles.image, isCarousel ? styles.imageCarousel : styles.imageGrid]}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {product.description || '100% COTTON SHIRT'}
        </Text>
        <Text style={styles.price}>₹ {product.price.toFixed(0)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  cardGrid: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 8,
    width: '95%',
  },
  cardCarousel: {
    width: 160,
    marginRight: 10,
  },
  image: {
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
  },
  imageGrid: {
    width: '100%',
    height: 240,
  },
  imageCarousel: {
    width: 160,
    height: 240,
  },
  info: {
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
});
