import React from "react";
import { useNavigate } from "react-router-dom";
import "./KebabsPage.css";

const kebabsItems = [
  { name: "Chicken Tikka", emoji: "🍗", desc: "Marinated tender pieces" },
  { name: "Mutton Kebab", emoji: "🍖", desc: "Succulent meat classic" },
  { name: "Seekh Kebab", emoji: "🍢", desc: "Ground meat on skewer" },
  { name: "Shami Kebab", emoji: "🟤", desc: "Soft patty delight" },
  { name: "Galauti Kebab", emoji: "🔴", desc: "Melt in mouth magic" },
  { name: "Malai Tikka", emoji: "⚪", desc: "Creamy cottage cheese" },
  { name: "Paneer Tikka", emoji: "🧀", desc: "Crispy paneer cubes" },
  { name: "Tandoori Chicken", emoji: "🔥", desc: "Smoky charred perfection" },
  { name: "Boti Kebab", emoji: "📍", desc: "Marinated meat chunks" },
  { name: "Reshmi Kebab", emoji: "🌟", desc: "Silky smooth blend" },
  { name: "Hariyali Kebab", emoji: "🌿", desc: "Green herb infused" },
  { name: "Murg Makhani", emoji: "🍗", desc: "Buttery rich taste" },
  { name: "Achari Kebab", emoji: "🫒", desc: "Pickle spice flavor" },
  { name: "Kakori Kebab", emoji: "🍡", desc: "Lucknow's specialty" },
  { name: "Fish Kebab", emoji: "🐟", desc: "Sea fresh catch" },
  { name: "Prawn Kebab", emoji: "🦐", desc: "Delicate seafood" },
  { name: "Vegetable Kebab", emoji: "🥒", desc: "Rainbow veggies" },
  { name: "Cottage Cheese", emoji: "🧈", desc: "Creamy paneer joy" },
  { name: "Minced Meat", emoji: "🥩", desc: "Spiced ground blend" },
  { name: "Royal Kebab", emoji: "👑", desc: "Premium specialty" },
];

const kebabsImages = Array(20).fill("kebabs.jpg");

export default function KebabsPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(kebabsItems.slice(0, 10));
  const secondHalf = trimTwo(kebabsItems.slice(10));

  return (
    <div className="kebabs-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner kebabs-hero">
        <div className="hero-content">
          <h1 className="hero-title">🔥 Sizzling Kebab Extravaganza!</h1>
          <p className="hero-subtitle">20+ perfectly grilled kebabs with smoke & spice</p>
          <div className="hero-badge">🍢 Charred to Perfection 🍢</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Kebab Mastery 🔥</h2>
          <p>Slow-roasted on traditional tandoors, marinated in aromatic spices, and served sizzling hot. Each kebab is a masterpiece of Indian culinary art!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="kebabs-grid container">
        {firstHalf.map((item, i) => (
          <div className="kebabs-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${kebabsImages[i] || 'kebabs.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{149 + i * 10}</span>
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
      <div className="promo-banner kebabs-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🔥 Sizzle Deal! 🔥</h2>
            <p>Order 2 kebabs, get <span className="highlight">complimentary sauce!</span></p>
          </div>
          <div className="promo-emoji">🍢🌶️🎊</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="kebabs-grid container">
        {secondHalf.map((item, i) => (
          <div className="kebabs-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${kebabsImages[i + 10] || 'kebabs.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{149 + (i + 10) * 10}</span>
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
        <p>🌟 Feel the heat, taste the flavor, experience the magic! 🌟</p>
      </div>
    </div>
  );
}
