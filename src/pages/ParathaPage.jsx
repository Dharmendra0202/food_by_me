import React from "react";
import { useNavigate } from "react-router-dom";
import "./ParathaPage.css";

const parathaItems = [
  { name: "Aloo Paratha", emoji: "🥔", desc: "Potato stuffed flatbread" },
  { name: "Paneer Paratha", emoji: "🧀", desc: "Cottage cheese filled" },
  { name: "Mooli Paratha", emoji: "🤍", desc: "Radish & spice mix" },
  { name: "Pyaz Paratha", emoji: "🧅", desc: "Onion layered delight" },
  { name: "Gobi Paratha", emoji: "🥦", desc: "Cauliflower stuffed" },
  { name: "Methi Paratha", emoji: "🌿", desc: "Fenugreek herb bread" },
  { name: "Matar Paratha", emoji: "🟢", desc: "Green peas filling" },
  { name: "Chole Paratha", emoji: "🟡", desc: "Chickpea enriched" },
  { name: "Besan Paratha", emoji: "🟠", desc: "Gram flour delicate" },
  { name: "Til Paratha", emoji: "🌾", desc: "Sesame seed sprinkled" },
  { name: "Ajwain Paratha", emoji: "🌱", desc: "Carom seed flavored" },
  { name: "Masala Paratha", emoji: "🌶️", desc: "Spiced perfection" },
  { name: "Cheese Paratha", emoji: "🧈", desc: "Melted cheese inside" },
  { name: "Corn Paratha", emoji: "🌽", desc: "Sweet corn kernels" },
  { name: "Beet Paratha", emoji: "🟣", desc: "Earthroot colored" },
  { name: "Spinach Paratha", emoji: "💚", desc: "Iron-rich green" },
  { name: "Potato & Onion", emoji: "👨‍🍳", desc: "Classic duet" },
  { name: "Mixed Veg", emoji: "🎨", desc: "Rainbow vegetable" },
  { name: "Tandoori Paratha", emoji: "🔥", desc: "Smoky charred" },
  { name: "Butter Paratha", emoji: "🧈", desc: "Golden & flaky" },
];

const parathaImages = Array(20).fill("paratha.jpg");

export default function ParathaPage() {
  const navigate = useNavigate();
  const firstHalf = parathaItems.slice(0, 10);
  const secondHalf = parathaItems.slice(10);

  return (
    <div className="paratha-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner paratha-hero">
        <div className="hero-content">
          <h1 className="hero-title">🫓 Soft & Flaky Paratha Heaven!</h1>
          <p className="hero-subtitle">Experience 20+ irresistible paratha varieties, perfect for breakfast or anytime!</p>
          <div className="hero-badge">🔥 Crispy on Outside, Soft Inside 🔥</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Why Love Our Parathas? 👨‍🍳</h2>
          <p>Hand-rolled to perfection, stuffed with fresh ingredients, and cooked on traditional griddles. Each paratha is a burst of flavors wrapped in layers of golden-brown goodness!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="paratha-grid container">
        {firstHalf.map((item, i) => (
          <div className="paratha-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${parathaImages[i] || 'paratha.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{59 + i * 8}</span>
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
      <div className="promo-banner paratha-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🎯 Breakfast Deal! 🎯</h2>
            <p>Get any paratha + chai for just <span className="highlight">₹99</span></p>
          </div>
          <div className="promo-emoji">☕🥐🛒</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="paratha-grid container">
        {secondHalf.map((item, i) => (
          <div className="paratha-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${parathaImages[i + 10] || 'paratha.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{59 + (i + 10) * 8}</span>
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
        <p>🌟 Handmade parathas delivered fresh to your table every time! 🌟</p>
      </div>
    </div>
  );
}
