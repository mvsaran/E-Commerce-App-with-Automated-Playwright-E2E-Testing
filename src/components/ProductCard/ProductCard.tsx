import { FC } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../Button/Button';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card glass-panel animate-fade-in">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <div className="product-category-badge">{product.category}</div>
      </div>
      <div className="product-content">
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-desc">{product.description.substring(0, 80)}...</p>
        <div className="product-actions">
          <Button onClick={() => addToCart(product)} fullWidth className="add-to-cart-btn">
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
