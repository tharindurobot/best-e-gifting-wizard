
import React from 'react';
import { OrderStep } from '@/types';

interface ProgressBarProps {
  currentStep: OrderStep;
}

const steps = [
  { key: 'box', label: 'Select Box', number: 1 },
  { key: 'items', label: 'Choose Items', number: 2 },
  { key: 'card', label: 'Greeting Card', number: 3 },
  { key: 'payment', label: 'Payment', number: 4 },
  { key: 'info', label: 'Customer Info', number: 5 }
];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="w-full bg-white shadow-md py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  index <= currentStepIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}>
                  {step.number}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  index <= currentStepIndex ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-300'
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
