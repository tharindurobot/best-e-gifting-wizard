
import React from 'react';
import { useOrder } from '@/context/OrderContext';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import SelectBox from '@/components/steps/SelectBox';
import SelectItems from '@/components/steps/SelectItems';
import SelectBoxFills from '@/components/steps/SelectBoxFills';
import SelectGreetingCard from '@/components/steps/SelectGreetingCard';
import PaymentMethod from '@/components/steps/PaymentMethod';
import CustomerInfo from '@/components/steps/CustomerInfo';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressBar currentStep={currentStep} />
      
      <main className="container mx-auto px-4 pb-12">
        {renderStep()}
      </main>
    </div>
  );
};

export default Home;
