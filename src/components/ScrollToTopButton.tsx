
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentStep } = useOrder();

  // Only show button in steps 1-4 (box, items, fills, card)
  const showInSteps = ['box', 'items', 'fills', 'card'];
  const shouldShow = showInSteps.includes(currentStep);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!shouldShow || !isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-40 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      style={{ backgroundColor: '#94580f' }}
      size="sm"
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </Button>
  );
};

export default ScrollToTopButton;
