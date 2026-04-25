import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Globe, Shield } from "lucide-react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { fadeInUp, staggerContainer } from "../styles/animations";
import "./About.css";

const About: React.FC = () => {
  useDocumentTitle("Our Story");

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Crafted with Love",
      desc: "Every floral pattern is hand-picked and every fabric is tested for ultimate comfort.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "Modern Elegance",
      desc: "We believe casual wear should never feel ordinary. Our designs bridge the gap between comfort and style.",
    },
    {
      icon: <Globe size={32} />,
      title: "Global Reach",
      desc: "Starting from local roots, we now deliver our floral dreams across India and the United Kingdom.",
    },
    {
      icon: <Shield size={32} />,
      title: "Ethical Quality",
      desc: "We partner with responsible manufacturers to ensure every shirt meets high ethical standards.",
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Heart of <span>Kavya</span>
          </motion.h1>
          <p>Redefining women's casuals with a touch of botanical grace.</p>
        </div>
      </section>

      <section className="section our-mission">
        <div className="container">
          <div className="mission-grid">
            <motion.div
              className="mission-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Journey</h2>
              <p>
                Founded in 2024, Kavya Clothing emerged from a simple desire: to
                make high-quality, floral-print casual wear accessible to the
                modern woman. We noticed a gap in the market for shirts that
                were breathable enough for a busy day outdoors but elegant
                enough for an evening out.
              </p>
              <p>
                What started as a small experimental collection has grown into a
                beloved brand across two continents. We take pride in our
                obsession with details—from the choice of buttons to the
                specific weave of our cotton-linen blends.
              </p>
            </motion.div>
            <motion.div
              className="mission-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="/images/shirt-4.png" alt="Behind the scenes" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Our Core Values</h2>
          </motion.div>
          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((v, i) => (
              <motion.div key={i} className="value-card" variants={fadeInUp}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section join-us">
        <div className="container">
          <div className="join-box">
            <h2>Experience the Kavya Feel</h2>
            <p>
              Join thousands of women who have made Kavya a part of their daily
              life. Explore our latest collection today.
            </p>
            <a href="/kavya-clothing/shop" className="btn btn-primary lg">
              Explore Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
