
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrder } from '@/context/OrderContext';
import { useGreetingCards } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const SelectGreetingCard = () => {
  const { selectGreetingCard, order } = useOrder();
  const { data: greetingCards = [], isLoading, error } = useGreetingCards();

  const handleSelectCard = (card: typeof greetingCards[0]) => {
    selectGreetingCard(card);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading greeting cards...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading greeting cards. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Greeting Card</h2>
        <p className="text-gray-600">Add a personal touch with a beautiful greeting card</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {greetingCards.map((card) => (
          <Card 
            key={card.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              order.greetingCard?.id === card.id ? 'ring-2 ring-primary-600 shadow-lg bg-primary-50' : ''
            }`}
            onClick={() => handleSelectCard(card)}
          >
            <CardContent className="p-4">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <p className="text-xl font-bold text-primary-600 mb-4">Rs {card.price.toFixed(2)}</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard(card);
                }}
                variant={order.greetingCard?.id === card.id ? "default" : "outline"}
                className="w-full"
              >
                {order.greetingCard?.id === card.id ? 'Selected ✓' : 'Select Card'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectGreetingCard;
