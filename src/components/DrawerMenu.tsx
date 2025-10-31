import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string, params?: any) => void;
}

const menuItems = [
  {title: 'Home', screen: 'Home'},
  {title: 'Shirts', screen: 'Category', params: {category: 'shirts', title: 'Shirts'}},
  {title: 'Prints', screen: 'Category', params: {category: 'prints', title: 'Prints'}},
  {title: 'Textured', screen: 'Category', params: {category: 'textured', title: 'Textured'}},
  {title: 'Modern Checks', screen: 'Category', params: {category: 'checks', title: 'Modern Checks'}},
  {title: 'Trendy Stripes', screen: 'Category', params: {category: 'stripes', title: 'Trendy Stripes'}},
  {title: 'Trends', screen: 'Category', params: {category: 'trends', title: 'Trends'}},
  {title: 'Others', screen: 'Category', params: {category: 'others', title: 'Others'}},
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  visible,
  onClose,
  onNavigate,
}) => {
  const handleItemPress = (screen: string, params?: any) => {
    onNavigate(screen, params);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SLAY FASHION</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleItemPress(item.screen, item.params)}>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  drawer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
});

