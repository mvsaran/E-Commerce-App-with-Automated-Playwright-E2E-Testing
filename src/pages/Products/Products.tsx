import { useState, useEffect, FC } from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Products.css';

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="loader" style={{ width: '3rem', height: '3rem', borderWidth: '4px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="page-container container">
      <div className="products-header text-center mb-4 py-8">
        <h1 className="gradient-text mb-4">Discover Our Collection</h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Explore premium products crafted with precision. Enhance your lifestyle with our curated selection.
        </p>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
