
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { SupabaseDataService } from '@/services/supabaseDataService';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prepareOrderData = () => {
    const itemsList = order.items.map(item => 
      `${item.item.name} - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`
    ).join('\n');

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
      `${item.item.name} - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`
    ).join('\n') + 
    (order.box ? `\n${order.box.name} (${order.box.color}) - Rs ${order.box.price.toFixed(2)}` : '') +
    (order.greetingCard ? `\n${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}` : '') +
    `\n\nTotal Amount: Rs ${getTotalPrice().toFixed(2)}`;

    return {
      from_name: order.customerInfo.fullName,
      from_email: order.customerInfo.email,
      phone: order.customerInfo.phone,
      address: order.customerInfo.address,
      billing_address: order.customerInfo.billingAddress,
      comment: order.customerInfo.comment || 'No additional comments',
      greeting_card: order.greetingCard ? `${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}` : 'No greeting card selected',
      paper_fill_color: `Box Fills: ${fillInfo}`,
      cart_items: cartItemsWithTotal,
      attachment: order.receiptFile ? `Receipt uploaded: ${order.receiptFile.name}` : 'No receipt uploaded'
    };
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Upload bank slip if provided
      let bankSlipUrl = null;
      if (order.receiptFile) {
        bankSlipUrl = await SupabaseDataService.uploadBankSlip(order.receiptFile);
        if (!bankSlipUrl) {
          throw new Error('Failed to upload bank slip');
        }
      }

      // Save order to database
      const orderData = {
        customerName: order.customerInfo.fullName,
        customerEmail: order.customerInfo.email,
        customerPhone: order.customerInfo.phone,
        billingAddress: order.customerInfo.billingAddress,
        deliveryAddress: order.customerInfo.address,
        deliveryDate: '',
        comment: order.customerInfo.comment,
        selectedBox: order.box,
        selectedItems: order.items,
        greetingCard: order.greetingCard,
        totalAmount: getTotalPrice(),
        paymentMethod: order.paymentMethod,
        bankSlipUrl: bankSlipUrl
      };

      const savedOrder = await SupabaseDataService.saveOrder(orderData);
      if (!savedOrder) {
        throw new Error('Failed to save order to database');
      }

      console.log('Order saved to database:', savedOrder);

      // Send email using EmailJS as backup
      const emailData = prepareOrderData();
      console.log('Sending order data via email:', emailData);
      
      const result = await emailjs.send(
        'service_lbcjmx8',
        'template_whj0geq',
        emailData,
        'sTY75PlHXv2X4CpeY'
      );

      console.log('Email sent successfully:', result);

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been saved and sent to our shop. You will receive a confirmation email shortly."
      });

      // Reset order after successful submission
      setTimeout(() => {
        resetOrder();
      }, 3000);

    } catch (error) {
      console.error('Order submission failed:', error);
      
      const errorMessage = error && typeof error === 'object' && 'text' in error 
        ? error.text 
        : error instanceof Error ? error.message : "There was an error placing your order. Please try again.";
      
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
    (window as any).submitOrder = handleSubmitOrder;
    (window as any).isSubmitting = isSubmitting;
    return () => {
      delete (window as any).submitOrder;
      delete (window as any).isSubmitting;
    };
  }, [handleSubmitOrder, isSubmitting]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h2>
        <p className="text-gray-600">Review your order details</p>
      </div>

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
                <span>{cartItem.item.name} (x{cartItem.quantity})</span>
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
                    return fill ? (
                      <span key={fillId} className="text-xs bg-green-100 px-2 py-1 rounded">
                        {fill.name}
                      </span>
                    ) : null;
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
              <p className="text-sm font-medium">Customer Details:</p>
              <p className="text-sm">{order.customerInfo.fullName}</p>
              <p className="text-sm">{order.customerInfo.email}</p>
              <p className="text-sm">{order.customerInfo.phone}</p>
              <p className="text-sm">{order.customerInfo.address}</p>
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
  );
};

export default CustomerInfo;
