
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { SupabaseDataService } from '@/services/supabaseDataService';

const FloatingWhatsAppButton = () => {
  const { order, getTotalPrice, resetOrder } = useOrder();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const required = ['fullName', 'billingAddress', 'address', 'email', 'phone'];
    const formValid = required.every(field => order.customerInfo[field as keyof typeof order.customerInfo].trim() !== '');
    const paymentValid = order.paymentMethod === 'cash' || (order.paymentMethod === 'bank' && order.receiptFile);
    return formValid && paymentValid;
  };

  const prepareWhatsAppMessage = async () => {
    if (!validateForm()) {
      return null;
    }

    const itemsList = order.items.map(item => `• ${item.item.name} - Qty: ${item.quantity} - Rs ${(item.item.price * item.quantity).toFixed(2)}`).join('\n');

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

    let message = `🎁 *NEW ORDER REQUEST*\n\n`;
    message += `👤 *CUSTOMER DETAILS:*\n`;
    message += `Name: ${order.customerInfo.fullName}\n`;
    message += `Email: ${order.customerInfo.email}\n`;
    message += `Phone: ${order.customerInfo.phone}\n`;
    message += `Billing Address: ${order.customerInfo.billingAddress}\n`;
    message += `Delivery Address: ${order.customerInfo.address}\n`;
    if (order.customerInfo.comment) {
      message += `Additional Comments: ${order.customerInfo.comment}\n`;
    }
    message += `\n`;

    message += `📦 *ORDER SUMMARY:*\n`;
    if (order.box) {
      message += `Gift Box: ${order.box.name} (${order.box.color}) - Rs ${order.box.price.toFixed(2)}\n`;
    }
    message += `\n*Items:*\n${itemsList}\n`;
    if (order.greetingCard) {
      message += `\n💌 Greeting Card: ${order.greetingCard.name} - Rs ${order.greetingCard.price.toFixed(2)}\n`;
    }
    message += `\n🎨 Box Fills: ${fillInfo}\n`;

    message += `\n💳 *PAYMENT DETAILS:*\n`;
    message += `Payment Method: ${order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}\n`;
    if (order.receiptFile) {
      message += `Bank Slip: Uploaded (${order.receiptFile.name})\n`;
    }
    message += `*Total Amount: Rs ${getTotalPrice().toFixed(2)}*\n`;
    message += `\n📅 Order Date: ${new Date().toLocaleString()}\n`;
    message += `\n✅ Please confirm this order. Thank you!`;
    return encodeURIComponent(message);
  };

  const openWhatsApp = (message: string) => {
    const whatsappNumber = "94772056148";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    console.log('Opening WhatsApp with URL:', whatsappUrl);
    
    // Force direct navigation for all cases
    window.location.href = whatsappUrl;
  };

  const handleWhatsAppOrder = async () => {
    console.log('WhatsApp button clicked');
    console.log('Order items:', order.items);
    console.log('Form validation:', validateForm());
    
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including payment method",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let bankSlipUrl = null;
      if (order.receiptFile) {
        bankSlipUrl = await SupabaseDataService.uploadBankSlip(order.receiptFile);
        if (!bankSlipUrl) {
          throw new Error('Failed to upload bank slip');
        }
      }

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

      const message = await prepareWhatsAppMessage();
      if (message) {
        openWhatsApp(message);
        
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been saved and WhatsApp opened for confirmation."
        });

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

  // Always show the button for testing - we can add conditions later
  console.log('FloatingWhatsAppButton render:', { 
    hasItems: order.items?.length > 0, 
    itemsCount: order.items?.length,
    order: order 
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppOrder}
        disabled={isSubmitting}
        className="bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center gap-2 rounded-full px-6 py-3 min-w-[180px]"
        size="lg"
      >
        <MessageSquare className="w-5 h-5" />
        {isSubmitting ? 'Processing...' : 'Order via WhatsApp'}
      </Button>
    </div>
  );
};

export default FloatingWhatsAppButton;
