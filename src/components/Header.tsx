
import React from 'react';
import { useOrder } from '@/context/OrderContext';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  const { getTotalPrice, order } = useOrder();
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/94712345678', '_blank');
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white shadow-xl sticky top-0 z-40 border-b border-primary-500">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
            <div className="relative">
              <img 
                src="/lovable-uploads/5430729f-f06f-43cf-b98f-83a68ac00d9f.png" 
                alt="BEST E Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-lg border-2 border-primary-400"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">BEST E</h1>
              <p className="text-primary-100 text-xs font-medium">Premium Gift Experience</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-6">
              <div className="text-right bg-primary-800/30 px-3 py-2 rounded-lg border border-primary-500">
                <p className="text-xs text-primary-100 font-medium">Items</p>
                <p className="text-lg font-bold">{itemCount}</p>
              </div>
              <div className="text-right bg-primary-800/30 px-3 py-2 rounded-lg border border-primary-500">
                <p className="text-xs text-primary-100 font-medium">Total</p>
                <p className="text-lg font-bold">Rs {getTotalPrice().toFixed(2)}</p>
              </div>
            </div>
            
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              size="sm"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            
            <Navigation />
          </div>
        </div>
        
        {/* Mobile cart info */}
        <div className="sm:hidden mt-3 flex justify-between text-sm bg-primary-800/30 px-3 py-2 rounded-lg border border-primary-500">
          <div>
            <span className="text-primary-100">Items: </span>
            <span className="font-semibold">{itemCount}</span>
          </div>
          <div>
            <span className="text-primary-100">Total: </span>
            <span className="font-semibold">Rs {getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
