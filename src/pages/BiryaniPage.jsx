import React from "react";
import { useNavigate } from "react-router-dom";
import "./BiryaniPage.css";

const biryaniItems = [
  "Hyderabadi Biryani",
  "Lucknowi Biryani",
  "Kolkata Biryani",
  "Sindhi Biryani",
  "Malabar Biryani",
  "Ambur Biryani",
  "Thalassery Biryani",
  "Bombay Biryani",
  "Dindigul Biryani",
  "Chettinad Biryani",
  "Chicken Dum Biryani",
  "Mutton Dum Biryani",
  "Egg Biryani",
  "Paneer Biryani",
  "Veg Biryani",
  "Fish Biryani",
  "Prawn Biryani",
  "Keema Biryani",
  "Afghani Biryani",
  "Kashmiri Biryani",
  "Donne Biryani",
  "Calicut Biryani",
  "Beary Biryani",
  "Bohri Biryani",
  "Tehari Biryani",
  "Mughlai Biryani",
  "Tandoori Chicken Biryani",
  "Spicy Andhra Biryani",
  "Green Masala Biryani",
  "Handi Biryani",
  "Nizami Biryani",
  "Irani Biryani",
  "BBQ Chicken Biryani",
  "Special Royal Biryani",
  "Butter Chicken Biryani",
  "Hyderabadi Kacchi Biryani",
  "Hyderabadi Pakki Biryani",
  "Kunda Biryani",
  "Bamboo Biryani",
  "Festival Special Biryani",
];

// Provide image filenames for each biryani card (place these files in public/images)
// Edit these names manually to match your files. If an entry is empty, a fallback image is used.
const biryaniImages = [
  "biryani-1.jpg",
  "biryani-2.jpg",
  "biryani-3.jpg",
  "biryani-4.jpg",
  "biryani-5.jpg",
  "biryani-6.jpg",
  "biryani-7.jpg",
  "biryani-8.jpg",
  "biryani-9.jpg",
  "biryani-10.jpg",
  "biryani-11.jpg",
  "biryani-12.jpg",
  "biryani-13.jpg",
  "biryani-14.jpg",
  "biryani-15.jpg",
  "biryani-16.jpg",
  "biryani-17.jpg",
  "biryani-18.jpg",
  "biryani-19.jpg",
  "biryani-20.jpg",
  "biryani-21.jpg",
  "biryani-22.jpg",
  "biryani-23.jpg",
  "biryani-24.jpg",
  "biryani-25.jpg",
  "biryani-26.jpg",
  "biryani-27.jpg",
  "biryani-28.jpg",
  "biryani-29.jpg",
  "biryani-30.jpg",
  "biryani-31.jpg",
  "biryani-32.jpg",
  "biryani-33.jpg",
  "biryani-34.jpg",
  "biryani-35.jpg",
  "biryani-36.jpg",
  "biryani-37.jpg",
  "biryani-38.jpg",
  "biryani-39.jpg",
  "biryani-40.jpg",
];

export default function BiryaniPage() {
  const navigate = useNavigate();

  return (
    <div className="biryani-page">
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="biryani-hero">
        <h1>🍛 40 Types of Delicious Biryani</h1>
        <p>Pick your favourite flavor and enjoy the feast</p>
      </div>

      <div className="biryani-grid container">
        {biryaniItems.map((name, i) => (
          <div className="biryani-card swiggy-card" key={i}>
            <div className="swiggy-img">
              <img
                src={`/images/${biryaniImages[i] || 'Biryani.jpg'}`}
                alt={name}
              />
              <span className="swiggy-offer">ITEMS AT ₹{199 + i * 8}</span>
            </div>

            <div className="swiggy-info">
              <h3 className="swiggy-name">{name}</h3>

              <div className="swiggy-meta">
                <span className="swiggy-rating">⭐ {4.0 + (i % 5) * 0.1}</span>
                <span className="dot">•</span>
                <span>{25 + (i % 10)}-{35 + (i % 10)} mins</span>
              </div>

              <p className="swiggy-cuisine">Biryani • Special</p>
              <p className="swiggy-area">Chhindwara City</p>

              <div style={{ marginTop: 10 }}>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
