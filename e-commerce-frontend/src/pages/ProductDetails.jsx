import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id)); // Fetch product by ID
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading and error handling
  if (loading) {
    return <h2>Loading product details...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF' }}>
        Back to products
      </Link>

      <div className="product-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-card">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
          <br />

          <button
            onClick={() => addToCart(product)}
            className="button"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>

          <Link to="/cart">
            <button className="gtc-btn">
              Go to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
