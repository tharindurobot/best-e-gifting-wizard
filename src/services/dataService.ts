
import { Box, Item, GreetingCard } from '@/types';
import { mockBoxes, mockItems, mockGreetingCards } from '@/data/mockData';

const STORAGE_KEYS = {
  BOXES: 'beste_boxes',
  ITEMS: 'beste_items',
  CARDS: 'beste_cards'
};

export class DataService {
  // Initialize storage with mock data if empty
  static initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.BOXES)) {
      localStorage.setItem(STORAGE_KEYS.BOXES, JSON.stringify(mockBoxes));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ITEMS)) {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(mockItems));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CARDS)) {
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(mockGreetingCards));
    }
  }

  // Boxes
  static getBoxes(): Box[] {
    this.initializeStorage();
    const boxes = localStorage.getItem(STORAGE_KEYS.BOXES);
    return boxes ? JSON.parse(boxes) : mockBoxes;
  }

  static saveBoxes(boxes: Box[]): void {
    localStorage.setItem(STORAGE_KEYS.BOXES, JSON.stringify(boxes));
  }

  // Items
  static getItems(): Item[] {
    this.initializeStorage();
    const items = localStorage.getItem(STORAGE_KEYS.ITEMS);
    return items ? JSON.parse(items) : mockItems;
  }

  static saveItems(items: Item[]): void {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  }

  // Cards
  static getCards(): GreetingCard[] {
    this.initializeStorage();
    const cards = localStorage.getItem(STORAGE_KEYS.CARDS);
    return cards ? JSON.parse(cards) : mockGreetingCards;
  }

  static saveCards(cards: GreetingCard[]): void {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  }
}
