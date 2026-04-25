import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import './App.css';

import { AnimatePresence, motion } from 'framer-motion';
import { pageVariants, pageTransition } from './styles/animations';

// Placeholder Pages
const Checkout = () => <div className="container" style={{ padding: '120px 0' }}><h1>Checkout</h1><p>Payment integration coming soon.</p></div>;

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoggedAdmin, setIsLoggedAdmin] = React.useState(false);
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/kavya-clothing" replace />} />

            <Route path="/kavya-clothing/*">
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="admin" element={<AdminLogin onLogin={() => setIsLoggedAdmin(true)} />} />
              <Route
                path="admin/dashboard"
                element={isLoggedAdmin ? <Admin /> : <Navigate to="/kavya-clothing/admin" replace />}
              />
            </Route>

            {/* Fallback to root or kavya-clothing */}
            <Route path="*" element={<Navigate to="/kavya-clothing" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {!isAdminPage && (
        <footer className="main-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h2>KAVYA <span>CLOTHING</span></h2>
                <p>Timeless floral shirts for modern elegance.</p>
              </div>
              <div className="footer-links">
                <h4>Shop</h4>
                <a href="/kavya-clothing/shop">New Arrivals</a>
                <a href="/kavya-clothing/shop">Best Sellers</a>
                <a href="/kavya-clothing/shop">All Products</a>
              </div>
              <div className="footer-links">
                <h4>Support</h4>
                <a href="/kavya-clothing/about">Our Story</a>
                <a href="#">Shipping Policy</a>
                <a href="#">Returns & Exchanges</a>
              </div>
              <div className="footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>Get 10% off your first order!</p>
                <div className="newsletter-box">
                  <input type="email" placeholder="Your email" />
                  <button>Join</button>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Kavya Clothing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
