import { Product } from '../context/CartContext';

export const CATEGORIES = [
  { id: 'all', name: 'All', image: 'https://images.pexels.com/photos/1133383/pexels-photo-1133383.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'fruits-veg', name: 'Fruits & Veg', image: 'https://images.pexels.com/photos/1133383/pexels-photo-1133383.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'snacks', name: 'Snacks', image: 'https://images.pexels.com/photos/2361102/pexels-photo-2361102.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'cold-drinks', name: 'Cold Drinks', image: 'https://images.pexels.com/photos/1212837/pexels-photo-1212837.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'meat', name: 'Meat', image: 'https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'bakery', name: 'Bakery', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'pantry', name: 'Pantry', image: 'https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  const fvImages = [
    'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1133383/pexels-photo-1133383.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const dairyImages = [
    'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const snackImages = [
    'https://images.pexels.com/photos/1586942/pexels-photo-1586942.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2361102/pexels-photo-2361102.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1043519/pexels-photo-1043519.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  // Fruits & Veg (20 items)
  for (let i = 1; i <= 20; i++) {
    products.push({
      id: `fv-${i}`,
      name: `Fresh ${['Apple', 'Banana', 'Orange', 'Carrot', 'Potato', 'Tomato', 'Onion', 'Spinach', 'Mango', 'Grapes'][i % 10]} ${i}`,
      price: Math.round((Math.random() * 10 + 1) * 100) / 100,
      category: 'Fruits & Veg',
      image: fvImages[i % fvImages.length]
    });
  }

  // Dairy & Eggs (15 items)
  for (let i = 1; i <= 15; i++) {
    products.push({
      id: `de-${i}`,
      name: `${['Milk', 'Cheese', 'Butter', 'Yogurt', 'Eggs', 'Paneer'][i % 6]} Pack ${i}`,
      price: Math.round((Math.random() * 15 + 2) * 100) / 100,
      category: 'Dairy & Eggs',
      image: dairyImages[i % dairyImages.length]
    });
  }

  // Snacks (20 items)
  for (let i = 1; i <= 20; i++) {
    products.push({
      id: `sn-${i}`,
      name: `${['Chips', 'Cookies', 'Chocolate', 'Nuts', 'Popcorn'][i % 5]} Treat ${i}`,
      price: Math.round((Math.random() * 5 + 1) * 100) / 100,
      category: 'Snacks',
      image: snackImages[i % snackImages.length]
    });
  }

  // Cold Drinks (15 items)
  for (let i = 1; i <= 15; i++) {
    products.push({
      id: `cd-${i}`,
      name: `${['Coke', 'Pepsi', 'Juice', 'Water', 'Energy Drink'][i % 5]} Bottle ${i}`,
      price: Math.round((Math.random() * 8 + 1) * 100) / 100,
      category: 'Cold Drinks',
      image: 'https://images.pexels.com/photos/1212837/pexels-photo-1212837.jpeg?auto=compress&cs=tinysrgb&w=400'
    });
  }

  // Meat (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `mt-${i}`,
      name: `${['Chicken', 'Beef', 'Fish', 'Lamb'][i % 4]} Fresh Cut ${i}`,
      price: Math.round((Math.random() * 20 + 5) * 100) / 100,
      category: 'Meat',
      image: 'https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg?auto=compress&cs=tinysrgb&w=400'
    });
  }

  // Bakery (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `bk-${i}`,
      name: `${['Bread', 'Cake', 'Pastry', 'Muffin'][i % 4]} Bakery ${i}`,
      price: Math.round((Math.random() * 12 + 3) * 100) / 100,
      category: 'Bakery',
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400'
    });
  }

  // Pantry (10 items)
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: `py-${i}`,
      name: `${['Rice', 'Pasta', 'Flour', 'Oil', 'Sugar'][i % 5]} Pantry ${i}`,
      price: Math.round((Math.random() * 18 + 4) * 100) / 100,
      category: 'Pantry',
      image: 'https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=400'
    });
  }

  return products;
};

export const GROCERY_ITEMS = generateProducts();
