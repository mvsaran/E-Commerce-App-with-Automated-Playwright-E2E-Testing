import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { CheckCircle } from 'lucide-react';
import './Checkout.css';

export const Checkout: FC = () => {
  const { isAuthenticated } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (!isAuthenticated) {
    // Save intended destination if needed, here just redirect to login
    return <Navigate to="/login" replace />;
  }

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="page-container container flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '60vh' }}>
        <CheckCircle size={64} className="text-secondary mb-6" />
        <h2 className="text-3xl mb-4 gradient-text">Payment Successful!</h2>
        <p className="text-secondary mb-8 text-center max-w-md">
          Thank you for your purchase. Your order has been placed and is being processed.
          You will receive an email confirmation shortly.
        </p>
        <Button onClick={() => navigate('/')} size="lg">Return to Store</Button>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      <h1 className="mb-8 text-center">Secure Checkout</h1>
      
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form-section">
          <div className="glass-panel p-6 mb-6">
            <h3 className="mb-4 border-b pb-2">Shipping Information</h3>
            <div className="grid-2-col">
              <Input id="firstName" label="First Name" required value={formData.firstName} onChange={handleChange} />
              <Input id="lastName" label="Last Name" required value={formData.lastName} onChange={handleChange} />
            </div>
            <Input id="address" label="Street Address" required value={formData.address} onChange={handleChange} />
            <div className="grid-2-col">
              <Input id="city" label="City" required value={formData.city} onChange={handleChange} />
              <Input id="zipCode" label="ZIP Code" required value={formData.zipCode} onChange={handleChange} />
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="mb-4 border-b pb-2">Payment Details</h3>
            <Input id="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleChange} />
            <div className="grid-2-col">
              <Input id="expiry" label="Expiry Date" placeholder="MM/YY" required value={formData.expiry} onChange={handleChange} />
              <Input id="cvv" label="CVV" placeholder="123" required type="password" value={formData.cvv} onChange={handleChange} />
            </div>
          </div>
          
          <div className="mobile-only mt-6">
             <Button type="submit" size="lg" fullWidth isLoading={isProcessing}>
                Pay ${(totalPrice * 1.1).toFixed(2)}
             </Button>
          </div>
        </form>

        <div className="checkout-summary-section">
          <div className="glass-panel p-6 sticky-summary">
            <h3 className="mb-6 border-b pb-4">Order Summary</h3>
            
            <div className="checkout-items mb-4">
              {items.map(item => (
                <div key={item.product.id} className="checkout-item mb-2 flex justify-between text-sm">
                  <span className="text-secondary truncate pr-4">{item.quantity}x {item.product.title}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row summary-total mt-4 border-t pt-4">
                <span>Total</span>
                <span className="gradient-text">${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              fullWidth 
              className="mt-6 desktop-only"
              onClick={handleSubmit}
              isLoading={isProcessing}
            >
              Confirm & Pay ${(totalPrice * 1.1).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
