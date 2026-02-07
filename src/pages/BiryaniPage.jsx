import React from "react";
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

export default function BiryaniPage() {
  return (
    <div className="biryani-page">
      <div className="biryani-hero">
        <h1>🍛 40 Types of Delicious Biryani</h1>
        <p>Pick your favourite flavor and enjoy the feast</p>
      </div>

      <div className="biryani-grid container">
        {biryaniItems.map((name, i) => (
          <div className="biryani-card" key={i}>
            <div className="biryani-emoji">🍛</div>
            <h3>{name}</h3>
            <p className="price">₹{199 + i * 8}</p>
            <button className="order-btn">Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
