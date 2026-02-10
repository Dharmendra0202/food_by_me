import React from "react";
import { useNavigate } from "react-router-dom";
import "./BiryaniPage.css";

const biryaniItems = [
  { name: "Hyderabadi Biryani", emoji: "🍛", desc: "Fragrant spiced rice & meat" },
  { name: "Lucknowi Biryani", emoji: "👑", desc: "Royal aromatic blend" },
  { name: "Kolkata Biryani", emoji: "🟡", desc: "Potato-laced delicacy" },
  { name: "Sindhi Biryani", emoji: "🌶️", desc: "Spiced meat medley" },
  { name: "Malabar Biryani", emoji: "🍶", desc: "Coconut rice specialty" },
  { name: "Ambur Biryani", emoji: "🧈", desc: "Ghee-laden perfection" },
  { name: "Thalassery Biryani", emoji: "🌾", desc: "Short-grain rice delight" },
  { name: "Bombay Biryani", emoji: "🌃", desc: "Urban spiced blend" },
  { name: "Dindigul Biryani", emoji: "🔥", desc: "Spicy South Indian" },
  { name: "Chettinad Biryani", emoji: "💪", desc: "Bold pepper flavor" },
  { name: "Chicken Dum", emoji: "🍗", desc: "Tender chicken slow-cooked" },
  { name: "Mutton Dum", emoji: "🍖", desc: "Soft meat perfection" },
  { name: "Egg Biryani", emoji: "🥚", desc: "Protein-rich blend" },
  { name: "Paneer Biryani", emoji: "🧀", desc: "Cottage cheese special" },
  { name: "Veg Biryani", emoji: "🥕", desc: "Rainbow vegetables" },
  { name: "Fish Biryani", emoji: "🐟", desc: "Seafood delicate taste" },
  { name: "Prawn Biryani", emoji: "🦐", desc: "Shrimp luxury blend" },
  { name: "Keema Biryani", emoji: "🧅", desc: "Ground meat aromatic" },
  { name: "Afghani Biryani", emoji: "🌾", desc: "Nutty grain blend" },
  { name: "Kashmiri Biryani", emoji: "💜", desc: "Saffron golden beauty" },
];

const biryaniImages = Array(20).fill("Biryani.jpg");

export default function BiryaniPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(biryaniItems.slice(0, 10));
  const secondHalf = trimTwo(biryaniItems.slice(10));

  return (
    <div className="biryani-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner biryani-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍛 Royal Biryani Kingdom!</h1>
          <p className="hero-subtitle">40+ majestic biryani varieties from across India</p>
          <div className="hero-badge">👑 One Pot, Infinite Flavors 👑</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Biryani Majesty 🍛</h2>
          <p>The king of rice dishes! Slow-cooked layers of aromatic basmati rice, tender meats, and secret spice blends. Each grain tells a story of tradition and perfection!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="biryani-grid container">
        {firstHalf.map((item, i) => (
          <div className="biryani-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${biryaniImages[i] || 'Biryani.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{199 + i * 8}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + (i % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {25 + (i % 10)}-{35 + (i % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <div className="promo-banner biryani-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🍛 Royal Offer! 🍛</h2>
            <p>Get biryani + raita for only <span className="highlight">₹349!</span></p>
          </div>
          <div className="promo-emoji">👑🌾✨</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="biryani-grid container">
        {secondHalf.map((item, i) => (
          <div className="biryani-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${biryaniImages[i + 10] || 'Biryani.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{199 + (i + 10) * 8}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + ((i + 10) % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {25 + ((i + 10) % 10)}-{35 + ((i + 10) % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p>🌟 Experience the magic of Biryani in every fragrant grain! 🌟</p>
      </div>
    </div>
  );
}
