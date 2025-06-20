
import { Box, Item, GreetingCard } from '@/types';

export const mockBoxes: Box[] = [
  {
    id: '1',
    name: 'Classic Red Box',
    color: 'Red',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Elegant Black Box',
    color: 'Black',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Golden Luxury Box',
    color: 'Gold',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'
  }
];

export const mockItems: Item[] = [
  // Chocolates
  {
    id: '1',
    name: 'Dark Chocolate Truffles',
    category: 'Chocolates',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Milk Chocolate Hearts',
    category: 'Chocolates',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'White Chocolate Roses',
    category: 'Chocolates',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop'
  },
  // Toys
  {
    id: '4',
    name: 'Cute Teddy Bear',
    category: 'Toys',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop'
  },
  {
    id: '5',
    name: 'Plush Cat',
    category: 'Toys',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop'
  },
  {
    id: '6',
    name: 'Mini Puzzle Set',
    category: 'Toys',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop'
  },
  // Accessories
  {
    id: '7',
    name: 'Silk Scarf',
    category: 'Accessories',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop'
  },
  {
    id: '8',
    name: 'Pearl Earrings',
    category: 'Accessories',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop'
  },
  {
    id: '9',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop'
  }
];

export const mockGreetingCards: GreetingCard[] = [
  {
    id: '1',
    name: 'Happy Birthday Card',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=250&h=350&fit=crop'
  },
  {
    id: '2',
    name: 'Thank You Card',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=350&fit=crop'
  },
  {
    id: '3',
    name: 'Love & Wishes Card',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=250&h=350&fit=crop'
  },
  {
    id: '4',
    name: 'Congratulations Card',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=250&h=350&fit=crop'
  }
];
