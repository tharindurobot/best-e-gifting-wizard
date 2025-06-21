
import React from 'react';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are a curated gift store offering beautiful items for every occasion – from stationery to perfumes, 
              chocolates to baby care. Our mission is to make gifting more thoughtful and personalized.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded with the vision of making gift-giving more meaningful and personal, we curate the finest 
              selection of items across multiple categories to create unique gift experiences for every special moment.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Premium Gift Boxes</h3>
                <p className="text-gray-600">Carefully crafted boxes with free paper fills option</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Curated Categories</h3>
                <p className="text-gray-600">Stationary, perfumes, cosmetics, accessories, and more</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Personal Touch</h3>
                <p className="text-gray-600">Custom greeting cards to complete your gift</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To make every gift-giving moment extraordinary by providing high-quality, personalized gift boxes 
              that bring joy to both the giver and receiver. We're committed to excellent service, premium products, 
              and creating memorable experiences that last a lifetime.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
