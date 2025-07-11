
import React, { useState } from 'react';
import { useOrder } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { migrateDataToSupabase } from '@/utils/migrateData';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import SelectBox from '@/components/steps/SelectBox';
import SelectItems from '@/components/steps/SelectItems';
import SelectBoxFills from '@/components/steps/SelectBoxFills';
import SelectGreetingCard from '@/components/steps/SelectGreetingCard';
import PaymentMethod from '@/components/steps/PaymentMethod';
import NavigationFooter from '@/components/NavigationFooter';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

const Home = () => {
  const { currentStep } = useOrder();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);

  const handleMigration = async () => {
    setIsMigrating(true);
    await migrateDataToSupabase();
    setIsMigrating(false);
    setMigrationComplete(true);
  };

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
      default:
        return <SelectBox />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressBar currentStep={currentStep} />
      
      {!migrationComplete && (
        <div className="container mx-auto px-4 py-6">
          {/* Migration content if needed */}
        </div>
      )}
      
      <main className="container mx-auto px-4 pb-24">
        {renderStep()}
      </main>

      <NavigationFooter />
      <ScrollToTopButton />
      <FloatingWhatsAppButton />
      
      {/* Copyright Caption */}
      <div className="text-center pt-4 pb-6 px-4 text-sm text-gray-600">
        © 2025 All rights reserved. Designed & developed by Tharindu Dilshan – CV MART.
      </div>
    </div>
  );
};

export default Home;
