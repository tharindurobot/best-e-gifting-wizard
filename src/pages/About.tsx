
import React from 'react';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About BEST E</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              BEST E is your premier destination for creating personalized gift boxes that make every occasion special. 
              We believe that the perfect gift tells a story, expresses love, and creates lasting memories.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded with the vision of making gift-giving more meaningful and personal, we curate the finest 
              selection of chocolates, toys, and accessories to create unique gift experiences.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Premium Gift Boxes</h3>
                <p className="text-gray-600">Carefully crafted boxes in various colors and styles</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Curated Items</h3>
                <p className="text-gray-600">Hand-selected chocolates, toys, and accessories</p>
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
