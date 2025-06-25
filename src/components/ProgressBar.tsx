
import React from 'react';
import { OrderStep } from '@/types';

interface ProgressBarProps {
  currentStep: OrderStep;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const steps = [
    { key: 'box', label: 'Select Box', number: 1 },
    { key: 'items', label: 'Choose Items', number: 2 },
    { key: 'fills', label: 'Box Fills', number: 3 },
    { key: 'card', label: 'Greeting Card', number: 4 },
    { key: 'payment', label: 'Payment', number: 5 },
    { key: 'info', label: 'Your Info', number: 6 }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="bg-white shadow-sm border-b sticky top-[140px] z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center space-x-2 ${
                index <= currentStepIndex ? 'text-primary-600' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStepIndex 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <span className="text-sm font-medium hidden sm:block">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-2 ${
                  index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
