
import { useQuery } from '@tanstack/react-query';
import { SupabaseDataService } from '@/services/supabaseDataService';

export const useBoxes = () => {
  return useQuery({
    queryKey: ['boxes'],
    queryFn: SupabaseDataService.getBoxes,
  });
};

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: SupabaseDataService.getItems,
  });
};

export const useGreetingCards = () => {
  return useQuery({
    queryKey: ['greeting-cards'],
    queryFn: SupabaseDataService.getCards,
  });
};

export const usePaperColors = () => {
  return useQuery({
    queryKey: ['paper-colors'],
    queryFn: SupabaseDataService.getPaperColors,
  });
};

export const useBoxFills = () => {
  return useQuery({
    queryKey: ['box-fills'],
    queryFn: SupabaseDataService.getBoxFills,
  });
};
