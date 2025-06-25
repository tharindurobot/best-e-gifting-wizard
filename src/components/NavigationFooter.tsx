
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
    'Payment Method',
    'Customer Info'
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-2xl z-50 border-t border-primary-500">
      <div className="container mx-auto px-4 py-3">
        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-3 overflow-x-auto">
          <div className="flex items-center space-x-2 text-sm">
            {steps.map((step, index) => (
              <span key={step} className="flex items-center">
                {index === currentStepIndex ? (
                  <span className="font-bold text-white px-2 py-1 bg-primary-800 rounded-lg shadow-lg border border-primary-400">
                    {index + 1}
                  </span>
                ) : (
                  <span className="text-primary-100 font-medium px-2 py-1 hover:text-white transition-colors">
                    {index + 1}
                  </span>
                )}
                {index < steps.length - 1 && (
                  <span className="text-primary-300 mx-1">•</span>
                )}
              </span>
            ))}
            <span className="text-primary-50 ml-4 font-medium">
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
            className="flex items-center space-x-2 min-w-[100px] bg-transparent border-primary-400 text-white hover:bg-primary-500 hover:border-primary-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white text-sm py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <div className="text-center flex-1 mx-4">
            <p className="text-xs text-primary-100 font-medium">Step {currentStepIndex + 1} of {steps.length}</p>
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-2 min-w-[100px] bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 text-sm py-2 px-4 rounded-lg shadow-lg font-semibold transition-all duration-200"
          >
            <span>{isLastStep ? 'Submit Order' : 'Next'}</span>
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationFooter;
