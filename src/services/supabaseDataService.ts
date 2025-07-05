import { supabase } from '@/integrations/supabase/client';
import { Box, Item, GreetingCard, PaperColor, BoxFill, DatabaseOrder, DEFAULT_PAPER_COLORS } from '@/types';

export class SupabaseDataService {
  // Boxes
  static async getBoxes(): Promise<Box[]> {
    const { data, error } = await supabase
      .from('boxes')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching boxes:', error);
      return [];
    }
    
    return data?.map(box => ({
      id: box.id,
      name: box.name,
      color: box.color,
      price: Number(box.price),
      image: box.image,
      paperFills: box.paper_fills
    })) || [];
  }

  static async saveBox(box: Omit<Box, 'id'>): Promise<Box | null> {
    const { data, error } = await supabase
      .from('boxes')
      .insert({
        name: box.name,
        color: box.color,
        price: box.price,
        image: box.image,
        paper_fills: box.paperFills
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving box:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      price: Number(data.price),
      image: data.image,
      paperFills: data.paper_fills
    };
  }

  // Items
  static async getItems(): Promise<Item[]> {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching items:', error);
      return [];
    }
    
    return data?.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: Number(item.price),
      image: item.image
    })) || [];
  }

  static async saveItem(item: Omit<Item, 'id'>): Promise<Item | null> {
    const { data, error } = await supabase
      .from('items')
      .insert({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving item:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      price: Number(data.price),
      image: data.image
    };
  }

  // Greeting Cards
  static async getCards(): Promise<GreetingCard[]> {
    const { data, error } = await supabase
      .from('greeting_cards')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching greeting cards:', error);
      return [];
    }
    
    return data?.map(card => ({
      id: card.id,
      name: card.name,
      price: Number(card.price),
      image: card.image
    })) || [];
  }

  static async saveCard(card: Omit<GreetingCard, 'id'>): Promise<GreetingCard | null> {
    const { data, error } = await supabase
      .from('greeting_cards')
      .insert({
        name: card.name,
        price: card.price,
        image: card.image
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving greeting card:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      price: Number(data.price),
      image: data.image
    };
  }

  // Paper Colors - Return default colors since no table exists
  static async getPaperColors(): Promise<PaperColor[]> {
    // Return the default paper colors from types
    return Promise.resolve(DEFAULT_PAPER_COLORS);
  }

  // Box Fills
  static async getBoxFills(): Promise<BoxFill[]> {
    const { data, error } = await supabase
      .from('box_fills')
      .select('*')
      .eq('is_visible', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching box fills:', error);
      return [];
    }
    
    return data?.map(fill => ({
      id: fill.id,
      name: fill.name,
      image: fill.image,
      isFree: fill.is_free,
      isVisible: fill.is_visible
    })) || [];
  }

  static async saveBoxFill(fill: Omit<BoxFill, 'id'>): Promise<BoxFill | null> {
    const { data, error } = await supabase
      .from('box_fills')
      .insert({
        name: fill.name,
        image: fill.image,
        is_free: fill.isFree,
        is_visible: fill.isVisible
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving box fill:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      isFree: data.is_free,
      isVisible: data.is_visible
    };
  }

  // Orders
  static async saveOrder(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    billingAddress: string;
    deliveryAddress: string;
    deliveryDate: string;
    comment?: string;
    selectedBox: any;
    selectedItems: any;
    greetingCard?: any;
    totalAmount: number;
    paymentMethod: 'cash' | 'bank';
    bankSlipUrl?: string;
  }): Promise<DatabaseOrder | null> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        billing_address: orderData.billingAddress,
        delivery_address: orderData.deliveryAddress,
        delivery_date: orderData.deliveryDate,
        comment: orderData.comment,
        selected_box: orderData.selectedBox,
        selected_items: orderData.selectedItems,
        greeting_card: orderData.greetingCard,
        total_amount: orderData.totalAmount,
        payment_method: orderData.paymentMethod as 'cash' | 'bank',
        bank_slip_url: orderData.bankSlipUrl
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving order:', error);
      return null;
    }
    
    return {
      id: data.id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      billing_address: data.billing_address,
      delivery_address: data.delivery_address,
      delivery_date: data.delivery_date,
      comment: data.comment,
      selected_box: data.selected_box,
      selected_items: data.selected_items,
      greeting_card: data.greeting_card,
      total_amount: data.total_amount,
      payment_method: data.payment_method as 'cash' | 'bank',
      bank_slip_url: data.bank_slip_url,
      order_date: data.order_date,
      created_at: data.created_at
    };
  }

  // File Upload for Bank Slips
  static async uploadBankSlip(file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('bank-slips')
      .upload(fileName, file);
    
    if (error) {
      console.error('Error uploading bank slip:', error);
      return null;
    }
    
    const { data } = supabase.storage
      .from('bank-slips')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
}
