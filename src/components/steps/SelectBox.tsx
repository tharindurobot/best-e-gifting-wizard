
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrder } from '@/context/OrderContext';
import { useBoxes } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const SelectBox = () => {
  const { selectBox, setCurrentStep, order } = useOrder();
  const { data: boxes = [], isLoading, error } = useBoxes();

  const handleSelectBox = (box: typeof boxes[0]) => {
    selectBox(box);
  };

  const handleNext = () => {
    if (order.box) {
      setCurrentStep('items');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading boxes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading boxes. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Gift Box</h2>
        <p className="text-gray-600">Select the perfect box for your special gift</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boxes.map(box => (
          <Card 
            key={box.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              order.box?.id === box.id ? 'ring-2 ring-primary-600 shadow-lg bg-primary-50' : ''
            }`}
            onClick={() => handleSelectBox(box)}
          >
            <CardContent className="p-6">
              <img src={box.image} alt={box.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{box.name}</h3>
              <p className="text-gray-600 mb-2">Color: {box.color}</p>
              {box.paperFills && <p className="text-green-600 text-sm mb-2">✓ Free Paper Fills Included</p>}
              <p className="text-2xl font-bold text-primary-600 mb-4">Rs {box.price.toFixed(2)}</p>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectBox(box);
                }} 
                variant={order.box?.id === box.id ? "default" : "outline"} 
                className="w-full"
              >
                {order.box?.id === box.id ? 'Selected ✓' : 'Select Box'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
