import React, { useState, useMemo } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, 
  SafeAreaView, Platform, ScrollView, TextInput, Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { useCart, Product } from '../../context/CartContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GROCERY_ITEMS, CATEGORIES } from '../../constants/products';

// Unused width removed

export default function HomeScreen() {
  const { items, addToCart, removeFromCart, total } = useCart();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return GROCERY_ITEMS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleNavigateCart = () => {
    router.push('/cart');
  };

  const getProductQuantity = (id: string) => {
    const item = items.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const renderProduct = (item: Product) => {
    const quantity = getProductQuantity(item.id);
    
    return (
      <View key={item.id} style={styles.productCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.addButtonWrapper}>
          {quantity > 0 ? (
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => addToCart(item)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
          
          {/* STICKY HEADER WITH SEARCH */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.locationContainer}>
                <IconSymbol name="paperplane.fill" size={18} color="#FF3269" />
                <View style={styles.locationTextContainer}>
                  <Text style={styles.deliveryTitle}>Deliver in 10-15 mins</Text>
                  <Text style={styles.deliverySubtitle} numberOfLines={1}>React Native Tower, Chennai, TN</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleNavigateCart} style={styles.profileIcon}>
                <IconSymbol name="house.fill" size={24} color="#333" />
                {items.length > 0 && <View style={styles.headerBadge} />}
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchBarContainer}>
              <IconSymbol name="house.fill" size={18} color="#999" />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search for bread, milk, eggs..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <IconSymbol name="house.fill" size={18} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* BANNER */}
          <View style={styles.bannerContainer}>
            <Image 
              source={{uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'}} 
              style={styles.bannerImage} 
            />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>Summer Essentials</Text>
              <Text style={styles.bannerSubText}>Refresh Your Kitchen & Fridge</Text>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CATEGORIES HORIZONTAL */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eat Fresh, Stay Healthy</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {CATEGORIES.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.categoryCardActive
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <View style={styles.categoryImageBg}>
                  <Image source={{uri: category.image}} style={styles.categoryImg} />
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.name && styles.categoryNameActive
                ]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* PRODUCT GRID */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Best Sellers' : selectedCategory}
              <Text style={{fontWeight: '400', fontSize: 14, color: '#666'}}> ({filteredProducts.length} items)</Text>
            </Text>
          </View>
          
          {filteredProducts.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No products found for "{searchQuery}"</Text>
              <TouchableOpacity onPress={() => {setSearchQuery(''); setSelectedCategory('All');}}>
                <Text style={{color: '#FF3269', marginTop: 10, fontWeight: 'bold'}}>Clear filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.productsContainer}>
              {filteredProducts.map(renderProduct)}
            </View>
          )}

          <View style={{height: 120}} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FLOATING CART SUMMARY */}
      {items.length > 0 && (
        <TouchableOpacity style={styles.cartFloatingFooter} onPress={handleNavigateCart} activeOpacity={0.9}>
          <View style={styles.cartFooterLeft}>
            <View style={styles.cartIconCircle}>
               <IconSymbol name="cart.fill" size={18} color="#FF3269" />
               <View style={styles.cartFloatingBadge}>
                  <Text style={styles.cartFloatingBadgeText}>
                    {items.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </Text>
               </View>
            </View>
            <View style={{marginLeft: 12}}>
              <Text style={styles.cartFooterTotal}>₹{total.toFixed(2)}</Text>
              <Text style={styles.cartFooterSubtitle}>Includes taxes & fees</Text>
            </View>
          </View>
          <View style={styles.cartFooterRight}>
            <Text style={styles.cartFooterBtnText}>Next Step</Text>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { 
    padding: 16, backgroundColor: '#fff', 
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  locationTextContainer: { marginLeft: 8 },
  deliveryTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  deliverySubtitle: { fontSize: 12, color: '#666', marginTop: 1 },
  profileIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  headerBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3269', borderWidth: 1, borderColor: '#fff' },
  
  searchBarContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f4f8', 
    borderRadius: 14, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#eef1f5' 
  },
  searchInput: { flex: 1, paddingHorizontal: 10, fontSize: 15, color: '#333' },
  
  bannerContainer: { margin: 16, height: 160, borderRadius: 24, overflow: 'hidden', position: 'relative' },
  bannerImage: { width: '100%', height: '100%', borderRadius: 24 },
  bannerContent: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, padding: 20, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  bannerText: { color: '#fff', fontSize: 24, fontWeight: '900' },
  bannerSubText: { color: '#FFD700', fontSize: 14, fontWeight: '600', marginTop: 4 },
  bannerBtn: { backgroundColor: '#FF3269', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, marginTop: 12 },
  bannerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  sectionHeader: { paddingHorizontal: 16, marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#222' },

  categoryList: { paddingHorizontal: 8, marginBottom: 10 },
  categoryCard: { width: 85, alignItems: 'center', marginHorizontal: 8, opacity: 0.8 },
  categoryCardActive: { opacity: 1 },
  categoryImageBg: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', padding: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  categoryImg: { width: '100%', height: '100%', borderRadius: 35 },
  categoryName: { fontSize: 11, fontWeight: '600', color: '#666', textAlign: 'center' },
  categoryNameActive: { color: '#FF3269', fontWeight: '800' },

  productsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, justifyContent: 'space-between' },
  productCard: { 
    width: Platform.OS === 'web' ? '23%' : '47%', backgroundColor: '#fff', 
    borderRadius: 20, padding: 12, marginBottom: 16, marginHorizontal: '1.5%',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  imageContainer: { width: '100%', height: 110, borderRadius: 16, backgroundColor: '#f8fafc', overflow: 'hidden', marginBottom: 10 },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  productInfo: { marginBottom: 44 },
  productName: { fontSize: 14, fontWeight: '700', color: '#111', lineHeight: 18, height: 36 },
  productCategory: { fontSize: 10, color: '#94a3b8', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  productPrice: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginTop: 6 },
  
  addButtonWrapper: { position: 'absolute', bottom: 12, left: 12, right: 12 },
  addButton: { backgroundColor: '#fff', borderColor: '#FF3269', borderWidth: 1.5, borderRadius: 12, paddingVertical: 8, alignItems: 'center' },
  addButtonText: { color: '#FF3269', fontWeight: '800', fontSize: 14 },
  
  quantityControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FF3269', borderRadius: 12, padding: 4 },
  qtyBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  qtyText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },

  noResults: { padding: 40, alignItems: 'center' },
  noResultsText: { fontSize: 16, color: '#666', textAlign: 'center' },

  cartFloatingFooter: {
    position: 'absolute', bottom: 24, left: 16, right: 16, 
    height: 68, backgroundColor: '#111', borderRadius: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 15,
    maxWidth: Platform.OS === 'web' ? 500 : 'auto', alignSelf: 'center', width: Platform.OS === 'web' ? '100%' : 'auto'
  },
  cartFooterLeft: { flexDirection: 'row', alignItems: 'center' },
  cartIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  cartFloatingBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF3269', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#111' },
  cartFloatingBadgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  cartFooterTotal: { color: '#fff', fontSize: 18, fontWeight: '800' },
  cartFooterSubtitle: { color: '#94a3b8', fontSize: 10, fontWeight: '500' },
  cartFooterBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', marginRight: 8 },
  cartFooterRight: { flexDirection: 'row', alignItems: 'center' }
});
