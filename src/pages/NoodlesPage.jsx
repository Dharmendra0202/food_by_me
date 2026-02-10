import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoodlesPage.css";

const noodlesItems = [
  { name: "Hakka Noodles", emoji: "🍜", desc: "Classic stir-fried noodles" },
  { name: "Chow Mein", emoji: "🍝", desc: "Crispy chow mein style" },
  { name: "Ramen Noodles", emoji: "🥢", desc: "Japanese ramen style" },
  { name: "Pad Thai", emoji: "🇹🇭", desc: "Thai street food classic" },
  { name: "Stir Fry", emoji: "🔥", desc: "Wok-tossed perfection" },
  { name: "Garlic Noodles", emoji: "🧄", desc: "Aromatic garlic blend" },
  { name: "Chili Garlic", emoji: "🌶️", desc: "Spicy numbing kick" },
  { name: "Schezuan", emoji: "🔥🔥", desc: "Fiery Sichuan sensation" },
  { name: "Honey Chili", emoji: "🍯", desc: "Sweet & spicy combo" },
  { name: "Thai Curry", emoji: "🟢", desc: "Green curry richness" },
  { name: "Szechuan", emoji: "👅", desc: "Tingling spice flavor" },
  { name: "Vegetable", emoji: "🥕", desc: "Rainbow veggie mix" },
  { name: "Singapore Mei Fun", emoji: "🌶️🟡", desc: "Curry rice noodles" },
  { name: "Peanut Sauce", emoji: "🫘", desc: "Creamy peanut blend" },
  { name: "Sesame", emoji: "🌾", desc: "Nutty sesame flavor" },
  { name: "Spicy Ramen", emoji: "🔥", desc: "Fiery broth noodles" },
  { name: "Mushroom Creamy", emoji: "🍄", desc: "Creamy mushroom sauce" },
  { name: "Thai Basil", emoji: "🌿", desc: "Fragrant basil blast" },
  { name: "Chicken Noodles", emoji: "🍗", desc: "Meat-loaded noodles" },
  { name: "Mixed Noodles", emoji: "🎨", desc: "Multi-flavor combo" },
];

const noodlesImages = Array(20).fill("Noodles.jpg");

export default function NoodlesPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(noodlesItems.slice(0, 10));
  const secondHalf = trimTwo(noodlesItems.slice(10));

  return (
    <div className="noodles-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner noodles-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍜 Slurp-Worthy Noodles!</h1>
          <p className="hero-subtitle">20+ noodle varieties from around the world</p>
          <div className="hero-badge">🍴 Hot, Fresh & Irresistible 🍴</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Noodle Adventure 🍜</h2>
          <p>From Asian classics to fusion flavors, our noodles are prepared fresh to order in screaming hot woks. Perfectly seasoned, never mushy!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="noodles-grid container">
        {firstHalf.map((item, i) => (
          <div className="noodles-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${noodlesImages[i] || 'Noodles.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{79 + i * 6}</span>
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
      <div className="promo-banner noodles-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🍜 Noodle Combo! 🍜</h2>
            <p>Buy 2 noodles + get <span className="highlight">free egg!</span></p>
          </div>
          <div className="promo-emoji">🥚🥢✨</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="noodles-grid container">
        {secondHalf.map((item, i) => (
          <div className="noodles-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${noodlesImages[i + 10] || 'Noodles.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{79 + (i + 10) * 6}</span>
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
        <p>🌟 The only thing faster than our noodles is you eating them! 🌟</p>
      </div>
    </div>
  );
}
