
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DataService } from '@/services/dataService';
import { BoxFill } from '@/types';

const BoxFillManagement = () => {
  const [boxFills, setBoxFills] = useState<BoxFill[]>([]);
  const [editingFill, setEditingFill] = useState<BoxFill | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    isFree: true,
    isVisible: true
  });

  useEffect(() => {
    loadBoxFills();
  }, []);

  const loadBoxFills = () => {
    const fills = DataService.getBoxFills();
    setBoxFills(fills);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.image.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingFill) {
      // Update existing
      const updatedFills = boxFills.map(fill =>
        fill.id === editingFill.id
          ? { ...editingFill, ...formData }
          : fill
      );
      setBoxFills(updatedFills);
      DataService.saveBoxFills(updatedFills);
      
      toast({
        title: "Success",
        description: "Box fill updated successfully"
      });
    } else {
      // Add new
      const newFill: BoxFill = {
        id: Date.now().toString(),
        ...formData
      };
      const updatedFills = [...boxFills, newFill];
      setBoxFills(updatedFills);
      DataService.saveBoxFills(updatedFills);
      
      toast({
        title: "Success",
        description: "Box fill added successfully"
      });
    }

    // Reset form
    setFormData({
      name: '',
      image: '',
      isFree: true,
      isVisible: true
    });
    setEditingFill(null);
    setIsAdding(false);

    // Trigger update event
    window.dispatchEvent(new Event('adminDataUpdate'));
  };

  const handleEdit = (fill: BoxFill) => {
    setEditingFill(fill);
    setFormData({
      name: fill.name,
      image: fill.image,
      isFree: fill.isFree,
      isVisible: fill.isVisible
    });
    setIsAdding(true);
  };

  const handleDelete = (fillId: string) => {
    const updatedFills = boxFills.filter(fill => fill.id !== fillId);
    setBoxFills(updatedFills);
    DataService.saveBoxFills(updatedFills);
    
    toast({
      title: "Success",
      description: "Box fill deleted successfully"
    });

    // Trigger update event
    window.dispatchEvent(new Event('adminDataUpdate'));
  };

  const toggleVisibility = (fillId: string) => {
    const updatedFills = boxFills.map(fill =>
      fill.id === fillId
        ? { ...fill, isVisible: !fill.isVisible }
        : fill
    );
    setBoxFills(updatedFills);
    DataService.saveBoxFills(updatedFills);

    // Trigger update event
    window.dispatchEvent(new Event('adminDataUpdate'));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      isFree: true,
      isVisible: true
    });
    setEditingFill(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Box Fill Management</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Box Fill</span>
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingFill ? 'Edit Box Fill' : 'Add New Box Fill'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Shredded Paper"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFree"
                  checked={formData.isFree}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked })}
                />
                <Label htmlFor="isFree">Free Item</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
                />
                <Label htmlFor="isVisible">Visible to Customers</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingFill ? 'Update' : 'Add'} Box Fill
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxFills.map((fill) => (
          <Card key={fill.id} className={`${!fill.isVisible ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="aspect-square mb-3 rounded-lg overflow-hidden">
                <img
                  src={fill.image}
                  alt={fill.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{fill.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={fill.isFree ? 'text-green-600' : 'text-gray-600'}>
                    {fill.isFree ? 'FREE' : 'PAID'}
                  </span>
                  <span className={fill.isVisible ? 'text-green-600' : 'text-red-600'}>
                    {fill.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Switch
                    checked={fill.isVisible}
                    onCheckedChange={() => toggleVisibility(fill.id)}
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(fill)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(fill.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoxFillManagement;
