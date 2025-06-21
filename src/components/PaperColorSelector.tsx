
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrder } from '@/context/OrderContext';
import { DataService } from '@/services/dataService';
import { PaperColor } from '@/types';

const PaperColorSelector = () => {
  const { order, setSelectedPaperColors } = useOrder();
  const [paperColors, setPaperColors] = useState<PaperColor[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>(order.selectedPaperColors);
  const [mixColors, setMixColors] = useState(false);

  useEffect(() => {
    loadPaperColors();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadPaperColors();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('adminDataUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminDataUpdate', handleStorageChange);
    };
  }, []);

  const loadPaperColors = () => {
    const colors = DataService.getPaperColors();
    setPaperColors(colors);
  };

  const handleColorToggle = (colorId: string) => {
    let newSelectedColors;
    if (selectedColors.includes(colorId)) {
      newSelectedColors = selectedColors.filter(id => id !== colorId);
    } else {
      newSelectedColors = [...selectedColors, colorId];
    }
    
    setSelectedColors(newSelectedColors);
    
    // Add "Mix Colors" to the selection if multiple colors are selected
    const finalSelection = mixColors && newSelectedColors.length > 1 
      ? [...newSelectedColors, 'mix-colors'] 
      : newSelectedColors;
    
    setSelectedPaperColors(finalSelection);
  };

  const handleMixColorsToggle = (checked: boolean) => {
    setMixColors(checked);
    const finalSelection = checked && selectedColors.length > 1 
      ? [...selectedColors, 'mix-colors'] 
      : selectedColors;
    
    setSelectedPaperColors(finalSelection);
  };

  if (!order.box?.paperFills) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg text-primary-700">Choose Paper Fill Colors</CardTitle>
        <p className="text-sm text-gray-600">Select colors for your paper fills (multiple selection allowed)</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mb-4">
          {paperColors.map((color) => (
            <div key={color.id} className="flex flex-col items-center space-y-2">
              <div
                className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                  selectedColors.includes(color.id) 
                    ? 'border-primary-600 ring-2 ring-primary-200' 
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.colorCode }}
                onClick={() => handleColorToggle(color.id)}
              />
              <div className="flex items-center space-x-1">
                <Checkbox
                  checked={selectedColors.includes(color.id)}
                  onCheckedChange={() => handleColorToggle(color.id)}
                />
                <span className="text-xs text-center">{color.name}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedColors.length > 1 && (
          <div className="flex items-center space-x-2 pt-4 border-t">
            <Checkbox
              checked={mixColors}
              onCheckedChange={handleMixColorsToggle}
            />
            <label className="text-sm font-medium text-primary-700">
              Mix Colors (blend selected colors together)
            </label>
          </div>
        )}

        {selectedColors.length > 0 && (
          <div className="mt-4 p-3 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium text-primary-700">Selected Colors:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedColors.map((colorId) => {
                const color = paperColors.find(c => c.id === colorId);
                return color ? (
                  <span key={colorId} className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color.colorCode }}
                    />
                    {color.name}
                  </span>
                ) : null;
              })}
              {mixColors && selectedColors.length > 1 && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-100 px-2 py-1 rounded">
                  🎨 Mix Colors
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaperColorSelector;
