import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types/product';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currency } = useTheme();
  const { addToCart } = useCart();

  const currentPrice = currency === 'INR' ? product.prices.INR : product.prices.GBP;
  const originalPrice = product.originalPrices ? (currency === 'INR' ? product.originalPrices.INR : product.originalPrices.GBP) : null;
  const symbol = currency === 'INR' ? '₹' : '£';

  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="image-container">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        
        {/* Quality Tags */}
        <div className="card-tags-left">
          {product.isNew && <span className="badge new">New</span>}
          {product.isBestSeller && <span className="badge hot">Best Seller</span>}
        </div>

        {/* Special Deal Tag (Right Corner) */}
        {product.isSpecialDeal && (
          <div className="badge special-deal">
            <Zap size={12} fill="currentColor" /> Special Deal
          </div>
        )}

        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        
        <motion.div 
          className="overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <Link to={`/kavya-clothing/product/${product.id}`} className="overlay-btn">
            <Eye size={20} />
            Quick View
          </Link>
          <button 
            className="overlay-btn primary"
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </motion.div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        
        <div className="price-container">
          <span className="current-price">{symbol}{currentPrice.toLocaleString()}</span>
          {originalPrice && (
            <span className="original-price">{symbol}{originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
