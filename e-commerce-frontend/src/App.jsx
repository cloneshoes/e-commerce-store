import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/authContext'; // Import AuthProvider
// import ProtectedRoute from './components/ProtectedRoute'; // Protected route component
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
import './styles.css';

function App() {
  return (
    <Router> {/* Wrap the Router around the entire app */}
      <AuthProvider> {/* Wrap AuthProvider inside Router to ensure useNavigate works */}
        <CartProvider> {/* Wrap CartProvider around your app to provide cart context */}
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} /> */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
