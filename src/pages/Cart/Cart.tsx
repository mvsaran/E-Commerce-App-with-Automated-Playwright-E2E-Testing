import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/Button/Button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './Cart.css';

export const Cart: FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-container container flex flex-col items-center justify-center animate-fade-in text-center" style={{ minHeight: '60vh' }}>
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <p className="text-secondary mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      <h1 className="mb-8">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-section glass-panel">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-product">
                  <div className="cart-item-image-wrapper">
                    <img src={item.product.image} alt={item.product.title} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="cart-item-total">
                  <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-actions mt-4 flex justify-between p-6 border-t">
            <Button variant="ghost" onClick={clearCart}>Clear Cart</Button>
            <Link to="/">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="glass-panel p-6 sticky-summary">
            <h3 className="mb-6 border-b pb-4">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row summary-total mt-4 border-t pt-4">
              <span>Total</span>
              <span className="gradient-text">${(totalPrice * 1.1).toFixed(2)}</span>
            </div>
            
            <Button 
              size="lg" 
              fullWidth 
              className="mt-6 checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
