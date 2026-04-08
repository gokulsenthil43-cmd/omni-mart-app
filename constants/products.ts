import { Product } from '../context/CartContext';

export const CATEGORIES = [
  { id: 'all', name: 'All', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80' },
  { id: 'fruits-veg', name: 'Fruits & Veg', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=80' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&q=80' },
  { id: 'snacks', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&q=80' },
  { id: 'cold-drinks', name: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=80' },
  { id: 'meat', name: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&q=80' },
  { id: 'bakery', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
  { id: 'pantry', name: 'Pantry', image: 'https://images.unsplash.com/photo-1584281722573-0498b8949826?w=200&q=80' },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  // Fruits & Veg (20 items)
  for (let i = 1; i <= 20; i++) {
    products.push({
      id: `fv-${i}`,
      name: `Fresh ${['Apple', 'Banana', 'Orange', 'Carrot', 'Potato', 'Tomato', 'Onion', 'Spinach', 'Mango', 'Grapes'][i % 10]} ${i}`,
      price: Math.round((Math.random() * 10 + 1) * 100) / 100,
      category: 'Fruits & Veg',
      image: `https://images.unsplash.com/photo-${['1560806887-1e4cd0b6faa6', '1571501478200-264245d1f7c5', '1598170845058-32b9d6a5da37', '1557844352-761f2565b576', '1518977676601-b53f82aba655', '1582284540020-8acaf0181717'][i % 6]}?w=400&q=80`
    });
  }

  // Dairy & Eggs (15 items)
  for (let i = 1; i <= 15; i++) {
    products.push({
      id: `de-${i}`,
      name: `${['Milk', 'Cheese', 'Butter', 'Yogurt', 'Eggs', 'Paneer'][i % 6]} Pack ${i}`,
      price: Math.round((Math.random() * 15 + 2) * 100) / 100,
      category: 'Dairy & Eggs',
      image: `https://images.unsplash.com/photo-${['1563636619276-2f8e4c1f7bfd', '1588195538326-c5b1e9f80a1b', '1506976785307-8732e854ad03', '1488477181946-6428a0291777'][i % 4]}?w=400&q=80`
    });
  }

  // Snacks (20 items)
  for (let i = 1; i <= 20; i++) {
    products.push({
      id: `sn-${i}`,
      name: `${['Chips', 'Cookies', 'Chocolate', 'Nuts', 'Popcorn'][i % 5]} Treat ${i}`,
      price: Math.round((Math.random() * 5 + 1) * 100) / 100,
      category: 'Snacks',
      image: `https://images.unsplash.com/photo-${['1566478989037-eec170784d0b', '1551024601-bec78aea704b', '1599490659223-930b447871fc', '1621939514649-280e2ee25f60'][i % 4]}?w=400&q=80`
    });
  }

  // Cold Drinks (15 items)
  for (let i = 1; i <= 15; i++) {
    products.push({
      id: `cd-${i}`,
      name: `${['Coke', 'Pepsi', 'Juice', 'Water', 'Energy Drink'][i % 5]} Bottle ${i}`,
      price: Math.round((Math.random() * 8 + 1) * 100) / 100,
      category: 'Cold Drinks',
      image: `https://images.unsplash.com/photo-${['1622483767028-3f66f32aef97', '1527960669566-f882ba85a4c6', '1613478223719-2ab80260f00c'][i % 3]}?w=400&q=80`
    });
  }

  // Meat (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `mt-${i}`,
      name: `${['Chicken', 'Beef', 'Fish', 'Lamb'][i % 4]} Fresh Cut ${i}`,
      price: Math.round((Math.random() * 20 + 5) * 100) / 100,
      category: 'Meat',
      image: `https://images.unsplash.com/photo-${['1604503468506-a8da13d82791', '1607623814075-e51df1bdc82f', '1519708227418-c8fd9a32b7a2'][i % 3]}?w=400&q=80`
    });
  }

  // Bakery (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `bk-${i}`,
      name: `${['Bread', 'Cake', 'Pastry', 'Muffin'][i % 4]} Bakery ${i}`,
      price: Math.round((Math.random() * 12 + 3) * 100) / 100,
      category: 'Bakery',
      image: `https://images.unsplash.com/photo-${['1509440159596-0249088772ff', '1578985543417-70f48cf5323e', '1558301211-0d8c8ddee6ec'][i % 3]}?w=400&q=80`
    });
  }

  // Pantry (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `py-${i}`,
      name: `${['Rice', 'Pasta', ' Flour', 'Oil', 'Sugar'][i % 5]} Pantry ${i}`,
      price: Math.round((Math.random() * 18 + 4) * 100) / 100,
      category: 'Pantry',
      image: `https://images.unsplash.com/photo-${['1586201375761-83865001e31c', '1612966809572-775207a07b30', '1474979266404-7eaacbacf82a'][i % 3]}?w=400&q=80`
    });
  }

  return products;
};

export const GROCERY_ITEMS = generateProducts();
