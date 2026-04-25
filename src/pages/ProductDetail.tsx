import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star, Heart, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currency } = useTheme();
  const { addToCart } = useCart();
  
  const product = productsData.find(p => p.id === id);
  useDocumentTitle(product ? product.name : 'Product Details');
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');

  if (!product) {
    return <div className="container" style={{padding: '100px 0'}}>Product not found</div>;
  }

  const price = currency === 'INR' ? `₹${product.prices.INR}` : `£${product.prices.GBP}`;

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ChevronLeft size={20} /> Back to Shop
        </button>

        <div className="detail-grid">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[0]} alt={product.name} />
            </div>
          </div>

          <div className="product-info-detail">
            <div className="info-header">
              <span className="category-tag">{product.category}</span>
              <h1>{product.name}</h1>
              <div className="price-tag">{price}</div>
              <div className="rating">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} />
                <span>(24 Reviews)</span>
              </div>
            </div>

            <p className="description">{product.detailedDescription}</p>

            <div className="options">
              <div className="option-group">
                <h3>Select Color</h3>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button 
                      key={color.name}
                      className={`color-btn ${selectedColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="option-group">
                <h3>Select Size</h3>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="purchase-actions">
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product, selectedSize, selectedColor)}
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className="wishlist-btn"><Heart size={20} /></button>
              <button className="share-btn"><Share2 size={20} /></button>
            </div>

            <div className="info-footer">
              <div className="info-item">
                <strong>Fabric:</strong> 100% Breathable Cotton
              </div>
              <div className="info-item">
                <strong>Delivery:</strong> {currency === 'INR' ? '4-7 Days' : '3-5 Days'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
