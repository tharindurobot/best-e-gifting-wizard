
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrder } from '@/context/OrderContext';
import { useBoxFills } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const SelectBoxFills = () => {
  const { order, setSelectedBoxFills } = useOrder();
  const { data: boxFills = [], isLoading, error } = useBoxFills();
  const [selectedFills, setSelectedFills] = useState<string[]>(order.selectedBoxFills);

  const handleFillToggle = (fillId: string) => {
    const newSelectedFills = selectedFills.includes(fillId)
      ? selectedFills.filter(id => id !== fillId)
      : [...selectedFills, fillId];
    
    setSelectedFills(newSelectedFills);
    setSelectedBoxFills(newSelectedFills);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading box fills...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading box fills. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Box Fills</h2>
        <p className="text-gray-600">Select decorative fills for your gift box (All Free!)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boxFills.map((fill) => (
          <Card 
            key={fill.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
              selectedFills.includes(fill.id) ? 'ring-2 ring-primary-600 shadow-lg bg-primary-50' : ''
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, ${selectedFills.includes(fill.id) ? 'rgba(148, 88, 15, 0.1)' : 'rgba(148, 88, 15, 0.05)'} 0%, transparent 100%), url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${selectedFills.includes(fill.id) ? '94580f' : 'e5e7eb'}' fill-opacity='0.1'%3E%3Cpath d='m0 18 9-9h2v2l-9 9z'/%3E%3Cpath d='m10 10 9-9h2v2l-9 9z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
            onClick={() => handleFillToggle(fill.id)}
          >
            <CardContent className="p-3">
              <div className="aspect-square mb-2 rounded-lg overflow-hidden">
                <img
                  src={fill.image}
                  alt={fill.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold line-clamp-2">{fill.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-xs">FREE</span>
                  <Checkbox
                    checked={selectedFills.includes(fill.id)}
                    onCheckedChange={() => handleFillToggle(fill.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFills.length > 0 && (
        <div className="bg-primary-50 p-4 rounded-lg">
          <h3 className="font-semibold text-primary-700 mb-2">Selected Box Fills:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFills.map((fillId) => {
              const fill = boxFills.find(f => f.id === fillId);
              return fill ? (
                <span key={fillId} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                  {fill.name} ✓
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBoxFills;
