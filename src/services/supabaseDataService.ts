
import { supabase } from '@/integrations/supabase/client';
import { Box, Item, GreetingCard, PaperColor, BoxFill } from '@/types';

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
      image: item.image,
      itemCode: item.item_code
    })) || [];
  }

  static async saveItem(item: Omit<Item, 'id'>): Promise<Item | null> {
    const { data, error } = await supabase
      .from('items')
      .insert({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        item_code: item.itemCode
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
      image: data.image,
      itemCode: data.item_code
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

  // Paper Colors
  static async getPaperColors(): Promise<PaperColor[]> {
    const { data, error } = await supabase
      .from('paper_colors')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching paper colors:', error);
      return [];
    }
    
    return data?.map(color => ({
      id: color.id,
      name: color.name,
      colorCode: color.color_code
    })) || [];
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
}
