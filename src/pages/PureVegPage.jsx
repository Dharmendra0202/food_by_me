import React from "react";
import { useNavigate } from "react-router-dom";
import "./PureVegPage.css";

const pureVegItems = [
  { name: "Paneer Tikka", emoji: "🧀", desc: "Grilled cheese cubes" },
  { name: "Aloo Gobi", emoji: "🥔", desc: "Potato cauliflower curry" },
  { name: "Chana Masala", emoji: "🟡", desc: "Spiced chickpea delight" },
  { name: "Dal Makhani", emoji: "🖤", desc: "Buttery lentil luxury" },
  { name: "Malai Kofta", emoji: "⚪", desc: "Creamy cottage cheese balls" },
  { name: "Veg Korma", emoji: "🥕", desc: "Mild creamy vegetable" },
  { name: "Paneer Butter", emoji: "🍖", desc: "Buttery paneer gravy" },
  { name: "Baingan Bhartha", emoji: "🍆", desc: "Smoky eggplant dish" },
  { name: "Mixed Veg Curry", emoji: "🌈", desc: "Colorful veggie medley" },
  { name: "Mushroom Pyaza", emoji: "🍄", desc: "Double onion mushroom" },
  { name: "Spinach Cheese", emoji: "💚", desc: "Iron-rich creamy blend" },
  { name: "Peas Paneer Fry", emoji: "🟢", desc: "Crispy cheese peas" },
  { name: "Veg Biryani", emoji: "🍚", desc: "Fragrant vegetarian rice" },
  { name: "Broccoli Pyaza", emoji: "🥦", desc: "Crispy broccoli stir fry" },
  { name: "Cauliflower", emoji: "🥦", desc: "Indo-Chinese style" },
  { name: "Veg Soup", emoji: "🥣", desc: "Warm comforting blend" },
  { name: "Bean Sprouts", emoji: "🫘", desc: "Crunchy dry fry" },
  { name: "Corn Capsicum", emoji: "🌽", desc: "Colorful stir fry" },
  { name: "Hakka Noodles", emoji: "🍜", desc: "Vegetarian noodles" },
  { name: "Veg Thali", emoji: "🍽️", desc: "Complete meal special" },
];

const pureVegImages = Array(20).fill("Pureveg.jpg");

export default function PureVegPage() {
  const navigate = useNavigate();
  const trimTwo = (arr) => arr.slice(0, Math.max(0, arr.length - 2));
  const firstHalf = trimTwo(pureVegItems.slice(0, 10));
  const secondHalf = trimTwo(pureVegItems.slice(10));

  return (
    <div className="pureveg-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner pureveg-hero">
        <div className="hero-content">
          <h1 className="hero-title">🥬 Pure Veg Paradise!</h1>
          <p className="hero-subtitle">20+ healthy vegetarian dishes for conscious eaters</p>
          <div className="hero-badge">🌿 Fresh, Green & Nutritious 🌿</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Vegetarian Bliss 🥗</h2>
          <p>No compromise on taste! Our vegetarian dishes are packed with nutrients, flavor, and love. Proof that healthy food can be absolutely delicious!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="pureveg-grid container">
        {firstHalf.map((item, i) => (
          <div className="pureveg-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${pureVegImages[i] || 'Pureveg.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{119 + i * 7}</span>
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
      <div className="promo-banner pureveg-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>🥗 Health First! 🥗</h2>
            <p>Order veg meal + salad for <span className="highlight">₹199!</span></p>
          </div>
          <div className="promo-emoji">🥬🍅💪</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="pureveg-grid container">
        {secondHalf.map((item, i) => (
          <div className="pureveg-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${pureVegImages[i + 10] || 'Pureveg.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{119 + (i + 10) * 7}</span>
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
        <p>🌟 Eat green, live clean, think lean! 🌟</p>
      </div>
    </div>
  );
}
