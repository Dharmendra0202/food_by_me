import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChinesePage.css";

const chineseItems = [
  { name: "Hakka Noodles", emoji: "🍜", desc: "Stir-fried noodle perfection" },
  { name: "Chowmein", emoji: "🍝", desc: "Crispy noodle delight" },
  { name: "Fried Rice", emoji: "🍚", desc: "Fluffy seasoned rice" },
  { name: "Manchurian Balls", emoji: "🔴", desc: "Crispy sauce-coated bites" },
  { name: "Sweet & Sour", emoji: "🍗", desc: "Tangy chicken perfection" },
  { name: "Spring Rolls", emoji: "🥒", desc: "Golden crispy bundles" },
  { name: "Dim Sum", emoji: "🫔", desc: "Bite-sized dumplings" },
  { name: "Momos", emoji: "🫖", desc: "Steamed flour pockets" },
  { name: "Schezwan Sauce", emoji: "🌶️", desc: "Spicy numbing blend" },
  { name: "Garlic Noodles", emoji: "🧄", desc: "Aromatic garlic heaven" },
  { name: "Egg Fried Rice", emoji: "🥚", desc: "Protein-rich stir fry" },
  { name: "Veg Fried Rice", emoji: "🥕", desc: "Colorful vegetable mix" },
  { name: "Chicken Fried Rice", emoji: "🍗", desc: "Meat-loaded rice" },
  { name: "Shrimp Fried Rice", emoji: "🦐", desc: "Seafood delicate blend" },
  { name: "Mixed Veg", emoji: "🎨", desc: "Rainbow veggie supreme" },
  { name: "Chili Chicken", emoji: "🌶️", desc: "Spiced chicken chunks" },
  { name: "Honey Chilli", emoji: "🍯", desc: "Sweet and spicy potato" },
  { name: "Corn & Potato", emoji: "🌽", desc: "Crunchy golden fry" },
  { name: "Lo Mein", emoji: "🍜", desc: "Braised noodle style" },
  { name: "Crispy Basket", emoji: "🧺", desc: "Mixed crunchy delights" },
];

const chineseImages = Array(20).fill("Chinese.jpg");

export default function ChinesePage() {
  const navigate = useNavigate();
  const firstHalf = chineseItems.slice(0, 10);
  const secondHalf = chineseItems.slice(10);

  return (
    <div className="chinese-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner chinese-hero">
        <div className="hero-content">
          <h1 className="hero-title">🥡 Chinese Flavor Explosion!</h1>
          <p className="hero-subtitle">20+ authentic Chinese dishes with local flavor twist</p>
          <div className="hero-badge">🔥 Wok-Tossed & Sizzling 🔥</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Chinese Magic 🥡</h2>
          <p>Prepared in traditional woks with premium ingredients and secret spice blends. Fast, fresh, and absolutely finger-licking delicious!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="chinese-grid container">
        {firstHalf.map((item, i) => (
          <div className="chinese-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${chineseImages[i] || 'Chinese.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{99 + i * 8}</span>
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
      <div className="promo-banner chinese-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🥡 Wok Deal! 🥡</h2>
            <p>Order 2 items, get <span className="highlight">30% OFF!</span></p>
          </div>
          <div className="promo-emoji">🍜🔥🚀</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="chinese-grid container">
        {secondHalf.map((item, i) => (
          <div className="chinese-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${chineseImages[i + 10] || 'Chinese.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{99 + (i + 10) * 8}</span>
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
        <p>🌟 Experience the taste of China with a local spice fusion! 🌟</p>
      </div>
    </div>
  );
}
