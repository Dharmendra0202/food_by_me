import React from "react";
import { useNavigate } from "react-router-dom";
import "./DessertPage.css";

const dessertItems = [
  { name: "Gulab Jamun", emoji: "🫒", desc: "Soft spongy balls in sugar syrup" },
  { name: "Kheer", emoji: "🥣", desc: "Creamy rice pudding with nuts" },
  { name: "Payesh", emoji: "🍲", desc: "Traditional Bengali sweet pudding" },
  { name: "Jalebi", emoji: "🧡", desc: "Crispy orange spiral dessert" },
  { name: "Halwa", emoji: "🟠", desc: "Rich and dense sweet delight" },
  { name: "Barfi", emoji: "🟫", desc: "Milk-based fudgy square" },
  { name: "Laddu", emoji: "🔴", desc: "Round balls of sweetness" },
  { name: "Peda", emoji: "💛", desc: "Soft milk fudge pieces" },
  { name: "Ras Malai", emoji: "⚪", desc: "Soft cheese in sweet milk" },
  { name: "Sandessh", emoji: "🟡", desc: "Bengali cottage cheese sweet" },
  { name: "Shrikhand", emoji: "💜", desc: "Hung yogurt dessert" },
  { name: "Basundi", emoji: "🟤", desc: "Thickened milk dessert" },
  { name: "Khir", emoji: "🍚", desc: "Sweet rice preparation" },
  { name: "Fafda Jalebi", emoji: "🌈", desc: "Crispy & sweet combo" },
  { name: "Malpua", emoji: "🔶", desc: "Pancake-like sweet" },
  { name: "Mysore Pak", emoji: "🟠", desc: "Gram flour brittle" },
  { name: "Gajak", emoji: "🦧", desc: "Peanut brittle candy" },
  { name: "Til Chikki", emoji: "🌾", desc: "Sesame brittle snap" },
  { name: "Besan Burfi", emoji: "💛", desc: "Chickpea flour fudge" },
  { name: "Khoya Barfi", emoji: "🟫", desc: "Milk solids delight" },
];

const dessertImages = Array(20).fill("desserts.jpg");

export default function DessertPage() {
  const navigate = useNavigate();
  const firstHalf = dessertItems.slice(0, 10);
  const secondHalf = dessertItems.slice(10);

  return (
    <div className="dessert-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">🍮 Sweet Bliss Awaits!</h1>
          <p className="hero-subtitle">Indulge in our collection of 20+ mouth-watering traditional desserts</p>
          <div className="hero-badge">✨ Handcrafted with Love ✨</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Why Our Desserts? 🎯</h2>
          <p>Every dessert is crafted using premium ingredients and traditional recipes passed down through generations. From soft and creamy to crispy and crunchy, we have something for every sweet tooth!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="dessert-grid container">
        {firstHalf.map((item, i) => (
          <div className="dessert-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${dessertImages[i] || 'desserts.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{149 + i * 7}</span>
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
      <div className="promo-banner">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🎉 Special Offer! 🎉</h2>
            <p>Order any 3 desserts and get <span className="highlight">20% OFF</span></p>
          </div>
          <div className="promo-emoji">🛍️💰🎁</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="dessert-grid container">
        {secondHalf.map((item, i) => (
          <div className="dessert-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${dessertImages[i + 10] || 'desserts.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{149 + (i + 10) * 7}</span>
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
        <p>🌟 Try our bestsellers and experience the magic of traditional sweets! 🌟</p>
      </div>
    </div>
  );
}
