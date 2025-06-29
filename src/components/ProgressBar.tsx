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
    label: 'Payment',
    number: 5
  }, {
    key: 'info',
    label: 'Your Info',
    number: 6
  }];
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  return;
};
export default ProgressBar;