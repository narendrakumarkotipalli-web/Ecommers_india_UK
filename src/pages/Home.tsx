import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ScrollProgress from "../components/ScrollProgress";
import productsData from "../data/products.json";
import { fadeInUp, staggerContainer } from "../styles/animations";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Home.css";

const Home: React.FC = () => {
  useDocumentTitle("Premium Women Casuals");
  const featuredProducts = productsData.slice(0, 4);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="home-page">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-content" style={{ y, opacity }}>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Effortless Floral Shirts <br />
            <span>for Everyday Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              color: "var(--text-secondary)",
              marginBottom: "30px",
              fontSize: "1.2rem",
            }}
          >
            Discover our curated collection of premium women's casual wear.
          </motion.p>
          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/karya-clothing/shop" className="btn btn-primary">
              Shop New Arrivals
            </Link>
            <Link to="/karya-clothing/shop" className="btn btn-outline">
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" style={{ scale }}>
          <img src="/images/shirt-1.png" alt="Hero Floral Shirt" />
        </motion.div>
      </section>

      {/* Featured Collection */}
      <motion.section
        className="section featured-collection"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Featured Collection</h2>
            <p>Beautiful & Feminine Casual Shirts</p>
          </motion.div>
          <motion.div className="product-grid" variants={staggerContainer}>
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="section-footer" variants={fadeInUp}>
            <Link to="/karya-clothing/shop" className="btn btn-primary lg">
              Shop All Collection
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story with Reveal Animation */}
      <section className="section our-story">
        <div className="container">
          <div className="story-grid">
            <motion.div
              className="story-image"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <img src="/images/shirt-2.png" alt="Our Story" />
            </motion.div>
            <motion.div
              className="story-content"
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                Karya Clothing was born from an obsession with the perfect
                floral print. We believe that everyday wear should feel like a
                celebration of femininity and comfort. What started as a small
                kitchen-table project in 2024 has blossomed into a international
                label dedicated to botanical elegance.
              </p>
              <p>
                Every shirt we craft is a testament to our commitment to
                breathable fabrics and timeless silhouettes that empower women
                to feel their best, wherever they are.
              </p>
              <Link to="/karya-clothing/about" className="learn-more">
                Learn More <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <motion.section
        className="section why-choose"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Why Choose Karya</h2>
          </motion.div>
          <div className="features-grid">
            <motion.div
              className="feature-item"
              variants={fadeInUp}
              whileHover={{ rotateY: 15, scale: 1.05 }}
            >
              <Leaf size={40} className="feature-icon" />
              <h3>Breathable Fabrics</h3>
              <p>Made from 100% natural fibers for ultimate comfort.</p>
            </motion.div>
            <motion.div
              className="feature-item"
              variants={fadeInUp}
              whileHover={{ rotateY: 15, scale: 1.05 }}
            >
              <ShieldCheck size={40} className="feature-icon" />
              <h3>Feminine Designs</h3>
              <p>Tailored to flatter every silhouette beautifully.</p>
            </motion.div>
            <motion.div
              className="feature-item"
              variants={fadeInUp}
              whileHover={{ rotateY: 15, scale: 1.05 }}
            >
              <Truck size={40} className="feature-icon" />
              <h3>Fast Shipping</h3>
              <p>Deliveries within 3-7 days in India & UK.</p>
            </motion.div>
            <motion.div
              className="feature-item"
              variants={fadeInUp}
              whileHover={{ rotateY: 15, scale: 1.05 }}
            >
              <RefreshCcw size={40} className="feature-icon" />
              <h3>Easy Returns</h3>
              <p>30-day hassle-free returns on all orders.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
