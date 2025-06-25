
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
    <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/5430729f-f06f-43cf-b98f-83a68ac00d9f.png" 
              alt="BEST E Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-wider">BEST E</h1>
              <p className="text-primary-100 text-sm">Premium Gift Box Experience</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-primary-100">Items in Cart</p>
                <p className="text-xl font-semibold">{itemCount}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-100">Total</p>
                <p className="text-xl font-semibold">Rs {getTotalPrice().toFixed(2)}</p>
              </div>
            </div>
            
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full"
              size="sm"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            
            <Navigation />
          </div>
        </div>
        
        {/* Mobile cart info */}
        <div className="sm:hidden mt-4 flex justify-between text-sm">
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
