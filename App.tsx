import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './src/screens/HomeScreen';
import {CategoryScreen} from './src/screens/CategoryScreen';
import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {CartScreen} from './src/screens/CartScreen';
import {CartProvider, useCart} from './src/context/CartContext';
import {ShopifyProduct} from './src/services/shopifyService';
import {HomeIcon, CartIcon} from './src/components/CustomIcons';
import {View, Text, StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Main: {category?: string} | undefined;
  ProductDetail: {product: ShopifyProduct};
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
        options={{title: category}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
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

// Drawer Navigator (Categories)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#666',
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="Shirts"
        component={CategoryStack}
        initialParams={{category: 'Shirts'}}
      />
      <Drawer.Screen
        name="Prints"
        component={CategoryStack}
        initialParams={{category: 'Prints'}}
      />
      <Drawer.Screen
        name="Textured"
        component={CategoryStack}
        initialParams={{category: 'Textured'}}
      />
      <Drawer.Screen
        name="Modern Checks"
        component={CategoryStack}
        initialParams={{category: 'Modern Checks'}}
      />
      <Drawer.Screen
        name="Trendy Stripes"
        component={CategoryStack}
        initialParams={{category: 'Trendy Stripes'}}
      />
      <Drawer.Screen
        name="Trends"
        component={CategoryStack}
        initialParams={{category: 'Trends'}}
      />
      <Drawer.Screen
        name="Others"
        component={CategoryStack}
        initialParams={{category: 'Others'}}
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
        component={CartScreen}
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
