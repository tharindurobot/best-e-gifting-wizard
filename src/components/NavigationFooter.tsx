
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/context/OrderContext';
import { OrderStep } from '@/types';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const NavigationFooter = () => {
  const {
    currentStep,
    setCurrentStep,
    order,
    getTotalPrice
  } = useOrder();

  // Swap payment and info steps
  const steps: OrderStep[] = ['box', 'items', 'fills', 'card', 'info', 'payment'];
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
      // Handle submit order logic for the last step
      if ((window as any).submitOrder) {
        (window as any).submitOrder();
      }
    }
  };

  const handleWhatsAppOrder = () => {
    // Call the WhatsApp function from PaymentMethod component
    if ((window as any).handleWhatsAppOrder) {
      (window as any).handleWhatsAppOrder();
    }
  };

  const getStepLabel = (step: OrderStep) => {
    const labels = {
      'box': 'Choose Gift Box',
      'items': 'Choose Items',
      'fills': 'Choose Fills',
      'card': 'Choose Greeting Card',
      'info': 'Customer Info',
      'payment': 'Payment Method'
    };
    return labels[step];
  };

  const isSubmitting = (window as any).isSubmitting || false;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-[7px]">
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleBack} 
            disabled={!canGoBack} 
            variant="outline" 
            className="flex items-center space-x-2 min-w-[120px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <div className="text-center flex-1 mx-4">
            <p className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</p>
            <p className="font-semibold text-primary-600">{getStepLabel(currentStep)}</p>
          </div>

          {isLastStep ? (
            <div className="flex gap-2">
              {/* WhatsApp button moved to PaymentMethod component */}
            </div>
          ) : (
            <Button 
              onClick={handleNext} 
              className="flex items-center space-x-2 min-w-[120px] bg-primary-600 hover:bg-primary-700"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationFooter;
