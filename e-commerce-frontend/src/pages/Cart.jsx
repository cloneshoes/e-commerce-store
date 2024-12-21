import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF' }}>
        Back to Products
      </Link>

      <h1>Your Cart</h1>

      {/* Cart is empty message */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Display cart items */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  margin: '10px 0',
                  padding: '10px',
                  background: '#f4f4f4',
                  border: '1px solid #ccc',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.name}</span>
                <div>
                  {/* Decrease quantity */}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // Disable minus button if quantity is 1
                    style={{
                      background: '#ccc',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      marginRight: '5px',
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  {/* Increase quantity */}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      background: '#ccc',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      marginLeft: '5px',
                    }}
                  >
                    +
                  </button>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                {/* Remove item from cart */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    padding: '5px 10px',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Display total price */}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          {/* Proceed to checkout */}
          <Link to="/checkout">
            <button
              style={{
                marginTop: '20px',
                background: '#007BFF',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
