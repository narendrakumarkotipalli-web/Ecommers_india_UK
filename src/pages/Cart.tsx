import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Cart.css';

const Cart: React.FC = () => {
  useDocumentTitle('Your Shopping Cart');
  const { currency } = useTheme();
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container">
          <ShoppingBag size={80} />
          <h1>Your Cart is Empty</h1>
          <p>Seems like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return currency === 'INR' ? `₹${price.toLocaleString()}` : `£${price.toLocaleString()}`;
  };

  const total = currency === 'INR' ? subtotal.INR : subtotal.GBP;

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <img src={item.images[0]} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <p className="item-price">{formatPrice(currency === 'INR' ? item.prices.INR : item.prices.GBP)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}><Plus size={14} /></button>
                </div>
                <div className="item-total">
                  {formatPrice((currency === 'INR' ? item.prices.INR : item.prices.GBP) * item.quantity)}
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id, item.selectedSize)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary lg block">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
