
import { Box, Item, GreetingCard, BoxFill } from '@/types';

export const mockBoxes: Box[] = [
  {
    id: '1',
    name: 'Elegant Rose Gold Box',
    color: 'Rose Gold',
    price: 850.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    paperFills: true
  },
  {
    id: '2',
    name: 'Classic Black Box',
    color: 'Black',
    price: 750.00,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    paperFills: false
  },
  {
    id: '3',
    name: 'Premium White Box',
    color: 'White',
    price: 900.00,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    paperFills: true
  },
  {
    id: '4',
    name: 'Royal Blue Box',
    color: 'Royal Blue',
    price: 800.00,
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd1cb?w=400&h=400&fit=crop',
    paperFills: true
  },
  {
    id: '5',
    name: 'Vintage Brown Box',
    color: 'Brown',
    price: 700.00,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    paperFills: false
  },
  {
    id: '6',
    name: 'Silver Sparkle Box',
    color: 'Silver',
    price: 950.00,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    paperFills: true
  },
  {
    id: '7',
    name: 'Pink Velvet Box',
    color: 'Pink',
    price: 880.00,
    image: 'https://images.unsplash.com/photo-1582582494951-d7e5a9e5bee8?w=400&h=400&fit=crop',
    paperFills: true
  },
  {
    id: '8',
    name: 'Green Forest Box',
    color: 'Forest Green',
    price: 820.00,
    image: 'https://images.unsplash.com/photo-1607344645866-009c7d0435c7?w=400&h=400&fit=crop',
    paperFills: false
  }
];

export const mockItems: Item[] = [
  // Stationery
  {
    id: '1',
    name: 'Premium Fountain Pen Set',
    category: 'Stationery',
    price: 2500.00,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Leather Bound Notebook',
    category: 'Stationery',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Gold Planner Set',
    category: 'Stationery',
    price: 1800.00,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
  },
  
  // Flowers
  {
    id: '4',
    name: 'Red Rose Bouquet',
    category: 'Flowers',
    price: 1800.00,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Mixed Seasonal Bouquet',
    category: 'Flowers',
    price: 2200.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'White Lily Arrangement',
    category: 'Flowers',
    price: 1950.00,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop'
  },
  
  // Soft Toys
  {
    id: '7',
    name: 'Teddy Bear Large',
    category: 'Soft Toys',
    price: 3200.00,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    name: 'Plush Heart Pillow',
    category: 'Soft Toys',
    price: 2400.00,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop'
  },
  {
    id: '9',
    name: 'Bunny Soft Toy',
    category: 'Soft Toys',
    price: 2800.00,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop'
  },
  
  // Women Accessories
  {
    id: '10',
    name: 'Silk Scarf Collection',
    category: 'Women Accessories',
    price: 4500.00,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop'
  },
  {
    id: '11',
    name: 'Designer Hair Clips Set',
    category: 'Women Accessories',
    price: 1800.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
  },
  {
    id: '12',
    name: 'Pearl Bracelet',
    category: 'Women Accessories',
    price: 3500.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
  },
  
  // Chocolate
  {
    id: '13',
    name: 'Ferrero Rocher Box',
    category: 'Chocolate',
    price: 1500.00,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop'
  },
  {
    id: '14',
    name: 'Dairy Milk Silk Collection',
    category: 'Chocolate',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop'
  },
  {
    id: '15',
    name: 'Belgian Chocolate Assortment',
    category: 'Chocolate',
    price: 2800.00,
    image: 'https://images.unsplash.com/photo-1550131849-5aada23c7ea3?w=400&h=400&fit=crop'
  },
  
  // Perfume (Women)
  {
    id: '16',
    name: 'Chanel No. 5 Perfume',
    category: 'Perfume (Women)',
    price: 8500.00,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop'
  },
  {
    id: '17',
    name: 'Floral Essence Collection',
    category: 'Perfume (Women)',
    price: 6200.00,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop'
  },
  
  // Perfume (Men)
  {
    id: '18',
    name: 'Hugo Boss Cologne',
    category: 'Perfume (Men)',
    price: 7500.00,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop'
  },
  {
    id: '19',
    name: 'Dior Sauvage Set',
    category: 'Perfume (Men)',
    price: 9200.00,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop'
  },
  
  // Men's Accessories
  {
    id: '20',
    name: 'Leather Wallet Premium',
    category: "Men's Accessories",
    price: 3800.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
  },
  {
    id: '21',
    name: 'Classic Wrist Watch',
    category: "Men's Accessories",
    price: 12500.00,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
  },
  {
    id: '22',
    name: 'Cufflinks Set',
    category: "Men's Accessories",
    price: 2800.00,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop'
  },
  
  // Baby Care
  {
    id: '23',
    name: 'Baby Care Gift Set',
    category: 'Baby Care',
    price: 5500.00,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop'
  },
  {
    id: '24',
    name: 'Organic Baby Lotion',
    category: 'Baby Care',
    price: 1800.00,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop'
  },
  {
    id: '25',
    name: 'Gentle Baby Wipes Pack',
    category: 'Baby Care',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1544873040-9f1e69b9e9d7?w=400&h=400&fit=crop'
  },
  
  // Women Cosmetics
  {
    id: '26',
    name: 'Luxury Makeup Kit',
    category: 'Women Cosmetics',
    price: 8900.00,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  },
  {
    id: '27',
    name: 'Matte Lipstick Collection',
    category: 'Women Cosmetics',
    price: 3500.00,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
  },
  {
    id: '28',
    name: 'Compact Powder Set',
    category: 'Women Cosmetics',
    price: 2800.00,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop'
  }
];

export const mockGreetingCards: GreetingCard[] = [
  {
    id: '1',
    name: 'Happy Birthday Card',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Congratulations Card',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Thank You Card',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Love You Card',
    price: 200.00,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Best Wishes Card',
    price: 160.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Get Well Soon Card',
    price: 140.00,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop'
  }
];

export const mockBoxFills: BoxFill[] = [
  {
    id: '1',
    name: 'Gold Shreds',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  },
  {
    id: '2',
    name: 'White Tissue',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  },
  {
    id: '3',
    name: 'Confetti Mix',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  },
  {
    id: '4',
    name: 'Silk Ribbons',
    image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  },
  {
    id: '5',
    name: 'Silver Tinsel',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  },
  {
    id: '6',
    name: 'Rose Petals',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    isFree: true,
    isVisible: true
  }
];
