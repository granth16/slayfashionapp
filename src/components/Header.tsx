import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProp = DrawerNavigationProp<any>;

interface HeaderProps {
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({showMenu = true}) => {
  const navigation = useNavigation<NavigationProp>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      {/* Menu Icon - conditionally shown */}
      {showMenu ? (
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Icon name="menu-outline" size={28} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftSpace} />
      )}

      {/* Logo */}
      <Image
        source={{
          uri: 'https://slay.fashion/cdn/shop/files/SLAY_6.png?v=1761731806&width=180',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Placeholder for balance */}
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSpace: {
    width: 40,
  },
  logo: {
    width: 120,
    height: 40,
  },
  rightSpace: {
    width: 40,
  },
});

