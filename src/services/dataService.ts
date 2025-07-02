
import { Box, Item, GreetingCard, PaperColor, DEFAULT_PAPER_COLORS, BoxFill } from '@/types';
import { mockBoxes, mockItems, mockGreetingCards, mockBoxFills } from '@/data/mockData';

const STORAGE_KEYS = {
  BOXES: 'beste_boxes',
  ITEMS: 'beste_items',
  CARDS: 'beste_cards',
  PAPER_COLORS: 'beste_paper_colors',
  BOX_FILLS: 'beste_box_fills'
};

export class DataService {
  // Initialize storage with mock data if empty
  static initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.BOXES)) {
      localStorage.setItem(STORAGE_KEYS.BOXES, JSON.stringify(mockBoxes));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ITEMS)) {
      // Remove item codes from mock items
      const itemsWithoutCodes = mockItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image
      }));
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(itemsWithoutCodes));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CARDS)) {
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(mockGreetingCards));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAPER_COLORS)) {
      localStorage.setItem(STORAGE_KEYS.PAPER_COLORS, JSON.stringify(DEFAULT_PAPER_COLORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOX_FILLS)) {
      localStorage.setItem(STORAGE_KEYS.BOX_FILLS, JSON.stringify(mockBoxFills));
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

  // Paper Colors
  static getPaperColors(): PaperColor[] {
    this.initializeStorage();
    const colors = localStorage.getItem(STORAGE_KEYS.PAPER_COLORS);
    return colors ? JSON.parse(colors) : DEFAULT_PAPER_COLORS;
  }

  static savePaperColors(colors: PaperColor[]): void {
    localStorage.setItem(STORAGE_KEYS.PAPER_COLORS, JSON.stringify(colors));
  }

  // Box Fills
  static getBoxFills(): BoxFill[] {
    this.initializeStorage();
    const fills = localStorage.getItem(STORAGE_KEYS.BOX_FILLS);
    return fills ? JSON.parse(fills) : mockBoxFills;
  }

  static saveBoxFills(fills: BoxFill[]): void {
    localStorage.setItem(STORAGE_KEYS.BOX_FILLS, JSON.stringify(fills));
  }
}
