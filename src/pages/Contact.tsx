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
                    <p className="text-gray-600">info@giftstore.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">📞 Phone</h3>
                    <p className="text-gray-600">+94 712 345 678</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">📍 Address</h3>
                    <p className="text-gray-600">No. 123, Main Street, Colombo, Sri Lanka</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
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
                    <Button variant="outline" size="sm">Twitter</Button>
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