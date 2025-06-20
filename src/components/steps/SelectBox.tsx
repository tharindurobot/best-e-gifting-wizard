
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrder } from '@/context/OrderContext';
import { mockBoxes } from '@/data/mockData';

const SelectBox = () => {
  const { selectBox, setCurrentStep, order } = useOrder();

  const handleSelectBox = (box: typeof mockBoxes[0]) => {
    selectBox(box);
  };

  const handleNext = () => {
    if (order.box) {
      setCurrentStep('items');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Gift Box</h2>
        <p className="text-gray-600">Select the perfect box for your special gift</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockBoxes.map((box) => (
          <Card key={box.id} className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            order.box?.id === box.id ? 'ring-2 ring-primary-600 shadow-lg' : ''
          }`}>
            <CardContent className="p-6">
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{box.name}</h3>
              <p className="text-gray-600 mb-2">Color: {box.color}</p>
              <p className="text-2xl font-bold text-primary-600 mb-4">Rs {box.price.toFixed(2)}</p>
              <Button
                onClick={() => handleSelectBox(box)}
                variant={order.box?.id === box.id ? "default" : "outline"}
                className="w-full"
              >
                {order.box?.id === box.id ? 'Selected' : 'Select Box'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {order.box && (
        <div className="flex justify-center animate-fade-in">
          <Button onClick={handleNext} size="lg" className="px-8">
            Next: Choose Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
