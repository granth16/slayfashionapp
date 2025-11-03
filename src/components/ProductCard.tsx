import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShopifyProduct} from '../services/shopifyService';
import {RootStackParamList} from '../../App';

interface ProductCardProps {
  product: ShopifyProduct;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {product.description || '100% COTTON SHIRT'}
        </Text>
        <Text style={styles.price}>Rs. {product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: 160,
  },
  image: {
    width: 160,
    height: 240,
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
  },
  info: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
