import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from './src/screens/HomeScreen';
import {CategoryScreen} from './src/screens/CategoryScreen';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#666',
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'SLAY FASHION'}}
        />
        <Drawer.Screen
          name="Shirts"
          component={CategoryScreen}
          initialParams={{category: 'Shirts'}}
        />
        <Drawer.Screen
          name="Prints"
          component={CategoryScreen}
          initialParams={{category: 'Prints'}}
        />
        <Drawer.Screen
          name="Textured"
          component={CategoryScreen}
          initialParams={{category: 'Textured'}}
        />
        <Drawer.Screen
          name="Modern Checks"
          component={CategoryScreen}
          initialParams={{category: 'Modern Checks'}}
        />
        <Drawer.Screen
          name="Trendy Stripes"
          component={CategoryScreen}
          initialParams={{category: 'Trendy Stripes'}}
        />
        <Drawer.Screen
          name="Trends"
          component={CategoryScreen}
          initialParams={{category: 'Trends'}}
        />
        <Drawer.Screen
          name="Others"
          component={CategoryScreen}
          initialParams={{category: 'Others'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
