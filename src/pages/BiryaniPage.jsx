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

];

// Provide image filenames for each biryani card (place these files in public/images)
// Edit these names manually to match your files. If an entry is empty, a fallback image is used.
const biryaniImages = [
  "my-biryani-1.jpg",
  "my-biryani-2.jpg",
  "my-biryani-3.jpg",
  "my-biryani-4.jpg",
  "my-biryani-5.jpg",
  "my-biryani-6.jpg",
  "my-biryani-7.jpg",
  "my-biryani-8.jpg",
  "my-biryani-9.jpg",
  "my-biryani-10.jpg",
  "my-biryani-11.jpg",
  "my-biryani-12.jpg",
  "my-biryani-13.jpg",
  "my-biryani-14.jpg",
  "my-biryani-15.jpg",
  "my-biryani-16.jpg",
  "my-biryani-17.jpg",
  "my-biryani-18.jpg",
  "my-biryani-19.jpg",
  "my-biryani-20.jpg",
  "my-biryani-21.jpg",
  "my-biryani-22.jpg",
  "my-biryani-23.jpg",
  "my-biryani-24.jpg",
  "my-biryani-25.jpg",
  "my-biryani-26.jpg",
  "my-biryani-27.jpg",
  "my-biryani-28.jpg",
  "my-biryani-29.jpg",
  "my-biryani-30.jpg",
  "my-biryani-31.jpg",
  "my-biryani-32.jpg",
  "my-biryani-33.jpg",
  "my-biryani-34.jpg",
  "my-biryani-35.jpg",
  "my-biryani-36.jpg",
  "my-biryani-37.jpg",
  "my-biryani-38.jpg",
  "my-biryani-39.jpg",
  "my-biryani-40.jpg",
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
