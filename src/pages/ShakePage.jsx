import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShakePage.css";

const shakeItems = [
  { name: "Mango Shake", emoji: "🥭", desc: "Tropical mango magic" },
  { name: "Strawberry", emoji: "🍓", desc: "Berry blast delight" },
  { name: "Choco Vanilla", emoji: "🍫", desc: "Sweet chocolate vanilla" },
  { name: "Banana", emoji: "🍌", desc: "Creamy smooth blend" },
  { name: "Papaya", emoji: "🧡", desc: "Tropical paradise shake" },
  { name: "Pineapple", emoji: "🍍", desc: "Tangy tropical punch" },
  { name: "Mixed Fruit", emoji: "🌈", desc: "Rainbow fruity mix" },
  { name: "Watermelon", emoji: "🍉", desc: "Refreshing summer cool" },
  { name: "Kiwi", emoji: "🥝", desc: "Green zesty flavor" },
  { name: "Blueberry", emoji: "💙", desc: "Antioxidant power" },
  { name: "Pomegranate", emoji: "🫒", desc: "Health boosting drink" },
  { name: "Litchi", emoji: "🎀", desc: "Floral sweet charm" },
  { name: "Coconut", emoji: "🥥", desc: "Tropical island vibes" },
  { name: "Almond", emoji: "🫘", desc: "Nutty protein shake" },
  { name: "Pistachio", emoji: "💚", desc: "Green nutty perfection" },
  { name: "Caramel", emoji: "🟤", desc: "Sweet caramel bliss" },
  { name: "Toffee", emoji: "🍬", desc: "Candy-like sweetness" },
  { name: "Cookies & Cream", emoji: "🍪", desc: "Cookie crunch shake" },
  { name: "Fudge Brownie", emoji: "🍫", desc: "Decadent chocolate" },
  { name: "Royal Mix", emoji: "👑", desc: "Premium shake special" },
];

const shakeImages = Array(20).fill("shake.jpg");

export default function ShakePage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(shakeItems.slice(0, 10));
  const secondHalf = trimTwo(shakeItems.slice(10));

  return (
    <div className="shake-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner shake-hero">
        <div className="hero-content">
          <h1 className="hero-title">🥤 Shake Me Up!</h1>
          <p className="hero-subtitle">20+ creamy, dreamy shakes to shake up your day</p>
          <div className="hero-badge">✨ Thick, Cold & Delicious ✨</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Shake Perfection 🥤</h2>
          <p>Blended fresh to order with premium ice cream and real fruits. Creamy, cold, and absolutely irresistible!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="shake-grid container">
        {firstHalf.map((item, i) => (
          <div className="shake-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${shakeImages[i] || 'shake.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{119 + i * 5}</span>
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
      <div className="promo-banner shake-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🥤 Cool Down! 🥤</h2>
            <p>Get large shake + free topping for <span className="highlight">₹199!</span></p>
          </div>
          <div className="promo-emoji">🍓🧊🎉</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="shake-grid container">
        {secondHalf.map((item, i) => (
          <div className="shake-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${shakeImages[i + 10] || 'shake.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{119 + (i + 10) * 5}</span>
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
        <p>🌟 Life is better with a cold shake in your hand! 🌟</p>
      </div>
    </div>
  );
}
