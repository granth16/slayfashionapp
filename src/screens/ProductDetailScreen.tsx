import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShopifyProduct, fetchAllProducts} from '../services/shopifyService';
import {ProductCard} from '../components/ProductCard';
import {useCart} from '../context/CartContext';

type RootStackParamList = {
  Main: undefined;
  ProductDetail: {product: ShopifyProduct};
};

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;
type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

interface Props {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  icon,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={styles.accordionIcon}>{isOpen ? '−' : '+'}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

// Custom Alert Component
interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  onClose,
  title,
  message,
  icon = '⚠️',
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            {transform: [{scale: scaleAnim}]},
          ]}>
          <Text style={styles.alertIcon}>{icon}</Text>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.alertButton} onPress={onClose}>
            <Text style={styles.alertButtonText}>Got it!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

export const ProductDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params;
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [showSizeAlert, setShowSizeAlert] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const {addToCart} = useCart();

  // Sample sizes - in a real app, these would come from product variants
  const sizes = ['M-40', 'L-42', 'XL-44'];

  // Multiple images (in real app, get from product data)
  const images = [product.image, product.image, product.image];

  // Load related products from Shopify
  useEffect(() => {
    const loadRelatedProducts = async () => {
      const allProducts = await fetchAllProducts();
      // Filter out current product and show up to 5 related products
      const related = allProducts
        .filter(p => p.id !== product.id)
        .slice(0, 5);
      setRelatedProducts(related);
    };
    loadRelatedProducts();
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeAlert(true);
      return;
    }
    
    // Add to cart
    addToCart(product, selectedSize, 1);
    
    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderImageItem = ({item, index}: {item: string; index: number}) => (
    <View style={styles.imageSlide}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Alert for Size Selection */}
      <CustomAlert
        visible={showSizeAlert}
        onClose={() => setShowSizeAlert(false)}
        title="Select a Size"
        message="Please choose your size before adding this item to cart."
        icon="👕"
      />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Image Gallery */}
        <View style={styles.imageGalleryContainer}>
          <FlatList
            data={images}
            renderItem={renderImageItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setCurrentImageIndex(index);
            }}
          />
          {/* Page Indicators */}
          <View style={styles.paginationDots}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentImageIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Product Title */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSubtitle}>100% COTTON SHIRT</Text>

          {/* Price */}
          <Text style={styles.price}>Rs. {product.price.toFixed(2)}</Text>

          {/* Size Selector */}
          <View style={styles.sizeSection}>
            <View style={styles.sizeSelectorHeader}>
              <Text style={styles.sizeLabel}>Size</Text>
              <Text style={styles.sizeGuide}>Size & Fit Guide</Text>
            </View>
            <View style={styles.sizesContainer}>
              {sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected,
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Accordions */}
          <View style={styles.accordionsContainer}>
            <Accordion title="DESIGNER'S NOTE" defaultOpen={true}>
              <Text style={styles.accordionText}>{product.description}</Text>
              <Text style={styles.accordionText}>
                {'\n'}This premium shirt combines refined tailoring with modern
                style. Ideal for casual or semi-formal occasions, offering both
                comfort and sophistication.
              </Text>
            </Accordion>

            <Accordion title="BRANDED QUALITY, ZERO MARKUP PRICING">
              <Text style={styles.accordionText}>
                We use fabrics from premium international suppliers with high
                quality buttons, cuffs & high density stitching.
              </Text>
              <Text style={styles.accordionText}>
                {'\n'}But unlike premium brands we offer low prices by reducing
                unnecessary costs:
              </Text>
              <Text style={styles.accordionBullet}>• NO Retail Stores</Text>
              <Text style={styles.accordionBullet}>• NO Warehousing</Text>
              <Text style={styles.accordionBullet}>• NO Middlemen</Text>
            </Accordion>

            <Accordion title="₹100 RETURN FEE, FREE SIZE EXCHANGES">
              <Text style={styles.accordionText}>
                We request consumers to minimize returns as it affects opened
                product quality.
              </Text>
              <Text style={styles.accordionBullet}>
                {'\n'}• Free size exchanges within 7 days
              </Text>
              <Text style={styles.accordionBullet}>
                • Rs 100 return fee for any other return
              </Text>
              <Text style={styles.accordionBullet}>
                • Check size carefully before ordering
              </Text>
            </Accordion>

            <Accordion title="SHIPPING">
              <Text style={styles.accordionBullet}>
                • Products dispatched within 24 hours
              </Text>
              <Text style={styles.accordionBullet}>
                • Next Day Delivery in 3500 Pincodes
              </Text>
              <Text style={styles.accordionBullet}>
                • All Metros, State capitals and most cities
              </Text>
            </Accordion>
          </View>

          {/* Brand Values */}
          <View style={styles.brandValues}>
            <View style={styles.brandValueItem}>
              <Text style={styles.brandValueIcon}>✨</Text>
              <Text style={styles.brandValueTitle}>ELEVATED</Text>
              <Text style={styles.brandValueTitle}>MENS FASHION</Text>
            </View>
            <View style={styles.brandValueItem}>
              <Text style={styles.brandValueIcon}>💎</Text>
              <Text style={styles.brandValueTitle}>ZERO</Text>
              <Text style={styles.brandValueTitle}>MARKUP PRICING</Text>
            </View>
            <View style={styles.brandValueItem}>
              <Text style={styles.brandValueIcon}>🧵</Text>
              <Text style={styles.brandValueTitle}>IMPORTED &</Text>
              <Text style={styles.brandValueTitle}>QUALITY FABRIC</Text>
            </View>
          </View>
        </View>

        {/* You May Also Like */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>You May Also Like</Text>
          <FlatList
            data={relatedProducts}
            renderItem={({item}) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
          />
        </View>
      </ScrollView>

      {/* Sticky Add to Cart Button */}
      <SafeAreaView style={styles.stickyFooter}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            addedToCart && styles.addToCartButtonSuccess,
          ]}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>
            {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header with Back Button
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
   

    flexDirection: 'row',
    alignItems: 'center',
    
    paddingHorizontal: 8,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 36,
    color: '#000',
    fontWeight: '200',
    lineHeight: 36,
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: -2,
  },
  scrollView: {
    flex: 1,
  },
  // Image Gallery
  imageGalleryContainer: {
    width: width,
    height: width * 1.3,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  imageSlide: {
    width: width,
    height: width * 1.3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 20,
  },
  // Content
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  // Size Selector
  sizeSection: {
    marginBottom: 20,
  },
  sizeSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  sizeGuide: {
    fontSize: 14,
    color: '#666',
  },
  sizesContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    backgroundColor: '#f1f1f1',
    borderRadius: 2,
  },
  sizeButtonSelected: {
    backgroundColor: '#000',
  },
  sizeText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '400',
  },
  sizeTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  // Sticky Footer with Add to Cart
  stickyFooter: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 2,
  },
  addToCartButtonSuccess: {
    backgroundColor: '#34c759',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  // Accordions
  accordionsContainer: {
    marginBottom: 24,
  },
  accordion: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  accordionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  accordionIcon: {
    fontSize: 20,
    color: '#000',
    fontWeight: '300',
  },
  accordionContent: {
    paddingBottom: 16,
  },
  accordionText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
  },
  accordionBullet: {
    fontSize: 13,
    lineHeight: 22,
    color: '#666',
  },
  // Brand Values
  brandValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  brandValueItem: {
    alignItems: 'center',
    flex: 1,
  },
  brandValueIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  brandValueTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  // Related Products Section
  relatedSection: {
    paddingVertical: 24,
    backgroundColor: '#f9f9f9',
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  relatedList: {
    paddingHorizontal: 8,
  },
  // Custom Alert Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  alertIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  alertButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

