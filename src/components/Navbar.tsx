import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Sun, Moon, MapPin, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, accent, currency, toggleTheme, setAccent, setCurrency } =
    useTheme();
  const { totalItems } = useCart();

  const accentColors: { name: string; value: "rose" | "sage" | "sky" }[] = [
    { name: "Rose", value: "rose" },
    { name: "Sage", value: "sage" },
    { name: "Sky", value: "sky" },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/kavya-clothing" className="navbar-logo">
          KAVYA <span>CLOTHING</span>
        </Link>

        {/* Desktop Links */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/kavya-clothing" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/kavya-clothing/shop" onClick={() => setIsMenuOpen(false)}>
            Shop Collection
          </Link>
          <Link to="/kavya-clothing/about" onClick={() => setIsMenuOpen(false)}>
            Our Story
          </Link>
          <Link to="/kavya-clothing/admin" onClick={() => setIsMenuOpen(false)}>
            Admin
          </Link>
        </div>

        <div className="nav-actions">
          {/* Region Dropdown */}
          <div
            className="region-selector"
            onMouseEnter={() => setActiveDropdown("region")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="icon-btn" title="Switch Region">
              <MapPin size={20} />
              <span>{currency}</span>
            </button>
            <AnimatePresence>
              {activeDropdown === "region" && (
                <motion.div
                  className="dropdown"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <button onClick={() => setCurrency("INR")}>India (₹)</button>
                  <button onClick={() => setCurrency("GBP")}>UK (£)</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accent Dropdown */}
          <div
            className="accent-selector"
            onMouseEnter={() => setActiveDropdown("accent")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="icon-btn" title="Switch Accent">
              <Palette size={20} />
            </button>
            <AnimatePresence>
              {activeDropdown === "accent" && (
                <motion.div
                  className="dropdown accent-dropdown"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setAccent(color.value)}
                      className={accent === color.value ? "active" : ""}
                    >
                      <span className={`color-dot ${color.value}`}></span>
                      {color.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Cart Icon */}
          <Link to="/kavya-clothing/cart" className="icon-btn cart-btn">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="cart-badge"
                  className="cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
