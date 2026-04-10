import React, { useState, useMemo } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, 
  SafeAreaView, Platform, ScrollView, TextInput, Dimensions,
  KeyboardAvoidingView, StatusBar
} from 'react-native';
import { useCart, Product } from '../../context/CartContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GROCERY_ITEMS, CATEGORIES } from '../../constants/products';

const { width } = Dimensions.get('window');

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
          <Image 
             source={{ uri: item.image }} 
             style={styles.productImage}
             resizeMode="cover"
          />
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          stickyHeaderIndices={[0]}
          contentContainerStyle={styles.scrollContent}
        >
          
          {/* HEADER SECTOR */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.locationContainer}>
                <IconSymbol name="paperplane.fill" size={20} color="#FF3269" />
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
            </View>
          </View>

          {/* BANNER */}
          <View style={styles.bannerContainer}>
            <Image 
              source={{uri: 'https://images.pexels.com/photos/1133383/pexels-photo-1133383.jpeg?auto=compress&cs=tinysrgb&w=800'}} 
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

          {/* CATEGORIES SECTION */}
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
                <Text 
                   style={[
                    styles.categoryName,
                    selectedCategory === category.name && styles.categoryNameActive
                  ]}
                  numberOfLines={1}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* PRODUCT GRID */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Best Sellers' : selectedCategory}
              <Text style={{fontWeight: '400', fontSize: 13, color: '#666'}}> ({filteredProducts.length})</Text>
            </Text>
          </View>
          
          {filteredProducts.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No products found for &quot;{searchQuery}&quot;</Text>
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
              <Text style={styles.cartFooterSubtitle}>View Cart • Includes Taxes</Text>
            </View>
          </View>
          <View style={styles.cartFooterRight}>
            <Text style={styles.cartFooterBtnText}>Next Step</Text>
            <IconSymbol name="chevron.right" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { backgroundColor: '#f5f7fa' },
  header: { 
    paddingHorizontal: 16, 
    paddingTop: Platform.OS === 'ios' ? 40 : 45, // Increased padding to move header down
    paddingBottom: 15,
    backgroundColor: '#fff', 
    borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 8
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  locationTextContainer: { marginLeft: 10, flex: 1 },
  deliveryTitle: { fontSize: 15, fontWeight: '900', color: '#111' },
  deliverySubtitle: { fontSize: 11, color: '#777', marginTop: 2 },
  profileIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f8f9fb', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  headerBadge: { position: 'absolute', top: 10, right: 10, width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#FF3269', borderWidth: 2, borderColor: '#fff' },
  
  searchBarContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f5f9', 
    borderRadius: 16, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#eef2f6' 
  },
  searchInput: { flex: 1, paddingHorizontal: 12, fontSize: 15, color: '#333' },
  
  bannerContainer: { margin: 16, height: 170, borderRadius: 28, overflow: 'hidden', position: 'relative', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  bannerImage: { width: '100%', height: '100%' },
  bannerContent: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, padding: 22, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.35)' },
  bannerText: { color: '#fff', fontSize: 25, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.2)', textShadowRadius: 4 },
  bannerSubText: { color: '#FFD700', fontSize: 15, fontWeight: '700', marginTop: 5 },
  bannerBtn: { backgroundColor: '#FF3269', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginTop: 15 },
  bannerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  sectionHeader: { paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#1a1a1a' },

  categoryList: { paddingHorizontal: 12, paddingBottom: 5 },
  categoryCard: { width: 88, alignItems: 'center', marginHorizontal: 6, opacity: 0.85 },
  categoryCardActive: { opacity: 1 },
  categoryImageBg: { width: 74, height: 74, borderRadius: 37, backgroundColor: '#fff', padding: 5, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 4 },
  categoryImg: { width: '100%', height: '100%', borderRadius: 37 },
  categoryName: { fontSize: 11, fontWeight: '700', color: '#555', textAlign: 'center' },
  categoryNameActive: { color: '#FF3269', fontWeight: '900' },

  productsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-between' },
  productCard: { 
    width: Platform.OS === 'web' ? '23%' : '47%', backgroundColor: '#fff', 
    borderRadius: 24, padding: 12, marginBottom: 18, marginHorizontal: '1.5%',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 4
  },
  imageContainer: { width: '100%', height: 120, borderRadius: 18, backgroundColor: '#fcfcfc', overflow: 'hidden', marginBottom: 12 },
  productImage: { width: '100%', height: '100%' },
  productInfo: { marginBottom: 48, paddingHorizontal: 2 },
  productName: { fontSize: 14, fontWeight: '700', color: '#222', lineHeight: 19, height: 38 },
  productCategory: { fontSize: 10, color: '#999', marginTop: 5, textTransform: 'uppercase', fontWeight: '600' },
  productPrice: { fontSize: 17, fontWeight: '900', color: '#111', marginTop: 6 },
  
  addButtonWrapper: { position: 'absolute', bottom: 12, left: 12, right: 12 },
  addButton: { backgroundColor: '#fff', borderColor: '#FF3269', borderWidth: 1.5, borderRadius: 12, paddingVertical: 8, alignItems: 'center' },
  addButtonText: { color: '#FF3269', fontWeight: '800', fontSize: 14 },
  
  quantityControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FF3269', borderRadius: 12, padding: 4 },
  qtyBtn: { width: 34, height: 34, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  qtyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  noResults: { padding: 50, alignItems: 'center' },
  noResultsText: { fontSize: 16, color: '#888', textAlign: 'center' },

  cartFloatingFooter: {
    position: 'absolute', bottom: 25, left: 18, right: 18, 
    height: 72, backgroundColor: '#1E222A', borderRadius: 22,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 15, elevation: 12,
    maxWidth: Platform.OS === 'web' ? 550 : 'auto', alignSelf: 'center', width: Platform.OS === 'web' ? '100%' : 'auto'
  },
  cartFooterLeft: { flexDirection: 'row', alignItems: 'center' },
  cartIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  cartFloatingBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#FF3269', borderRadius: 11, width: 22, height: 22, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#1E222A' },
  cartFloatingBadgeText: { color: '#fff', fontSize: 11, fontWeight: '900' },
  cartFooterTotal: { color: '#fff', fontSize: 19, fontWeight: '900' },
  cartFooterSubtitle: { color: '#94a3b8', fontSize: 10, fontWeight: '600', marginTop: 1 },
  cartFooterBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', marginRight: 6 },
  cartFooterRight: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF3269', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 14 }
});
