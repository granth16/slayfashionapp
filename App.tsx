import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {initNotifications} from './src/services/notificationService';
import {HomeScreen} from './src/screens/HomeScreen';
import {CategoryScreen} from './src/screens/CategoryScreen';
import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {CartScreen} from './src/screens/CartScreen';
import {MyOrdersScreen} from './src/screens/MyOrdersScreen';
import {ContactUsScreen} from './src/screens/ContactUsScreen';
import {ReturnsScreen} from './src/screens/ReturnsScreen';
import {MyProfileScreen} from './src/screens/MyProfileScreen';
import {CheckoutScreen} from './src/screens/CheckoutScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {CartProvider, useCart} from './src/context/CartContext';
import {ShopifyProduct} from './src/services/shopifyService';
import {HomeIcon, CartIcon} from './src/components/CustomIcons';
import {CustomDrawerContent} from './src/components/CustomDrawerContent';
import {View, Text, StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Main: {category?: string} | undefined;
  ProductDetail: {product: ShopifyProduct};
  Checkout: undefined;
  Login: undefined;
};

// Stack Navigator for Home with Product Detail
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
        getId={({params}) => params?.product?.id}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Category with Product Detail
function CategoryStack({route}: any) {
  const category = route.params?.category || 'Products';
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={CategoryScreen}
        initialParams={{category}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
        getId={({params}) => params?.product?.id}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Cart with Checkout
function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

// Cart Badge Component
function CartBadge() {
  const {getCartCount} = useCart();
  const count = getCartCount();

  if (count === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}

// Drawer Navigator (Main Menu)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#666',
        drawerActiveBackgroundColor: '#f5f5f5',
        drawerItemStyle: {
          marginHorizontal: 12,
          marginVertical: 5,
          borderRadius: 8,
          paddingLeft: 16,
          paddingVertical: 8,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          marginLeft: 0,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="Catalog"
        component={CategoryStack}
        initialParams={{category: 'All'}}
        options={{title: 'Catalog'}}
      />
      <Drawer.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{title: 'My Orders'}}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{title: 'Contact Us'}}
      />
      <Drawer.Screen
        name="Returns"
        component={ReturnsScreen}
        options={{title: 'Return'}}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{title: 'My Profile'}}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerItemStyle: {display: 'none'}, // Hide from drawer menu
        }}
      />
    </Drawer.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={DrawerNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <View>
              <CartIcon size={size} color={color} />
              <CartBadge />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  // Initialize OneSignal notifications
  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default App;
