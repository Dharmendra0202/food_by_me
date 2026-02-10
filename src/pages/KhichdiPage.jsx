import React from "react";
import { useNavigate } from "react-router-dom";
import "./KhichdiPage.css";

const khichdiItems = [
  { name: "Moong Dal", emoji: "🟡", desc: "Light & digestive blend" },
  { name: "Masoor Dal", emoji: "🔴", desc: "Red lentil comfort" },
  { name: "Chana Dal", emoji: "🌾", desc: "Split chickpea goodness" },
  { name: "Mixed Veg", emoji: "🥕", desc: "Rainbow vegetable mix" },
  { name: "Chicken", emoji: "🍗", desc: "Protein-rich delight" },
  { name: "Mutton", emoji: "🍖", desc: "Tender meat blend" },
  { name: "Fish", emoji: "🐟", desc: "Seafood comfort bowl" },
  { name: "Paneer", emoji: "🧀", desc: "Cottage cheese richness" },
  { name: "Spinach", emoji: "💚", desc: "Iron-rich greens" },
  { name: "Methi", emoji: "🌿", desc: "Herbal fenugreek blend" },
  { name: "Pumpkin", emoji: "🎃", desc: "Sweet autumn flavor" },
  { name: "Potato", emoji: "🥔", desc: "Hearty potato mix" },
  { name: "Carrot & Peas", emoji: "🥬", desc: "Colorful veggie combo" },
  { name: "Corn & Beans", emoji: "🌽", desc: "Seasonal harvest" },
  { name: "Herb Flavored", emoji: "🌱", desc: "Fresh herb infusion" },
  { name: "Arhar Dal", emoji: "🟠", desc: "Pigeon pea classic" },
  { name: "Urad Dal", emoji: "⚫", desc: "Black lentil smooth" },
  { name: "Brown Rice", emoji: "🍚", desc: "Nutty grain blend" },
  { name: "Basmati", emoji: "✨", desc: "Premium rice perfection" },
  { name: "Comfort Mix", emoji: "🏡", desc: "Home comfort special" },
];

const khichdiImages = Array(20).fill("khichdi.jpg");

export default function KhichdiPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(khichdiItems.slice(0, 10));
  const secondHalf = trimTwo(khichdiItems.slice(10));

  return (
    <div className="khichdi-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner khichdi-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍚 Comfort in Every Spoonful!</h1>
          <p className="hero-subtitle">20+ wholesome khichdi varieties for health & happiness</p>
          <div className="hero-badge">❤️ Love at First Bite ❤️</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Khichdi Magic ✨</h2>
          <p>Traditional recipe meets modern flavors. Soft, easy to digest, packed with nutrition. Perfect for breakfast, lunch, or when you need comfort food therapy!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="khichdi-grid container">
        {firstHalf.map((item, i) => (
          <div className="khichdi-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${khichdiImages[i] || 'khichdi.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{89 + i * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + (i % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {15 + (i % 10)}-{25 + (i % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <div className="promo-banner khichdi-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🍚 Health Special! 🍚</h2>
            <p>Khichdi + Yogurt only for <span className="highlight">₹149!</span></p>
          </div>
          <div className="promo-emoji">🥛🌿💚</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="khichdi-grid container">
        {secondHalf.map((item, i) => (
          <div className="khichdi-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${khichdiImages[i + 10] || 'khichdi.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{89 + (i + 10) * 5}</span>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.desc}</p>
              <div className="card-meta">
                <span className="rating">⭐ {(4.0 + ((i + 10) % 5) * 0.1).toFixed(1)}</span>
                <span className="time">⏱️ {15 + ((i + 10) % 10)}-{25 + ((i + 10) % 10)} min</span>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p>🌟 Healthy food, happy body, peaceful mind! 🌟</p>
      </div>
    </div>
  );
}
