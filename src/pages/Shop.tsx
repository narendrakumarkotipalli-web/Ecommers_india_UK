import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { useTheme } from '../context/ThemeContext';
import { fadeInUp, staggerContainer } from '../styles/animations';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Shop.css';

const Shop: React.FC = () => {
  useDocumentTitle('Shop Collection');
  const { currency } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    size: [] as string[],
    occasion: [] as string[],
    fabric: [] as string[],
    priceRange: [0, 10000] as [number, number]
  });

  const categories = useMemo(() => Array.from(new Set(productsData.map(p => p.category))), []);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const occasions = useMemo(() => Array.from(new Set(productsData.map(p => p.occasion))), []);
  const fabrics = useMemo(() => Array.from(new Set(productsData.map(p => p.fabric))), []);

  const toggleFilter = (type: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => {
      const current = prev[type] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [type]: exists ? current.filter(i => i !== value) : [...current, value]
      };
    });
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const categoryMatch = activeFilters.category.length === 0 || activeFilters.category.includes(product.category);
      const sizeMatch = activeFilters.size.length === 0 || product.sizes.some(s => activeFilters.size.includes(s));
      const occasionMatch = activeFilters.occasion.length === 0 || activeFilters.occasion.includes(product.occasion);
      const fabricMatch = activeFilters.fabric.length === 0 || activeFilters.fabric.includes(product.fabric);
      
      return categoryMatch && sizeMatch && occasionMatch && fabricMatch;
    });
  }, [activeFilters, currency]);

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      size: [],
      occasion: [],
      fabric: [],
      priceRange: [0, 10000]
    });
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Shop All Collections
          </motion.h1>
          <p>Discover our range of premium floral shirts designed for every occasion.</p>
        </div>
      </div>

      <div className="shop-content container">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-top">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearFilters}>Clear All</button>
          </div>

          <div className="filter-group">
            <h4>Categories</h4>
            <div className="filter-options">
              {categories.map(cat => (
                <label key={cat} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={activeFilters.category.includes(cat)}
                    onChange={() => toggleFilter('category', cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="size-options">
              {sizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${activeFilters.size.includes(size) ? 'active' : ''}`}
                  onClick={() => toggleFilter('size', size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Occasion</h4>
            <div className="filter-options">
              {occasions.map(occ => (
                <label key={occ} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={activeFilters.occasion.includes(occ)}
                    onChange={() => toggleFilter('occasion', occ)}
                  />
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Fabric</h4>
            <div className="filter-options">
              {fabrics.map(fab => (
                <label key={fab} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={activeFilters.fabric.includes(fab)}
                    onChange={() => toggleFilter('fabric', fab)}
                  />
                  <span>{fab}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="shop-main">
          <div className="shop-toolbar">
            <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal size={18} />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="product-count">
              Showing <strong>{filteredProducts.length}</strong> products
            </div>
          </div>

          <motion.div 
            className="shop-product-grid"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            key={filteredProducts.length} // Force animation on filter
          >
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div key={product.id} variants={fadeInUp} layout>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear all filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
