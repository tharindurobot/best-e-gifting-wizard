
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boxes.map(box => (
          <Card 
            key={box.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              order.box?.id === box.id ? 'ring-2 ring-primary-600 shadow-lg bg-primary-50' : ''
            }`}
            onClick={() => handleSelectBox(box)}
          >
            <CardContent className="p-4">
              <img src={box.image} alt={box.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{box.name}</h3>
              <p className="text-gray-600 mb-1 text-sm">Color: {box.color}</p>
              {box.paperFills && <p className="text-green-600 text-xs mb-2">✓ Free Paper Fills Included</p>}
              <p className="text-xl font-bold text-primary-600 mb-3">Rs {box.price.toFixed(2)}</p>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectBox(box);
                }} 
                variant={order.box?.id === box.id ? "default" : "outline"} 
                className="w-full text-sm"
                size="sm"
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
