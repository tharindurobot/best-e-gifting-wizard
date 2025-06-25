
import React from 'react';
import { useOrder } from '@/context/OrderContext';
import Header from '@/components/Header';
import SelectBox from '@/components/steps/SelectBox';
import SelectItems from '@/components/steps/SelectItems';
import SelectBoxFills from '@/components/steps/SelectBoxFills';
import SelectGreetingCard from '@/components/steps/SelectGreetingCard';
import PaymentMethod from '@/components/steps/PaymentMethod';
import CustomerInfo from '@/components/steps/CustomerInfo';
import NavigationFooter from '@/components/NavigationFooter';

const Home = () => {
  const { currentStep } = useOrder();

  const renderStep = () => {
    switch (currentStep) {
      case 'box':
        return <SelectBox />;
      case 'items':
        return <SelectItems />;
      case 'fills':
        return <SelectBoxFills />;
      case 'card':
        return <SelectGreetingCard />;
      case 'payment':
        return <PaymentMethod />;
      case 'info':
        return <CustomerInfo />;
      default:
        return <SelectBox />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              {renderStep()}
            </div>
          </div>
        </div>
      </main>

      <NavigationFooter />
    </div>
  );
};

export default Home;
