
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DataService } from '@/services/dataService';
import { Item, ITEM_CATEGORIES } from '@/types';

const ItemManagement = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    image: ''
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const storedItems = DataService.getItems();
    setItems(storedItems);
  };

  const notifyDataUpdate = () => {
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('adminDataUpdate'));
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image
    });
  };

  const handleSave = () => {
    let updatedItems: Item[];
    
    if (editingItem) {
      updatedItems = items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      );
      console.log('Updated item:', { ...editingItem, ...formData });
    } else {
      const newItem: Item = {
        id: Date.now().toString(),
        ...formData
      };
      updatedItems = [...items, newItem];
      console.log('Added new item:', newItem);
    }
    
    setItems(updatedItems);
    DataService.saveItems(updatedItems);
    notifyDataUpdate();
    
    setEditingItem(null);
    setFormData({ name: '', category: '', price: 0, image: '' });
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    DataService.saveItems(updatedItems);
    notifyDataUpdate();
    console.log('Deleted item with id:', id);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({ name: '', category: '', price: 0, image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price (Rs)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL (1:1 ratio recommended)"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
            {editingItem && (
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {ITEM_CATEGORIES.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items
                .filter(item => item.category === category)
                .map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <AspectRatio ratio={1} className="mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </AspectRatio>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-lg font-bold text-primary-600">Rs {item.price.toFixed(2)}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleEdit(item)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {items.filter(item => item.category === category).length === 0 && (
              <p className="text-gray-500 text-center py-8">No items in this category yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManagement;
