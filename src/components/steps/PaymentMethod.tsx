import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOrder } from '@/context/OrderContext';
const PaymentMethod = () => {
  const {
    setPaymentMethod,
    setReceiptFile,
    setCurrentStep,
    order,
    getTotalPrice
  } = useOrder();
  const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
  const handleNext = () => {
    if (selectedPayment === 'bank' && !uploadedFile) {
      alert('Please upload your bank transfer receipt');
      return;
    }
    setCurrentStep('info');
  };
  const handleBack = () => {
    setCurrentStep('card');
  };
  const bankDetails = {
    bankName: 'National Bank',
    accountNumber: '1234567890',
    accountName: 'BEST E Gift Boxes',
    branch: 'Main Branch'
  };
  return <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
        <p className="text-gray-600">Select how you'd like to pay for your gift box</p>
      </div>

      {/* Order Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          
          {order.box && <div className="flex justify-between items-center mb-2">
              <span>{order.box.name}</span>
              <span>${order.box.price.toFixed(2)}</span>
            </div>}

          {order.items.map(cartItem => <div key={cartItem.item.id} className="flex justify-between items-center mb-2">
              <span>{cartItem.item.name} (x{cartItem.quantity})</span>
              <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
            </div>)}

          {order.greetingCard && <div className="flex justify-between items-center mb-2">
              <span>{order.greetingCard.name}</span>
              <span>${order.greetingCard.price.toFixed(2)}</span>
            </div>}

          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span className="text-primary-600">${getTotalPrice().toFixed(2)}</span>
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

              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  <div>
                    <h4 className="font-semibold">Bank Transfer</h4>
                    <p className="text-sm text-gray-600">Transfer to our bank account</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          {selectedPayment === 'bank' && <div className="mt-6 space-y-4 animate-fade-in">
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
                <Input id="receipt" type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="w-full" />
                {uploadedFile && <p className="text-sm text-green-600 mt-2">
                    ✓ File uploaded: {uploadedFile.name}
                  </p>}
              </div>
            </div>}
        </CardContent>
      </Card>

      
    </div>;
};
export default PaymentMethod;