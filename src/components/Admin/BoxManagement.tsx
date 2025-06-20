
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockBoxes } from '@/data/mockData';
import { Box } from '@/types';

const BoxManagement = () => {
  const [boxes, setBoxes] = useState<Box[]>(mockBoxes);
  const [editingBox, setEditingBox] = useState<Box | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    price: 0,
    image: ''
  });

  const handleEdit = (box: Box) => {
    setEditingBox(box);
    setFormData({
      name: box.name,
      color: box.color,
      price: box.price,
      image: box.image
    });
  };

  const handleSave = () => {
    if (editingBox) {
      setBoxes(boxes.map(box => 
        box.id === editingBox.id 
          ? { ...box, ...formData }
          : box
      ));
    } else {
      const newBox: Box = {
        id: Date.now().toString(),
        ...formData
      };
      setBoxes([...boxes, newBox]);
    }
    
    setEditingBox(null);
    setFormData({ name: '', color: '', price: 0, image: '' });
  };

  const handleDelete = (id: string) => {
    setBoxes(boxes.filter(box => box.id !== id));
  };

  const handleCancel = () => {
    setEditingBox(null);
    setFormData({ name: '', color: '', price: 0, image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingBox ? 'Edit Box' : 'Add New Box'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Box Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter box name"
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Enter color"
              />
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
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
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingBox ? 'Update Box' : 'Add Box'}
            </Button>
            {editingBox && (
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map((box) => (
          <Card key={box.id}>
            <CardContent className="p-4">
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{box.name}</h3>
              <p className="text-sm text-gray-600">Color: {box.color}</p>
              <p className="text-lg font-bold text-primary-600">${box.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleEdit(box)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(box.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoxManagement;
