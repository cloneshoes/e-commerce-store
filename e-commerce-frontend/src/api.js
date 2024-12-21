import axios from 'axios';

// Set up the base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});

// Example: Fetch products
export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Example: Add to cart
export const addToCart = async (productId) => {
  const response = await api.post('/cart', { productId });
  return response.data;
};

// Example: Checkout
export const checkout = async (cartData) => {
  const response = await api.post('/checkout', cartData);
  return response.data;
};

export default api;
