
import { SupabaseDataService } from '@/services/supabaseDataService';
import { mockBoxes, mockItems, mockGreetingCards, mockBoxFills } from '@/data/mockData';

export const migrateDataToSupabase = async () => {
  console.log('Starting data migration to Supabase...');
  
  try {
    // Migrate boxes
    console.log('Migrating boxes...');
    for (const box of mockBoxes) {
      const { id, ...boxData } = box;
      await SupabaseDataService.saveBox(boxData);
    }
    
    // Migrate items
    console.log('Migrating items...');
    for (const item of mockItems) {
      const { id, ...itemData } = item;
      await SupabaseDataService.saveItem(itemData);
    }
    
    // Migrate greeting cards
    console.log('Migrating greeting cards...');
    for (const card of mockGreetingCards) {
      const { id, ...cardData } = card;
      await SupabaseDataService.saveCard(cardData);
    }
    
    // Migrate box fills
    console.log('Migrating box fills...');
    for (const fill of mockBoxFills) {
      const { id, ...fillData } = fill;
      await SupabaseDataService.saveBoxFill(fillData);
    }
    
    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
};
