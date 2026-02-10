import React from "react";
import { useNavigate } from "react-router-dom";
import "./FruitsPage.css";

const fruitsItems = [
  { name: "Mixed Apples", emoji: "🍎", desc: "Sweet & crisp combo" },
  { name: "Watermelon", emoji: "🍉", desc: "Refreshing hydration" },
  { name: "Mango Paradise", emoji: "🥭", desc: "King of fruits blend" },
  { name: "Strawberry Bliss", emoji: "🍓", desc: "Sweet & juicy berries" },
  { name: "Citrus Splash", emoji: "🍊", desc: "Tangy orange power" },
  { name: "Pomegranate", emoji: "🫒", desc: "Antioxidant gems" },
  { name: "Papaya Fresh", emoji: "🧡", desc: "Tropical sweetness" },
  { name: "Kiwi Refresher", emoji: "🥝", desc: "Zesty green fruit" },
  { name: "Pineapple Bowl", emoji: "🍍", desc: "Tropical paradise" },
  { name: "Grapes Bunch", emoji: "🍇", desc: "Nature's candy" },
  { name: "Orange Slices", emoji: "🟠", desc: "Vitamin C boost" },
  { name: "Banana Mix", emoji: "🍌", desc: "Creamy & nutritious" },
  { name: "Mixed Berries", emoji: "🟣", desc: "Superberry collection" },
  { name: "Guava Fresh", emoji: "🟢", desc: "Tropical treasure" },
  { name: "Chikoo", emoji: "🟤", desc: "Sweet mellow taste" },
  { name: "Dragon Fruit", emoji: "🐉", desc: "Exotic pink power" },
  { name: "Blueberry", emoji: "💙", desc: "Antioxidant packed" },
  { name: "Raspberry", emoji: "🫐", desc: "Delicate flavor" },
  { name: "Seasonal Platter", emoji: "🌈", desc: "Best of the season" },
  { name: "Tropical Combo", emoji: "🏝️", desc: "Paradise in bowl" },
];

const fruitsImages = Array(20).fill("Fruits.jpg");

export default function FruitsPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(fruitsItems.slice(0, 10));
  const secondHalf = trimTwo(fruitsItems.slice(10));

  return (
    <div className="fruits-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner fruits-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍎 Fresh & Fruity Goodness!</h1>
          <p className="hero-subtitle">20+ nature's finest fruits fresh from orchards</p>
          <div className="hero-badge">🌿 100% Natural & Fresh 🌿</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Nature's Candy 🍎</h2>
          <p>Handpicked from the finest orchards, our fruits are packed with natural vitamins, minerals, and antioxidants. Fresh, wholesome, and deliciously healthy!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="fruits-grid container">
        {firstHalf.map((item, i) => (
          <div className="fruits-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${fruitsImages[i] || 'Fruits.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{99 + i * 5}</span>
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
      <div className="promo-banner fruits-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🍎 Health First! 🍎</h2>
            <p>Get any 3 fruits box for <span className="highlight">₹250!</span></p>
          </div>
          <div className="promo-emoji">🥗🌿✨</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="fruits-grid container">
        {secondHalf.map((item, i) => (
          <div className="fruits-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${fruitsImages[i + 10] || 'Fruits.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{99 + (i + 10) * 5}</span>
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
        <p>🌟 An apple a day keeps the doctor away! Get your nutrition today 🌟</p>
      </div>
    </div>
  );
}
