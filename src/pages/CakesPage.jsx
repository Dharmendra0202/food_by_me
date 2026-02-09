import React from "react";
import { useNavigate } from "react-router-dom";
import "./CakesPage.css";

const cakesItems = [
  { name: "Chocolate Cake", emoji: "🍰", desc: "Rich cocoa heaven" },
  { name: "Vanilla Cake", emoji: "🤍", desc: "Classic vanilla dream" },
  { name: "Red Velvet", emoji: "❤️", desc: "Velvety smooth blend" },
  { name: "Carrot Cake", emoji: "🥕", desc: "Moist & spiced delight" },
  { name: "Cheesecake", emoji: "🧀", desc: "Creamy cheese bliss" },
  { name: "Black Forest", emoji: "🍒", desc: "Cherry chocolate magic" },
  { name: "Coffee Cake", emoji: "☕", desc: "Coffee-infused richness" },
  { name: "Butterscotch", emoji: "🧈", desc: "Sweet caramel blend" },
  { name: "Strawberry", emoji: "🍓", desc: "Fresh berry goodness" },
  { name: "Lemon Cake", emoji: "🍋", desc: "Zesty citrus cake" },
  { name: "Marble Cake", emoji: "🩴", desc: "Swirled chocolate vanilla" },
  { name: "Choco-Chip", emoji: "🫐", desc: "Chip studded delight" },
  { name: "Walnut Cake", emoji: "🫘", desc: "Nutty texture blend" },
  { name: "Almond Cake", emoji: "🟡", desc: "Delicate almond flavor" },
  { name: "Fruit Cake", emoji: "🌈", desc: "Fruity festive special" },
  { name: "White Forest", emoji: "⚪", desc: "Coconut cherry blend" },
  { name: "Caramel Cake", emoji: "🟤", desc: "Golden caramel beauty" },
  { name: "Mocha Cake", emoji: "🤎", desc: "Coffee chocolate combo" },
  { name: "Pineapple Cake", emoji: "🍍", desc: "Tropical fruit blend" },
  { name: "Mix Berry", emoji: "🫐", desc: "Berry medley perfection" },
];

const cakesImages = Array(20).fill("Cakes.jpg");

export default function CakesPage() {
  const navigate = useNavigate();
  const firstHalf = cakesItems.slice(0, 10);
  const secondHalf = cakesItems.slice(10);

  return (
    <div className="cakes-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner cakes-hero">
        <div className="hero-content">
          <h1 className="hero-title">🎂 Cake Celebration Time!</h1>
          <p className="hero-subtitle">20+ freshly baked cakes for every occasion</p>
          <div className="hero-badge">✨ Moist, Fresh & Delicious ✨</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Cake Perfection 🎂</h2>
          <p>Freshly baked daily with premium ingredients, rich flavors, and beautiful designs. Perfect for celebrations, gatherings, or just a sweet treat!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="cakes-grid container">
        {firstHalf.map((item, i) => (
          <div className="cakes-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${cakesImages[i] || 'Cakes.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{199 + i * 10}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + (i % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {20 + (i % 10)}-{30 + (i % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <div className="promo-banner cakes-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🎂 Celebration Offer! 🎂</h2>
            <p>Order cake + free eggless option for <span className="highlight">₹399!</span></p>
          </div>
          <div className="promo-emoji">🎉🥳🎈</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="cakes-grid container">
        {secondHalf.map((item, i) => (
          <div className="cakes-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${cakesImages[i + 10] || 'Cakes.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{199 + (i + 10) * 10}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + ((i + 10) % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {20 + ((i + 10) % 10)}-{30 + ((i + 10) % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p>🌟 Every moment deserves a slice of sweetness! 🌟</p>
      </div>
    </div>
  );
}
