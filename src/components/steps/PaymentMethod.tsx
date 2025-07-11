
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, AlertTriangle } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { cn } from '@/lib/utils';

const PaymentMethod = () => {
  const {
    setPaymentMethod,
    setReceiptFile,
    setCustomerInfo,
    order,
    getTotalPrice
  } = useOrder();
  const { toast } = useToast();
  
  const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Customer info form data
  const [formData, setFormData] = useState({
    ...order.customerInfo,
    billingAddress: order.customerInfo.billingAddress || ''
  });

  // Calculate minimum delivery date (4 business days from now)
  const getMinDeliveryDate = () => {
    let date = new Date();
    let businessDays = 0;
    while (businessDays < 4) {
      date = addDays(date, 1);
      if (!isWeekend(date)) {
        businessDays++;
      }
    }
    return date;
  };
  const minDeliveryDate = getMinDeliveryDate();

  const handlePaymentChange = (value: 'cash' | 'bank') => {
    setSelectedPayment(value);
    setPaymentMethod(value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setReceiptFile(file);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    setCustomerInfo(updatedData);
  };

  // Check if billing and delivery addresses are different
  const addressesDiffer = formData.billingAddress.trim() !== formData.address.trim() && 
                         formData.billingAddress.trim() !== '' && 
                         formData.address.trim() !== '';

  const bankDetails = {
    bankName: 'National Bank',
    accountNumber: '1234567890',
    accountName: 'BEST E Gift Boxes',
    branch: 'Main Branch'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h2>
        <p className="text-gray-600">Fill in your details and choose payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
            
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
                <Label htmlFor="billingAddress">Billing Address *</Label>
                <Textarea 
                  id="billingAddress" 
                  value={formData.billingAddress} 
                  onChange={e => handleInputChange('billingAddress', e.target.value)} 
                  placeholder="Enter your billing address" 
                  rows={3} 
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
                <Label>Delivery Date *</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deliveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, "PPP") : "Select delivery date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                      mode="single" 
                      selected={deliveryDate} 
                      onSelect={date => {
                        setDeliveryDate(date);
                        setIsCalendarOpen(false);
                      }} 
                      disabled={date => {
                        return date < minDeliveryDate || isWeekend(date);
                      }} 
                      initialFocus 
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 4 business days from today (excludes weekends)
                </p>
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

        {/* Payment and Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              {order.box && (
                <div className="flex justify-between items-center mb-2">
                  <span>{order.box.name}</span>
                  <span>Rs {order.box.price.toFixed(2)}</span>
                </div>
              )}

              {order.items.map(cartItem => (
                <div key={cartItem.item.id} className="flex justify-between items-center mb-2">
                  <span>{cartItem.item.name} (x{cartItem.quantity})</span>
                  <span>Rs {(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                </div>
              ))}

              {order.greetingCard && (
                <div className="flex justify-between items-center mb-2">
                  <span>{order.greetingCard.name}</span>
                  <span>Rs {order.greetingCard.price.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">Rs {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
              
              <RadioGroup value={selectedPayment} onValueChange={handlePaymentChange}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div>
                        <h4 className="font-semibold">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                      </div>
                    </Label>
                  </div>

                  {/* Conditional warning for different addresses */}
                  {selectedPayment === 'cash' && addressesDiffer && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-red-600">
                        If the billing address and delivery address are different, it is mandatory to complete the payment first.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div>
                        <h4 className="font-semibold">Bank Transfer</h4>
                        <p className="text-sm text-gray-600">Pay via bank transfer</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {selectedPayment === 'bank' && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-3">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Bank:</strong> {bankDetails.bankName}</div>
                      <div><strong>Account Number:</strong> {bankDetails.accountNumber}</div>
                      <div><strong>Account Name:</strong> {bankDetails.accountName}</div>
                      <div><strong>Branch:</strong> {bankDetails.branch}</div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="receipt" className="block mb-2">Upload Transfer Receipt</Label>
                    <Input 
                      id="receipt" 
                      type="file" 
                      accept="image/*,.pdf" 
                      onChange={handleFileUpload} 
                      className="w-full" 
                    />
                    {uploadedFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ File uploaded: {uploadedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
