
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useOrder } from '@/context/OrderContext';
import { mockItems } from '@/data/mockData';
import { Item } from '@/types';

const CATEGORIES = [
  'All Products',
  'Stationery',
  'Flowers', 
  'Soft Toys',
  'Women Accessories',
  'Chocolate',
  'Perfume (Women)',
  'Perfume (Men)',
  'Men\'s Accessories',
  'Baby Care',
  'Women Cosmetics'
];

const SelectItems = () => {
  const {
    addItem,
    updateItemQuantity,
    removeItem,
    order
  } = useOrder();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleItemClick = (item: Item) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(item.id)) {
      newSelectedItems.delete(item.id);
    } else {
      newSelectedItems.add(item.id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleAddItem = (item: Item) => {
    const quantity = quantities[item.id] || 1;
    addItem(item, quantity);
    setQuantities(prev => ({
      ...prev,
      [item.id]: 0
    }));
  };

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = order.items.find(item => item.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const filteredItems = mockItems.filter(item => 
    selectedCategory === 'All Products' || item.category === selectedCategory
  );

  const categoriesWithItems = CATEGORIES.filter(category => 
    category === 'All Products' || mockItems.some(item => item.category === category)
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Items</h2>
        <p className="text-gray-600">Add items to your gift box from our curated selection</p>
      </div>

      {categoriesWithItems.length > 0 ? (
        <>
          <div className="max-w-md mx-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesWithItems.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const cartQuantity = getItemQuantityInCart(item.id);
              const inputQuantity = quantities[item.id] || 1;
              const isSelected = selectedItems.has(item.id);
              return (
                <Card 
                  key={item.id} 
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isSelected ? 'ring-2 ring-primary-600 shadow-lg bg-primary-50' : ''
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(148, 88, 15, 0.05) 0%, transparent 100%), url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394580f' fill-opacity='0.08'%3E%3Cpath d='m0 18 9-9h2v2l-9 9z'/%3E%3Cpath d='m10 10 9-9h2v2l-9 9z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-6">
                    <AspectRatio ratio={1} className="mb-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </AspectRatio>
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Code: {item.itemCode}</p>
                    </div>
                    <p className="text-xl font-bold text-primary-600 mb-4">Rs {item.price.toFixed(2)}</p>
                    
                    {cartQuantity > 0 && (
                      <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                        <p className="text-sm text-primary-700">In cart: {cartQuantity}</p>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemQuantity(item.id, cartQuantity - 1);
                            }}
                          >
                            -
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemQuantity(item.id, cartQuantity + 1);
                            }}
                          >
                            +
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
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
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-sm text-gray-600">qty</span>
                    </div>

                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddItem(item);
                      }} 
                      className="w-full"
                    >
                      Add to Box
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items available yet. Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default SelectItems;
