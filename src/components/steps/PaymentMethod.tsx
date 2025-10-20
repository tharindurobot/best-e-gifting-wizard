import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { SupabaseDataService } from '@/services/supabaseDataService';
import { MessageSquare, CalendarIcon, AlertTriangle } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

const PaymentMethod = () => {
  const {
    setPaymentMethod,
    setReceiptFile,
    setCurrentStep,
    setCustomerInfo,
    order,
    getTotalPrice,
    resetOrder
  } = useOrder();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Customer info form data
  const [formData, setFormData] = useState({
    ...order.customerInfo,
    billingAddress: order.customerInfo.billingAddress || ''
  });

  // Check if billing and delivery addresses are different
  const addressesDifferent = formData.billingAddress.trim() !== '' && 
                            formData.address.trim() !== '' && 
                            formData.billingAddress.trim().toLowerCase() !== formData.address.trim().toLowerCase();

  // Calculate minimum delivery date (4 days from now, including weekends)
  const minDeliveryDate = addDays(new Date(), 4);

  // Auto-select bank transfer when addresses are different
  useEffect(() => {
    if (addressesDifferent && selectedPayment !== 'bank') {
      setSelectedPayment('bank');
      setPaymentMethod('bank');
    }
  }, [addressesDifferent, selectedPayment, setPaymentMethod]);

  const handlePaymentChange = (value: 'cash' | 'bank') => {
    // Prevent changing to cash if addresses are different
    if (addressesDifferent && value === 'cash') {
      toast({
        title: "Payment Method Restricted",
        description: "Bank transfer is required when billing and delivery addresses are different.",
        variant: "destructive"
      });
      return;
    }
    setSelectedPayment(value);
    setPaymentMethod(value);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    setCustomerInfo(updatedData);
  };

  const validateForm = () => {
    const required = ['fullName', 'billingAddress', 'address', 'email', 'phone'];
    const formValid = required.every(field => formData[field as keyof typeof formData].trim() !== '');
    const paymentValid = selectedPayment === 'cash' || selectedPayment === 'bank';
    return formValid && deliveryDate && paymentValid;
  };

  const prepareWhatsAppMessage = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including delivery date and payment method",
        variant: "destructive"
      });
      return null;
    }

    // Prepare order items list
    const itemsList = order.items.map(item => `• ${item.item.name} - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`).join('\n');

    // Get box fills by name from Supabase
    let fillInfo = 'No box fills selected';
    if (order.selectedBoxFills.length > 0) {
      try {
        const boxFills = await SupabaseDataService.getBoxFills();
        const selectedFillNames = order.selectedBoxFills.map(fillId => {
          const fill = boxFills.find(f => f.id === fillId);
          return fill ? fill.name : fillId;
        }).filter(name => name);
        fillInfo = selectedFillNames.length > 0 ? selectedFillNames.join(', ') : 'No box fills selected';
      } catch (error) {
        console.error('Error fetching box fills:', error);
        fillInfo = 'Error loading box fills';
      }
    }

    // Create WhatsApp message
    let message = `🎁 *NEW ORDER REQUEST*\n\n`;

    // Customer Information
    message += `👤 *CUSTOMER DETAILS:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Billing Address: ${formData.billingAddress}\n`;
    message += `Delivery Address: ${formData.address}\n`;
    message += `Delivery Date: ${deliveryDate ? format(deliveryDate, 'PPP') : 'Not specified'}\n`;
    if (formData.comment) {
      message += `Additional Comments: ${formData.comment}\n`;
    }
    message += `\n`;

    // Order Details
    message += `📦 *ORDER SUMMARY:*\n`;
    if (order.box) {
      message += `Gift Box: ${order.box.name} (${order.box.color}) - Rs ${order.box.price.toFixed(2)}\n`;
    }
    message += `\n*Items:*\n${itemsList}\n`;
    if (order.greetingCard) {
      message += `\n💌 Greeting Card: ${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}\n`;
    }
    message += `\n🎨 Box Fills: ${fillInfo}\n`;

    // Payment Information
    message += `\n💳 *PAYMENT DETAILS:*\n`;
    message += `Payment Method: ${order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}\n`;
    message += `*Total Amount: Rs ${getTotalPrice().toFixed(2)}*\n`;
    message += `\n📅 Order Date: ${new Date().toLocaleString()}\n`;
    message += `\n✅ Please confirm this order. Thank you!`;
    return encodeURIComponent(message);
  };

  const openWhatsApp = (message: string) => {
    const whatsappNumber = "94772291871";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Detect if we're on iOS/Safari or mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // For iOS devices, use location.href instead of window.open
    if (isIOS || isSafari && isMobile) {
      window.location.href = whatsappUrl;
    } else {
      // For other browsers/devices, try window.open first
      const whatsappWindow = window.open(whatsappUrl, '_blank');

      // Fallback: if window.open fails (blocked by popup blocker), use location.href
      setTimeout(() => {
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
          window.location.href = whatsappUrl;
        }
      }, 100);
    }
  };

  const handleWhatsAppOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including delivery date and payment method",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Save order to database first
      const orderData = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        billingAddress: formData.billingAddress,
        deliveryAddress: formData.address,
        deliveryDate: deliveryDate ? format(deliveryDate, 'yyyy-MM-dd') : '',
        comment: formData.comment,
        selectedBox: order.box,
        selectedItems: order.items,
        greetingCard: order.greetingCard,
        totalAmount: getTotalPrice(),
        paymentMethod: order.paymentMethod,
        bankSlipUrl: null
      };
      const savedOrder = await SupabaseDataService.saveOrder(orderData);
      if (!savedOrder) {
        throw new Error('Failed to save order to database');
      }
      console.log('Order saved to database:', savedOrder);

      // Then send WhatsApp message
      const message = await prepareWhatsAppMessage();
      if (message) {
        openWhatsApp(message);
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been saved and WhatsApp opened for confirmation."
        });

        // Reset order after successful submission
        setTimeout(() => {
          resetOrder();
        }, 3000);
      }
    } catch (error) {
      console.error('WhatsApp order submission failed:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error placing your order. Please try again.";
      toast({
        title: "Order Failed",
        description: `Error: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Make functions available to parent components
  useEffect(() => {
    (window as any).handleWhatsAppOrder = handleWhatsAppOrder;
    (window as any).isSubmitting = isSubmitting;
    return () => {
      delete (window as any).handleWhatsAppOrder;
      delete (window as any).isSubmitting;
    };
  }, [handleWhatsAppOrder, isSubmitting]);

  const bankDetails = {
    bankName: 'DFCC Bank',
    accountNumber: '101001134907',
    accountName: 'Nuwara Products Pvt Ltd',
    branch: 'Deniyaya Branch'
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
                      onSelect={(date) => {
                        setDeliveryDate(date);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) => {
                        return date < minDeliveryDate;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 4 days from today (includes weekends)
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

              {order.items.map((cartItem) => (
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
                  <div className={cn(
                    "flex items-center space-x-2 p-4 border rounded-lg",
                    addressesDifferent && "opacity-50"
                  )}>
                    <RadioGroupItem 
                      value="cash" 
                      id="cash" 
                      disabled={addressesDifferent}
                    />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div>
                        <h4 className="font-semibold">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">
                          {addressesDifferent 
                            ? "Not available when addresses differ" 
                            : "Pay when your order arrives"
                          }
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div>
                        <h4 className="font-semibold">Bank Transfer</h4>
                        <p className="text-sm text-gray-600">Transfer money to our bank account</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Address Difference Notice - Moved here */}
              {addressesDifferent && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mt-4">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-red-800">
                    <p className="font-medium">Payment Required</p>
                    <p className="text-sm mt-1">
                      If the billing address and delivery address are different, it is mandatory to complete the payment first.
                    </p>
                  </div>
                </div>
              )}

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

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>📱 Send Payment Slip via WhatsApp</strong><br />
                      After making the bank transfer, please send the payment slip to our WhatsApp number for verification.
                    </p>
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
