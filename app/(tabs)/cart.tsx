import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useCart } from '../../context/CartContext';
import { sendOrderToGoogleSheets } from '../../utils/googleSheets';

export default function CartScreen() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Please add some items to your cart first.');
      return;
    }

    setIsCheckingOut(true);
    try {
      // 1. Get Location
      const { status } = await Location.requestForegroundPermissionsAsync();
      let latitude = null;
      let longitude = null;
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      } else {
        console.warn('Permission to access location was denied');
      }

      // 2. Prepare Data
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        total: total,
        items: items.map(i => `${i.quantity}x ${i.name}`).join(', '),
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
      };

      // 3. Send to Google Sheets (Will show warning if not configured in utils/googleSheets.ts)
      await sendOrderToGoogleSheets(orderData);

      Alert.alert(
        'Order Placed Successfully!',
        'Your fresh groceries are on the way. We tracked your delivery location.'
      );
      clearCart();
    } catch (error) {
      Alert.alert('Checkout Failed', 'Something went wrong during checkout.');
      console.error(error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is completely empty. Let's add some fresh groceries!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.checkoutButton, isCheckingOut && styles.checkoutButtonDisabled]} 
              onPress={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.checkoutButtonText}>Place Order (Collect Cash/Location)</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  list: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  },
  removeButton: {
    backgroundColor: '#ff5252',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  checkoutButton: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#81c784',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
