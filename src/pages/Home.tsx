
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
import CustomerInfo from '@/components/steps/CustomerInfo';
import NavigationFooter from '@/components/NavigationFooter';
import ScrollToTopButton from '@/components/ScrollToTopButton';

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
      
      {!migrationComplete && (
        <div className="container mx-auto px-4 py-6">
          <div className="text-center bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Initialize Database</h3>
            <p className="text-gray-600 mb-4">
              Click the button below to populate your database with sample data.
            </p>
            <Button 
              onClick={handleMigration} 
              disabled={isMigrating}
              className="min-w-32"
            >
              {isMigrating ? 'Migrating...' : 'Initialize Data'}
            </Button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 pb-24">
        {renderStep()}
      </main>

      <NavigationFooter />
      <ScrollToTopButton />
      
      {/* Copyright Caption */}
      <div className="text-center pt-4 pb-6 px-4 text-sm text-gray-600">
        © 2025 All rights reserved. Designed & developed by Tharindu Dilshan – CV MART.
      </div>
    </div>
  );
};

export default Home;
