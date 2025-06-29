
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, Box, Item, GreetingCard, CartItem, OrderStep } from '@/types';

interface OrderContextType {
  order: Order;
  currentStep: OrderStep;
  setCurrentStep: (step: OrderStep) => void;
  selectBox: (box: Box) => void;
  addItem: (item: Item, quantity: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  selectGreetingCard: (card: GreetingCard) => void;
  setPaymentMethod: (method: 'cash' | 'bank') => void;
  setCustomerInfo: (info: Order['customerInfo']) => void;
  setReceiptFile: (file: File) => void;
  setSelectedPaperColors: (colors: string[]) => void;
  setSelectedBoxFills: (fills: string[]) => void;
  getTotalPrice: () => number;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrder: Order = {
  box: null,
  items: [],
  greetingCard: null,
  selectedPaperColors: [],
  selectedBoxFills: [],
  paymentMethod: 'cash',
  customerInfo: {
    fullName: '',
    billingAddress: '',
    address: '',
    email: '',
    phone: '',
    comment: ''
  },
  total: 0
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [currentStep, setCurrentStep] = useState<OrderStep>('box');

  const selectBox = (box: Box) => {
    setOrder(prev => ({ ...prev, box }));
  };

  const addItem = (item: Item, quantity: number) => {
    setOrder(prev => {
      const existingItemIndex = prev.items.findIndex(cartItem => cartItem.item.id === item.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...prev, items: updatedItems };
      } else {
        return { ...prev, items: [...prev.items, { item, quantity }] };
      }
    });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: Math.max(0, quantity) }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0)
    }));
  };

  const removeItem = (itemId: string) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(cartItem => cartItem.item.id !== itemId)
    }));
  };

  const selectGreetingCard = (card: GreetingCard) => {
    setOrder(prev => ({ ...prev, greetingCard: card }));
  };

  const setPaymentMethod = (method: 'cash' | 'bank') => {
    setOrder(prev => ({ ...prev, paymentMethod: method }));
  };

  const setCustomerInfo = (info: Order['customerInfo']) => {
    setOrder(prev => ({ ...prev, customerInfo: info }));
  };

  const setReceiptFile = (file: File) => {
    setOrder(prev => ({ ...prev, receiptFile: file }));
  };

  const setSelectedPaperColors = (colors: string[]) => {
    setOrder(prev => ({ ...prev, selectedPaperColors: colors }));
  };

  const setSelectedBoxFills = (fills: string[]) => {
    setOrder(prev => ({ ...prev, selectedBoxFills: fills }));
  };

  const getTotalPrice = () => {
    const boxPrice = order.box?.price || 0;
    const itemsPrice = order.items.reduce((total, cartItem) => 
      total + (cartItem.item.price * cartItem.quantity), 0
    );
    const cardPrice = order.greetingCard?.price || 0;
    return boxPrice + itemsPrice + cardPrice;
  };

  const resetOrder = () => {
    setOrder(initialOrder);
    setCurrentStep('box');
  };

  return (
    <OrderContext.Provider value={{
      order,
      currentStep,
      setCurrentStep,
      selectBox,
      addItem,
      updateItemQuantity,
      removeItem,
      selectGreetingCard,
      setPaymentMethod,
      setCustomerInfo,
      setReceiptFile,
      setSelectedPaperColors,
      setSelectedBoxFills,
      getTotalPrice,
      resetOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
