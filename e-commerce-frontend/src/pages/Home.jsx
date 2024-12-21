import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path to your Firebase configuration
import '../styles.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query === '') {
      setFilteredProducts(products); // Show all products if the query is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) || // Search by product name
        product.description.toLowerCase().includes(query.toLowerCase()) // Or search by description
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/cart">
        <button className="btn-prime">Go to Cart</button>
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '20px',
          marginRight: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <h1>Our Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                borderRadius: '8px',
              }}
            >
              <img
                className="image-container"
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: '150px',
                  maxHeight: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>

              <Link to={`/product/${product.id}`}>
                <button className="btn-primary">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
