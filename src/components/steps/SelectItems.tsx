import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrder } from '@/context/OrderContext';
import { DataService } from '@/services/dataService';
import { Item } from '@/types';

const SelectItems = () => {
  const { addItem, updateItemQuantity, removeItem, setCurrentStep, order } = useOrder();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [items, setItems] = useState<Item[]>([]);

  const categories = ['Chocolates', 'Toys', 'Accessories'];

  useEffect(() => {
    loadItems();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadItems();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from admin panel
    window.addEventListener('adminDataUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminDataUpdate', handleStorageChange);
    };
  }, []);

  const loadItems = () => {
    const storedItems = DataService.getItems();
    setItems(storedItems);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  const handleAddItem = (item: Item) => {
    const quantity = quantities[item.id] || 1;
    addItem(item, quantity);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = order.items.find(item => item.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleNext = () => {
    setCurrentStep('card');
  };

  const handleBack = () => {
    setCurrentStep('box');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Items</h2>
        <p className="text-gray-600">Add items to your gift box from our curated selection</p>
      </div>

      <Tabs defaultValue="Chocolates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items
                .filter(item => item.category === category)
                .map((item) => {
                  const cartQuantity = getItemQuantityInCart(item.id);
                  const inputQuantity = quantities[item.id] || 1;
                  
                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                        <p className="text-xl font-bold text-primary-600 mb-4">Rs {item.price.toFixed(2)}</p>
                        
                        {cartQuantity > 0 && (
                          <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                            <p className="text-sm text-primary-700">In cart: {cartQuantity}</p>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateItemQuantity(item.id, cartQuantity - 1)}
                              >
                                -
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateItemQuantity(item.id, cartQuantity + 1)}
                              >
                                +
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                          <Input
                            type="number"
                            min="1"
                            value={inputQuantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="w-20"
                          />
                          <span className="text-sm text-gray-600">qty</span>
                        </div>

                        <Button
                          onClick={() => handleAddItem(item)}
                          className="w-full"
                        >
                          Add to Box
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          Back: Select Box
        </Button>
        <Button onClick={handleNext}>
          Next: Choose Greeting Card
        </Button>
      </div>
    </div>
  );
};

export default SelectItems;
