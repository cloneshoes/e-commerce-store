import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Checkout.css';
function Checkout() {
  const { cart } = useCart();

  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    phone: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  // Inside the handleSubmit function:
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed', { shippingDetails, paymentDetails, cart });
    alert('Order placed successfully!');
    navigate('/order-confirmation');
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <Link to="/cart" style={{ textDecoration: 'none', color: '#007BFF' }}>
        Back to Cart
      </Link>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Shipping Details Section */}
        <div className="section">
          <h2>Shipping Details</h2>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={(e) => handleInputChange(e, setShippingDetails)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingDetails.phone}
              onChange={(e) => handleInputChange(e, setShippingDetails)}
              required
            />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="section">
          <h2>Payment Details</h2>
          <div className="input-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={(e) => handleInputChange(e, setPaymentDetails)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="month"
              id="expiry"
              name="expiry"
              value={paymentDetails.expiry}
              onChange={(e) => handleInputChange(e, setPaymentDetails)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={(e) => handleInputChange(e, setPaymentDetails)}
              required
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>

        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
