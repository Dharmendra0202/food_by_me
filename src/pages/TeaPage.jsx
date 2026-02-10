import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeaPage.css";

const teaItems = [
  { name: "Masala Chai", emoji: "♨️", desc: "Traditional spiced tea" },
  { name: "Green Tea", emoji: "🍃", desc: "Fresh & antioxidant rich" },
  { name: "Black Tea", emoji: "🖤", desc: "Strong and energizing" },
  { name: "Lemon Tea", emoji: "🍋", desc: "Zesty citrus flavor" },
  { name: "Ginger Chai", emoji: "🟤", desc: "Warming ginger spice" },
  { name: "Cardamom Chai", emoji: "💚", desc: "Aromatic & soothing" },
  { name: "Tulsi Tea", emoji: "🌿", desc: "Holy basil goodness" },
  { name: "Chamomile Tea", emoji: "🌼", desc: "Calming relaxation" },
  { name: "Herbal Tea", emoji: "🌱", desc: "Nature's blend" },
  { name: "Oolong Tea", emoji: "🔶", desc: "Semi-fermented perfection" },
  { name: "Darjeeling Tea", emoji: "☕", desc: "Premium mountain tea" },
  { name: "Assam Tea", emoji: "🟫", desc: "Bold & malty flavor" },
  { name: "Milk Tea", emoji: "🥛", desc: "Creamy comfort" },
  { name: "Honey Tea", emoji: "🍯", desc: "Sweet natural blend" },
  { name: "Mint Tea", emoji: "🫃", desc: "Refreshingly cool" },
  { name: "Clove Chai", emoji: "🌸", desc: "Spiced warmth" },
  { name: "Cinnamon Tea", emoji: "🥄", desc: "Sweet & fragrant" },
  { name: "Elaichi Chai", emoji: "💛", desc: "Cardamom delight" },
  { name: "Kasuri Chai", emoji: "🟣", desc: "Dried methi blend" },
  { name: "Desi Chai", emoji: "🏘️", desc: "Pure tradition" },
];

const teaImages = Array(20).fill("Tea.png");

export default function TeaPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(teaItems.slice(0, 10));
  const secondHalf = trimTwo(teaItems.slice(10));

  return (
    <div className="tea-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner tea-hero">
        <div className="hero-content">
          <h1 className="hero-title">☕ Brew the Perfect Cup!</h1>
          <p className="hero-subtitle">20+ premium tea varieties, from aromatic to relaxing blends</p>
          <div className="hero-badge">☕ Steep, Sip, Smile ☕</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Tea Time Magic ✨</h2>
          <p>From traditional masala chai to exotic herbal brews, each cup is crafted to perfection. Sourced from the finest gardens, our teas are pure wellness in a cup!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="tea-grid container">
        {firstHalf.map((item, i) => (
          <div className="tea-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${teaImages[i] || 'Tea.png'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{39 + i * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + (i % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {5 + (i % 10)}-{15 + (i % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <div className="promo-banner tea-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>☕ Afternoon Special! ☕</h2>
            <p>Buy any 2 teas, get <span className="highlight">₹50 discount</span></p>
          </div>
          <div className="promo-emoji">🫖✨🎁</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="tea-grid container">
        {secondHalf.map((item, i) => (
          <div className="tea-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${teaImages[i + 10] || 'Tea.png'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{39 + (i + 10) * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + ((i + 10) % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {5 + ((i + 10) % 10)}-{15 + ((i + 10) % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p>🌟 Every sip is a moment of peace and pleasure! 🌟</p>
      </div>
    </div>
  );
}
