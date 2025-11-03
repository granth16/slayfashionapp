import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {CategoryScreen} from './src/screens/CategoryScreen';
import {ProductDetailScreen} from './src/screens/ProductDetailScreen';
import {ShopifyProduct} from './src/services/shopifyService';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
        options={{title: 'SLAY FASHION'}}
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

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
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
    </NavigationContainer>
  );
}

export default App;
