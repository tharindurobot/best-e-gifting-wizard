
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataService } from '@/services/dataService';
import { PaperColor } from '@/types';

const PaperColorManagement = () => {
  const [colors, setColors] = useState<PaperColor[]>([]);
  const [editingColor, setEditingColor] = useState<PaperColor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    colorCode: '#000000'
  });

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = () => {
    const storedColors = DataService.getPaperColors();
    setColors(storedColors);
  };

  const notifyDataUpdate = () => {
    window.dispatchEvent(new CustomEvent('adminDataUpdate'));
  };

  const handleEdit = (color: PaperColor) => {
    setEditingColor(color);
    setFormData({
      name: color.name,
      colorCode: color.colorCode
    });
  };

  const handleSave = () => {
    let updatedColors: PaperColor[];
    
    if (editingColor) {
      updatedColors = colors.map(color => 
        color.id === editingColor.id 
          ? { ...color, ...formData }
          : color
      );
    } else {
      const newColor: PaperColor = {
        id: Date.now().toString(),
        ...formData
      };
      updatedColors = [...colors, newColor];
    }
    
    setColors(updatedColors);
    DataService.savePaperColors(updatedColors);
    notifyDataUpdate();
    
    setEditingColor(null);
    setFormData({ name: '', colorCode: '#000000' });
  };

  const handleDelete = (id: string) => {
    const updatedColors = colors.filter(color => color.id !== id);
    setColors(updatedColors);
    DataService.savePaperColors(updatedColors);
    notifyDataUpdate();
  };

  const handleCancel = () => {
    setEditingColor(null);
    setFormData({ name: '', colorCode: '#000000' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingColor ? 'Edit Paper Color' : 'Add New Paper Color'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Color Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter color name"
              />
            </div>
            <div>
              <Label htmlFor="colorCode">Color Code</Label>
              <div className="flex gap-2">
                <Input
                  id="colorCode"
                  type="color"
                  value={formData.colorCode}
                  onChange={(e) => setFormData({ ...formData, colorCode: e.target.value })}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={formData.colorCode}
                  onChange={(e) => setFormData({ ...formData, colorCode: e.target.value })}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingColor ? 'Update Color' : 'Add Color'}
            </Button>
            {editingColor && (
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {colors.map((color) => (
          <Card key={color.id} className="text-center">
            <CardContent className="p-4">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-2 border"
                style={{ backgroundColor: color.colorCode }}
              />
              <h4 className="font-semibold text-sm">{color.name}</h4>
              <p className="text-xs text-gray-500">{color.colorCode}</p>
              <div className="flex gap-1 mt-2">
                <Button size="sm" onClick={() => handleEdit(color)} className="text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(color.id)} className="text-xs">
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

export default PaperColorManagement;
