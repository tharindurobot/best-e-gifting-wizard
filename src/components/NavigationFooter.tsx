
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

  const getStepLabel = (step: OrderStep) => {
    const labels = {
      'box': 'Choose Gift Box',
      'items': 'Choose Items',
      'fills': 'Choose Fills',
      'card': 'Choose Greeting Card',
      'payment': 'Enter Customer Info',
      'info': 'Review & Confirm'
    };
    return labels[step];
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
      <div className="container mx-auto px-4 py-4">
        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-4 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                {index === currentStepIndex ? (
                  <span className="text-white font-bold text-sm sm:text-base px-2 py-1 bg-primary-800 rounded">
                    {stepLabels[index]}
                  </span>
                ) : (
                  <span className="text-primary-200 font-medium text-sm sm:text-base w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </span>
                )}
                {index < steps.length - 1 && (
                  <div className="w-4 sm:w-6 h-0.5 bg-primary-400 mx-1 sm:mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            disabled={!canGoBack}
            variant="outline"
            className="flex items-center space-x-2 min-w-[100px] sm:min-w-[120px] bg-transparent border-white text-white hover:bg-white hover:text-primary-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="text-center flex-1 mx-4">
            <p className="text-sm text-primary-100">Step {currentStepIndex + 1} of {steps.length}</p>
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-2 min-w-[100px] sm:min-w-[120px] bg-white text-primary-600 hover:bg-primary-100"
          >
            <span className="text-sm sm:text-base">{isLastStep ? 'Submit' : 'Next'}</span>
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationFooter;
