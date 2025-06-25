
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/context/OrderContext';
import { OrderStep } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationFooter = () => {
  const { currentStep, setCurrentStep } = useOrder();

  const steps: OrderStep[] = ['box', 'items', 'fills', 'card', 'payment', 'info'];
  const currentStepIndex = steps.indexOf(currentStep);

  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < steps.length - 1;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep(steps[currentStepIndex + 1]);
    } else if (isLastStep) {
      // Handle submit order logic here
      console.log('Submit order');
    }
  };

  const stepLabels = [
    'Choose Gift Box',
    'Choose Items', 
    'Choose Fills',
    'Choose Greeting Card',
    'Enter Customer Info',
    'Review & Confirm'
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-2.5">
        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-2.5 overflow-x-auto">
          <div className="flex items-center space-x-1 text-sm">
            {steps.map((step, index) => (
              <span key={step} className="flex items-center">
                {index === currentStepIndex ? (
                  <span className="font-bold text-white px-1 py-0.5 bg-primary-800 rounded border-2 border-white">
                    [{index + 1}]
                  </span>
                ) : (
                  <span className="text-primary-200 font-medium">
                    {index + 1}
                  </span>
                )}
                {index < steps.length - 1 && (
                  <span className="text-primary-200 mx-1">-</span>
                )}
              </span>
            ))}
            <span className="text-primary-100 ml-3">
              – {stepLabels[currentStepIndex]}
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            disabled={!canGoBack}
            variant="outline"
            className="flex items-center space-x-1 min-w-[80px] sm:min-w-[100px] bg-transparent border-white text-white hover:bg-white hover:text-primary-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white text-sm py-1.5"
          >
            <ChevronLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="text-center flex-1 mx-3">
            <p className="text-xs text-primary-100">Step {currentStepIndex + 1} of {steps.length}</p>
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-1 min-w-[80px] sm:min-w-[100px] bg-white text-primary-600 hover:bg-primary-100 text-sm py-1.5"
          >
            <span>{isLastStep ? 'Submit' : 'Next'}</span>
            {!isLastStep && <ChevronRight className="w-3 h-3" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationFooter;
