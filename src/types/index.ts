
export interface Box {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
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

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface Order {
  box: Box | null;
  items: CartItem[];
  greetingCard: GreetingCard | null;
  paymentMethod: 'cash' | 'bank';
  customerInfo: {
    fullName: string;
    address: string;
    email: string;
    phone: string;
  };
  receiptFile?: File;
  total: number;
}

export type OrderStep = 'box' | 'items' | 'card' | 'payment' | 'info';
