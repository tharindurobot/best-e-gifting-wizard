
export interface Box {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
  paperFills?: boolean;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface GreetingCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface BoxFill {
  id: string;
  name: string;
  image: string;
  isFree: boolean;
  isVisible: boolean;
}

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface PaperColor {
  id: string;
  name: string;
  colorCode: string;
}

export interface Order {
  box: Box | null;
  items: CartItem[];
  greetingCard: GreetingCard | null;
  selectedPaperColors: string[];
  selectedBoxFills: string[];
  paymentMethod: 'cash' | 'bank';
  customerInfo: {
    fullName: string;
    billingAddress: string;
    address: string;
    email: string;
    phone: string;
    comment?: string;
  };
  receiptFile?: File;
  total: number;
}

export interface DatabaseOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  delivery_address: string;
  delivery_date: string;
  comment?: string;
  selected_box: any;
  selected_items: any;
  greeting_card?: any;
  total_amount: number;
  payment_method: 'cash' | 'bank';
  bank_slip_url?: string;
  order_date: string;
  created_at: string;
}

export type OrderStep = 'box' | 'items' | 'fills' | 'card' | 'payment' | 'info';

export const ITEM_CATEGORIES = [
  'Stationery',
  'Flowers', 
  'Soft Toys',
  'Women Accessories',
  'Chocolate',
  'Perfume (Men)',
  'Perfume (Women)',
  'Men\'s Accessories',
  'Baby Care',
  'Women Cosmetics'
] as const;

export const DEFAULT_PAPER_COLORS: PaperColor[] = [
  { id: '1', name: 'Red', colorCode: '#FF0000' },
  { id: '2', name: 'Blue', colorCode: '#0000FF' },
  { id: '3', name: 'Green', colorCode: '#008000' },
  { id: '4', name: 'Yellow', colorCode: '#FFFF00' },
  { id: '5', name: 'Purple', colorCode: '#800080' },
  { id: '6', name: 'Orange', colorCode: '#FFA500' },
  { id: '7', name: 'Pink', colorCode: '#FFC0CB' },
  { id: '8', name: 'Black', colorCode: '#000000' },
  { id: '9', name: 'White', colorCode: '#FFFFFF' },
  { id: '10', name: 'Brown', colorCode: '#A52A2A' },
  { id: '11', name: 'Gold', colorCode: '#FFD700' },
  { id: '12', name: 'Silver', colorCode: '#C0C0C0' },
  { id: '13', name: 'Turquoise', colorCode: '#40E0D0' },
  { id: '14', name: 'Lime', colorCode: '#00FF00' },
  { id: '15', name: 'Magenta', colorCode: '#FF00FF' },
  { id: '16', name: 'Navy', colorCode: '#000080' },
  { id: '17', name: 'Coral', colorCode: '#FF7F50' },
  { id: '18', name: 'Lavender', colorCode: '#E6E6FA' },
  { id: '19', name: 'Mint', colorCode: '#98FB98' },
  { id: '20', name: 'Peach', colorCode: '#FFCBA4' }
];
