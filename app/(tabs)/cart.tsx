import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator, Image, Platform } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function CartScreen() {
  const { items, removeFromCart, addToCart, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    
    // Simulating checkout delay
    setTimeout(() => {
      setIsCheckingOut(false);
      Alert.alert(
        'Order Confirmed! 🎉',
        'Your fresh groceries will reach you in 10 minutes.'
      );
      clearCart();
      router.back();
    }, 1500);
  };

  const deliveryFee = total > 0 && total < 10 ? 2.50 : 0;
  const grandTotal = total + deliveryFee;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)} / item</Text>
      </View>
      
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => removeFromCart(item.id)}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => addToCart(item)}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png' }} 
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Looks like you haven't added anything to your cart yet.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => router.back()}>
            <Text style={styles.browseBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
               <View style={styles.deliveryBadge}>
                 <IconSymbol name="timer" size={20} color="#FF3269" />
                 <Text style={styles.deliveryBadgeText}>Delivery in <Text style={{fontWeight: 'bold'}}>10 mins</Text></Text>
               </View>
            )}
            ListFooterComponent={() => (
              <View style={styles.billContainer}>
                <Text style={styles.billTitle}>Bill Details</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Item Total</Text>
                  <Text style={styles.billValue}>₹{total.toFixed(2)}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Delivery Fee</Text>
                  <Text style={styles.billValue}>
                    {deliveryFee === 0 ? <Text style={{color: '#4caf50'}}>FREE</Text> : `₹${deliveryFee.toFixed(2)}`}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.billRow}>
                  <Text style={styles.billTotalLabel}>Grand Total</Text>
                  <Text style={styles.billTotalValue}>₹{grandTotal.toFixed(2)}</Text>
                </View>
              </View>
            )}
          />
          <View style={styles.footer}>
             <View style={styles.addressBar}>
                <View style={styles.addressIconWrapper}>
                   <IconSymbol name="house.fill" size={20} color="#FF3269" />
                </View>
                <View style={styles.addressInfo}>
                   <Text style={styles.addressTitle}>Delivering to Home</Text>
                   <Text style={styles.addressDesc} numberOfLines={1}>123 React Native St, App Valley</Text>
                </View>
                <Text style={styles.changeText}>Change</Text>
             </View>
             
            <TouchableOpacity 
              style={[styles.checkoutButton, isCheckingOut && styles.checkoutButtonDisabled]} 
              onPress={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.checkoutBtnContent}>
                  <View>
                    <Text style={styles.checkoutBtnAmount}>₹{grandTotal.toFixed(2)}</Text>
                    <Text style={styles.checkoutBtnSub}>TOTAL</Text>
                  </View>
                  <Text style={styles.checkoutButtonText}>Proceed to Pay  →</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee',
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyImage: { width: 120, height: 120, marginBottom: 20, opacity: 0.8 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24, paddingHorizontal: 20 },
  browseBtn: { backgroundColor: '#FF3269', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  browseBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  list: { padding: 16 },
  deliveryBadge: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFE6EF', 
    padding: 12, borderRadius: 12, marginBottom: 16, gap: 8 
  },
  deliveryBadgeText: { color: '#FF3269', fontSize: 15 },
  
  cartItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 12, borderRadius: 12, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#f0f0f0' },
  itemInfo: { flex: 1, marginLeft: 12, marginRight: 8 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  itemPrice: { fontSize: 13, color: '#666' },
  
  quantityControl: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#FF3269', borderRadius: 8,
    paddingVertical: 4, paddingHorizontal: 6
  },
  qtyBtn: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#FF3269', fontSize: 18, fontWeight: 'bold', marginTop: -2 },
  qtyText: { color: '#FF3269', fontSize: 14, fontWeight: 'bold', marginHorizontal: 8 },
  
  billContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  billTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  billLabel: { fontSize: 14, color: '#555' },
  billValue: { fontSize: 14, color: '#222', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  billTotalLabel: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  billTotalValue: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  
  footer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  addressBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 12 },
  addressIconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE6EF', justifyContent: 'center', alignItems: 'center' },
  addressInfo: { flex: 1, marginLeft: 12 },
  addressTitle: { fontSize: 14, fontWeight: '600', color: '#222' },
  addressDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  changeText: { color: '#FF3269', fontSize: 13, fontWeight: '600' },
  
  checkoutButton: { backgroundColor: '#FF3269', padding: 16, borderRadius: 14 },
  checkoutButtonDisabled: { opacity: 0.7 },
  checkoutBtnContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkoutBtnAmount: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  checkoutBtnSub: { color: '#FFB8CA', fontSize: 10, fontWeight: 'bold', marginTop: 2 },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
