
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Search, Loader2 } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { useItems } from '@/hooks/useSupabaseData';
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

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' }
];

const SelectItems = () => {
  const { addItem, updateItemQuantity, removeItem, order } = useOrder();
  const { data: items = [], isLoading, error } = useItems();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name-asc');

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

  // Filter and sort items
  const getFilteredAndSortedItems = () => {
    // First filter by category
    let filteredItems = items.filter(item => 
      selectedCategory === 'All Products' || item.category === selectedCategory
    );

    // Then filter by search query
    if (searchQuery.trim()) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Finally sort the results
    switch (sortBy) {
      case 'name-asc':
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredItems;
  };

  const filteredItems = getFilteredAndSortedItems();
  const categoriesWithItems = CATEGORIES.filter(category => 
    category === 'All Products' || items.some(item => item.category === category)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading items...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading items. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Items</h2>
        <p className="text-gray-600">Add items to your gift box from our curated selection</p>
      </div>

      {categoriesWithItems.length > 0 ? (
        <>
          {/* Category Filter */}
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

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery.trim() 
                  ? `No items found matching "${searchQuery}"` 
                  : "No items available in this category."
                }
              </p>
            </div>
          )}
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
