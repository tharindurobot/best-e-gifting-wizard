
import { SupabaseDataService } from '@/services/supabaseDataService';
import { DataService } from '@/services/dataService';

export const migrateDataToSupabase = async () => {
  console.log('Starting data migration to Supabase...');
  
  try {
    // Get all data from localStorage
    const boxes = DataService.getBoxes();
    const items = DataService.getItems();
    const cards = DataService.getCards();
    const boxFills = DataService.getBoxFills();

    console.log('Migrating boxes...');
    for (const box of boxes) {
      await SupabaseDataService.saveBox({
        name: box.name,
        color: box.color,
        price: box.price,
        image: box.image,
        paperFills: box.paperFills
      });
    }

    console.log('Migrating items...');
    for (const item of items) {
      await SupabaseDataService.saveItem({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image
      });
    }

    console.log('Migrating greeting cards...');
    for (const card of cards) {
      await SupabaseDataService.saveCard({
        name: card.name,
        price: card.price,
        image: card.image
      });
    }

    console.log('Migrating box fills...');
    for (const fill of boxFills) {
      await SupabaseDataService.saveBoxFill({
        name: fill.name,
        image: fill.image,
        isFree: fill.isFree,
        isVisible: fill.isVisible
      });
    }

    console.log('Data migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Data migration failed:', error);
    return false;
  }
};
