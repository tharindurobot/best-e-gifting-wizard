
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';

const CustomerInfo = () => {
  const { setCustomerInfo, order, getTotalPrice, resetOrder, setCurrentStep } = useOrder();
  const { toast } = useToast();
  const [formData, setFormData] = useState(order.customerInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setCustomerInfo(updatedData);
  };

  const validateForm = () => {
    const required = ['fullName', 'address', 'email', 'phone'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const generateOrderEmail = () => {
    const itemsList = order.items.map(item => 
      `- ${item.item.name} (x${item.quantity}) - $${(item.item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    return `
New Order from BEST E Gift Boxes

CUSTOMER INFORMATION:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}

ORDER DETAILS:
- Gift Box: ${order.box?.name} (${order.box?.color}) - $${order.box?.price.toFixed(2)}

SELECTED ITEMS:
${itemsList}

- Greeting Card: ${order.greetingCard?.name} - $${order.greetingCard?.price.toFixed(2)}

PAYMENT METHOD: ${order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
${order.receiptFile ? `Receipt File: ${order.receiptFile.name}` : ''}

TOTAL AMOUNT: $${getTotalPrice().toFixed(2)}

Order placed on: ${new Date().toLocaleString()}
    `.trim();
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate email sending
      const emailContent = generateOrderEmail();
      console.log('Order Email Content:', emailContent);
      console.log('Sending to: tharindurobot@gmail.com');

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been sent and will be processed soon.",
      });

      // Reset order after successful submission
      setTimeout(() => {
        resetOrder();
      }, 3000);

    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep('payment');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Information</h2>
        <p className="text-gray-600">Complete your order with your delivery details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your complete delivery address"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Final Order Summary</h3>
            
            <div className="space-y-3">
              {order.box && (
                <div className="flex justify-between">
                  <span>{order.box.name}</span>
                  <span>${order.box.price.toFixed(2)}</span>
                </div>
              )}

              {order.items.map((cartItem) => (
                <div key={cartItem.item.id} className="flex justify-between text-sm">
                  <span>{cartItem.item.name} (x{cartItem.quantity})</span>
                  <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                </div>
              ))}

              {order.greetingCard && (
                <div className="flex justify-between">
                  <span>{order.greetingCard.name}</span>
                  <span>${order.greetingCard.price.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary-600">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded mt-4">
                <p className="text-sm font-medium">Payment Method:</p>
                <p className="text-sm">{order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                {order.receiptFile && (
                  <p className="text-sm text-green-600 mt-1">Receipt uploaded: {order.receiptFile.name}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          Back: Payment Method
        </Button>
        <Button 
          onClick={handleSubmitOrder} 
          disabled={!validateForm() || isSubmitting}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order Now'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerInfo;
