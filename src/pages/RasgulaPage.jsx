import React from "react";
import { useNavigate } from "react-router-dom";
import "./RasgulaPage.css";

const rasgulaItems = [
  { name: "Classic Rasgulla", emoji: "⚪", desc: "Traditional spongy balls" },
  { name: "Rose Rasgulla", emoji: "🌹", desc: "Flowery aromatic blend" },
  { name: "Kesar Rasgulla", emoji: "🟡", desc: "Saffron golden delight" },
  { name: "Pista Rasgulla", emoji: "💚", desc: "Pistachio green special" },
  { name: "Choco Rasgulla", emoji: "🍫", desc: "Chocolate coated joy" },
  { name: "Mango Rasgulla", emoji: "🥭", desc: "Fruity tropical version" },
  { name: "Strawberry", emoji: "🍓", desc: "Berry sweet surprise" },
  { name: "Coconut", emoji: "🥥", desc: "White tropical blend" },
  { name: "Honey", emoji: "🍯", desc: "Naturally sweet magic" },
  { name: "Cardamom", emoji: "💛", desc: "Spiced aromatic touch" },
  { name: "Saffron", emoji: "🟧", desc: "Premium golden luxury" },
  { name: "Fruit Rasgulla", emoji: "🌈", desc: "Fruity medley mix" },
  { name: "Bengali", emoji: "🟦", desc: "Original Bengali style" },
  { name: "Orissa", emoji: "🌊", desc: "Eastern flavored version" },
  { name: "Spiced", emoji: "🌶️", desc: "Warm spice blend" },
  { name: "Royal", emoji: "👑", desc: "Premium luxury treat" },
  { name: "Jumbo", emoji: "💪", desc: "Extra large sponges" },
  { name: "Mini", emoji: "🤏", desc: "Bite-sized cuteness" },
  { name: "Basket Mix", emoji: "🧺", desc: "Multi-flavor combo" },
  { name: "Rasgulla Combo", emoji: "🎁", desc: "Perfect gift box" },
];

const rasgulaImages = Array(20).fill("rasgulla.jpg");

export default function RasgulaPage() {
  const navigate = useNavigate();
  const firstHalf = rasgulaItems.slice(0, 10);
  const secondHalf = rasgulaItems.slice(10);

  return (
    <div className="rasgula-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner rasgula-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍡 Rasgulla Romance!</h1>
          <p className="hero-subtitle">20+ syrupy sweet rasgullas that melt in your mouth</p>
          <div className="hero-badge">🌟 Soft, Spongy & Syrupy 🌟</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Rasgulla Magic 🍡</h2>
          <p>Light, spongy cheese balls soaked in sugar syrup. Each rasgulla is a bite of heaven, melting on your tongue with pure sweetness!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="rasgula-grid container">
        {firstHalf.map((item, i) => (
          <div className="rasgula-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${rasgulaImages[i] || 'rasgulla.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{79 + i * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + (i % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {10 + (i % 10)}-{20 + (i % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <div className="promo-banner rasgula-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🍡 Sweet Deal! 🍡</h2>
            <p>Get 1kg rasgulla for <span className="highlight">₹299!</span></p>
          </div>
          <div className="promo-emoji">💝🎂✨</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="rasgula-grid container">
        {secondHalf.map((item, i) => (
          <div className="rasgula-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${rasgulaImages[i + 10] || 'rasgulla.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{79 + (i + 10) * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + ((i + 10) % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {10 + ((i + 10) % 10)}-{20 + ((i + 10) % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p>🌟 One bite and you'll be hooked! Order your rasgullas now 🌟</p>
      </div>
    </div>
  );
}
