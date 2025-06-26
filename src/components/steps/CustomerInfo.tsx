
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { DataService } from '@/services/dataService';
import emailjs from '@emailjs/browser';

const CustomerInfo = () => {
  const {
    setCustomerInfo,
    order,
    getTotalPrice,
    resetOrder,
    setCurrentStep
  } = useOrder();
  const { toast } = useToast();
  const [formData, setFormData] = useState(order.customerInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    setCustomerInfo(updatedData);
  };

  const validateForm = () => {
    const required = ['fullName', 'address', 'email', 'phone'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const prepareOrderData = () => {
    const itemsList = order.items.map(item => 
      `${item.item.name} (Code: ${item.item.itemCode || 'N/A'}) - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const paperColors = DataService.getPaperColors();
    const selectedColorNames = order.selectedPaperColors
      .filter(colorId => colorId !== 'mix-colors')
      .map(colorId => {
        const color = paperColors.find(c => c.id === colorId);
        return color ? color.name : colorId;
      });
    
    const colorInfo = selectedColorNames.length > 0 
      ? `${selectedColorNames.join(', ')}${order.selectedPaperColors.includes('mix-colors') ? ' (Mix Colors)' : ''}`
      : 'No paper colors selected';

    const boxFills = DataService.getBoxFills();
    const selectedFillNames = order.selectedBoxFills.map(fillId => {
      const fill = boxFills.find(f => f.id === fillId);
      return fill ? fill.name : fillId;
    });
    const fillInfo = selectedFillNames.length > 0 
      ? selectedFillNames.join(', ') 
      : 'No box fills selected';

    // Format cart items with total
    const cartItemsWithTotal = order.items.map(item => 
      `${item.item.name} (Code: ${item.item.itemCode || 'N/A'}) - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`
    ).join('\n') + 
    (order.box ? `\n${order.box.name} (${order.box.color}) - Rs ${order.box.price.toFixed(2)}` : '') +
    (order.greetingCard ? `\n${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}` : '') +
    `\n\nTotal Amount: Rs ${getTotalPrice().toFixed(2)}`;

    return {
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      comment: formData.comment || 'No additional comments',
      delivery_date: deliveryDate || 'Not specified',
      greeting_card: order.greetingCard ? `${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}` : 'No greeting card selected',
      paper_fill_color: `Paper Colors: ${colorInfo}\nBox Fills: ${fillInfo}`,
      cart_items: cartItemsWithTotal,
      attachment: order.receiptFile ? `Receipt uploaded: ${order.receiptFile.name}` : 'No receipt uploaded'
    };
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
      const orderData = prepareOrderData();
      
      console.log('Sending order data:', orderData);
      
      // Send email using EmailJS with new template
      const result = await emailjs.send(
        'service_lbcjmx8',
        'template_whj0geq',
        orderData,
        'sTY75PlHXv2X4CpeY'
      );

      console.log('Email sent successfully:', result);

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been sent to our shop and will be processed soon."
      });

      // Reset order after successful submission
      setTimeout(() => {
        resetOrder();
      }, 3000);

    } catch (error) {
      console.error('Email send failed:', error);
      
      // Show more specific error message
      const errorMessage = error && typeof error === 'object' && 'text' in error 
        ? error.text 
        : "There was an error placing your order. Please try again.";
      
      toast({
        title: "Order Failed",
        description: `Error: ${errorMessage}`,
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
                  onChange={e => handleInputChange('fullName', e.target.value)} 
                  placeholder="Enter your full name" 
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={e => handleInputChange('email', e.target.value)} 
                  placeholder="Enter your email" 
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={e => handleInputChange('phone', e.target.value)} 
                  placeholder="Enter your phone number" 
                />
              </div>

              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea 
                  id="address" 
                  value={formData.address} 
                  onChange={e => handleInputChange('address', e.target.value)} 
                  placeholder="Enter your complete delivery address" 
                  rows={4} 
                />
              </div>

              <div>
                <Label htmlFor="deliveryDate">Preferred Delivery Date (Optional)</Label>
                <Input 
                  id="deliveryDate" 
                  type="date"
                  value={deliveryDate} 
                  onChange={e => setDeliveryDate(e.target.value)} 
                />
              </div>

              <div>
                <Label htmlFor="comment">Additional Comments (Optional)</Label>
                <Textarea 
                  id="comment" 
                  value={formData.comment || ''} 
                  onChange={e => handleInputChange('comment', e.target.value)} 
                  placeholder="Any special instructions or comments for your order" 
                  rows={3} 
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
                  <span>Rs {order.box.price.toFixed(2)}</span>
                </div>
              )}

              {order.items.map(cartItem => (
                <div key={cartItem.item.id} className="flex justify-between text-sm">
                  <span>{cartItem.item.name} ({cartItem.item.itemCode}) (x{cartItem.quantity})</span>
                  <span>Rs {(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                </div>
              ))}

              {order.greetingCard && (
                <div className="flex justify-between">
                  <span>{order.greetingCard.name}</span>
                  <span>Rs {order.greetingCard.price.toFixed(2)}</span>
                </div>
              )}

              {order.selectedBoxFills.length > 0 && (
                <div className="bg-green-50 p-3 rounded mt-4">
                  <p className="text-sm font-medium text-green-700">Selected Box Fills (FREE):</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {order.selectedBoxFills.map(fillId => {
                      const boxFills = DataService.getBoxFills();
                      const fill = boxFills.find(f => f.id === fillId);
                      return fill ? <span key={fillId} className="text-xs bg-green-100 px-2 py-1 rounded">
                          {fill.name}
                        </span> : null;
                    })}
                  </div>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary-600">Rs {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded mt-4">
                <p className="text-sm font-medium">Payment Method:</p>
                <p className="text-sm">{order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                {order.receiptFile && <p className="text-sm text-green-600 mt-1">Receipt uploaded: {order.receiptFile.name}</p>}
              </div>

              {order.selectedPaperColors.length > 0 && (
                <div className="bg-primary-50 p-3 rounded mt-4">
                  <p className="text-sm font-medium text-primary-700">Paper Colors:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {order.selectedPaperColors.filter(colorId => colorId !== 'mix-colors').map(colorId => {
                      const paperColors = DataService.getPaperColors();
                      const color = paperColors.find(c => c.id === colorId);
                      return color ? <span key={colorId} className="text-xs bg-white px-2 py-1 rounded">
                            {color.name}
                          </span> : null;
                    })}
                    {order.selectedPaperColors.includes('mix-colors') && <span className="text-xs bg-primary-100 px-2 py-1 rounded">Mix Colors</span>}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          Back to Payment
        </Button>
        <Button 
          onClick={handleSubmitOrder} 
          disabled={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700"
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerInfo;
