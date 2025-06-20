
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockGreetingCards } from '@/data/mockData';
import { GreetingCard } from '@/types';

const CardManagement = () => {
  const [cards, setCards] = useState<GreetingCard[]>(mockGreetingCards);
  const [editingCard, setEditingCard] = useState<GreetingCard | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: ''
  });

  const handleEdit = (card: GreetingCard) => {
    setEditingCard(card);
    setFormData({
      name: card.name,
      price: card.price,
      image: card.image
    });
  };

  const handleSave = () => {
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id 
          ? { ...card, ...formData }
          : card
      ));
    } else {
      const newCard: GreetingCard = {
        id: Date.now().toString(),
        ...formData
      };
      setCards([...cards, newCard]);
    }
    
    setEditingCard(null);
    setFormData({ name: '', price: 0, image: '' });
  };

  const handleDelete = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleCancel = () => {
    setEditingCard(null);
    setFormData({ name: '', price: 0, image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingCard ? 'Edit Greeting Card' : 'Add New Greeting Card'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Card Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter card name"
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
            <div className="col-span-2">
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
              {editingCard ? 'Update Card' : 'Add Card'}
            </Button>
            {editingCard && (
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardContent className="p-4">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{card.name}</h3>
              <p className="text-lg font-bold text-primary-600">${card.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleEdit(card)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(card.id)}>
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

export default CardManagement;
