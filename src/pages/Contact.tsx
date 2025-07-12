import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 px-0 rounded-none">
            

            <div className="space-y-6">
              <Card>
                <CardHeader className="px-[20px] bg-gray-200">
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary-700">📧 Email</h3>
                    <p className="text-gray-600">salesbeste9@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">📞 Phone</h3>
                    <p className="text-gray-600">0772291871</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">📍 Address</h3>
                    <p className="text-gray-600">26/2, ihagama medawala harispatthuwa</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">Business Hours : 24/7 open</h3>
                    
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">Instagram</Button>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Contact;