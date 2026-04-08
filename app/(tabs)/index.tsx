import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useCart, Product } from '../../context/CartContext';

const GROCERY_ITEMS: Product[] = [
  { id: '1', name: 'Fresh Apples (1kg)', price: 4.99, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?w=400&q=80' },
  { id: '2', name: 'Organic Bananas (1 Dozen)', price: 2.99, category: 'Fruits', image: 'https://images.unsplash.com/photo-1571501478200-264245d1f7c5?w=400&q=80' },
  { id: '3', name: 'Whole Milk (1 Gallon)', price: 3.49, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619276-2f8e4c1f7bfd?w=400&q=80' },
  { id: '4', name: 'Farm Eggs (12 pcs)', price: 2.89, category: 'Dairy', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80' },
  { id: '5', name: 'Whole Wheat Bread', price: 2.49, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { id: '6', name: 'Chicken Breast (1kg)', price: 8.99, category: 'Meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80' },
];

export default function HomeScreen() {
  const { addToCart } = useCart();

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>OmniMart</Text>
        <Text style={styles.headerSubtitle}>Fresh Groceries Delivered</Text>
      </View>
      <FlatList
        data={GROCERY_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={Platform.OS === 'web' ? 3 : 2}
        key={Platform.OS === 'web' ? 'web' : 'mobile'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      web: {
        alignItems: 'center',
      }
    })
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 10,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    maxWidth: Platform.OS === 'web' ? 300 : '100%',
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
