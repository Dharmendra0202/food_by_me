import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoffeePage.css";

const coffeeItems = [
  { name: "Espresso", emoji: "☕", desc: "Strong & concentrated shot" },
  { name: "Americano", emoji: "🖤", desc: "Bold & straightforward" },
  { name: "Cappuccino", emoji: "🤎", desc: "Creamy & balanced blend" },
  { name: "Latte", emoji: "🤍", desc: "Smooth & milky comfort" },
  { name: "Macchiato", emoji: "🟤", desc: "Espresso kissed with foam" },
  { name: "Mocha", emoji: "🍫", desc: "Chocolate coffee blend" },
  { name: "Flat White", emoji: "⚪", desc: "Velvety & smooth" },
  { name: "Cortado", emoji: "🟠", desc: "Perfect 1:1 ratio" },
  { name: "Vienna Coffee", emoji: "🎂", desc: "Topped with cream" },
  { name: "Irish Coffee", emoji: "🥃", desc: "Whiskey kissed blend" },
  { name: "Iced Coffee", emoji: "🧊", desc: "Chilled refreshment" },
  { name: "Cold Brew", emoji: "❄️", desc: "Smooth overnight blend" },
  { name: "Affogato", emoji: "🍦", desc: "Ice cream coffee dip" },
  { name: "Lungo", emoji: "💧", desc: "Extended espresso pull" },
  { name: "Ristretto", emoji: "⚡", desc: "Ultra concentrated shot" },
  { name: "Café Au Lait", emoji: "☕", desc: "French coffee blend" },
  { name: "Cafe Nero", emoji: "🖤", desc: "Premium dark roast" },
  { name: "Black Coffee", emoji: "⚫", desc: "Pure & unfiltered" },
  { name: "White Coffee", emoji: "⚪", desc: "Light roast perfection" },
  { name: "Dalgona Coffee", emoji: "🥄", desc: "Whipped coffee magic" },
];

const coffeeImages = Array(20).fill("Coffee.jpg");

export default function CoffeePage() {
  const navigate = useNavigate();
  const firstHalf = coffeeItems.slice(0, 10);
  const secondHalf = coffeeItems.slice(10);

  return (
    <div className="coffee-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* HERO BANNER */}
      <div className="hero-banner coffee-hero">
        <div className="hero-content">
          <h1 className="hero-title">☕ Espresso Your Love!</h1>
          <p className="hero-subtitle">20+ premium coffee blends crafted for every taste</p>
          <div className="hero-badge">🔥 Brew That Bold Magic 🔥</div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="description-section">
        <div className="desc-content">
          <h2>Coffee Perfection ☕</h2>
          <p>From Italian espressos to cold brew chills, our expert baristas craft each cup with passion. Premium beans, perfect temperature, pure bliss!</p>
        </div>
      </div>

      {/* FIRST GRID */}
      <div className="coffee-grid container">
        {firstHalf.map((item, i) => (
          <div className="coffee-card" key={i}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${coffeeImages[i] || 'Coffee.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{69 + i * 5}</span>
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
      <div className="promo-banner coffee-promo">
        <div className="promo-content">
          <div className="promo-text">
            <h2>☕ Morning Buzz! ☕</h2>
            <p>Order before 9 AM, get <span className="highlight">Free pastry!</span></p>
          </div>
          <div className="promo-emoji">🥐✨🎀</div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="coffee-grid container">
        {secondHalf.map((item, i) => (
          <div className="coffee-card" key={i + 10}>
            <div className="card-emoji">{item.emoji}</div>
            <div className="card-image">
              <img
                src={`/images/${coffeeImages[i + 10] || 'Coffee.jpg'}`}
                alt={item.name}
              />
              <span className="price-tag">₹{69 + (i + 10) * 5}</span>
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
        <p>🌟 Life is too short for bad coffee! Get your perfect cup today 🌟</p>
      </div>
    </div>
  );
}
