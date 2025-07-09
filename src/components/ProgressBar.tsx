
import React from 'react';
import { OrderStep } from '@/types';

interface ProgressBarProps {
  currentStep: OrderStep;
}

const ProgressBar = ({
  currentStep
}: ProgressBarProps) => {
  const steps = [{
    key: 'box',
    label: 'Select Box',
    number: 1
  }, {
    key: 'items',
    label: 'Choose Items',
    number: 2
  }, {
    key: 'fills',
    label: 'Box Fills',
    number: 3
  }, {
    key: 'card',
    label: 'Greeting Card',
    number: 4
  }, {
    key: 'payment',
    label: 'Complete Order',
    number: 5
  }];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      {/* Progress bar content can be implemented here if needed */}
    </div>
  );
};

export default ProgressBar;
