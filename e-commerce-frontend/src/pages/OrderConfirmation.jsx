import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function OrderConfirmation() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  // Use an empty dependency array to ensure the effect runs only once
  useEffect(() => {
    clearCart(); // Clear the cart when the component mounts
  }, []); // Empty array ensures this runs only once

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderConfirmation;
