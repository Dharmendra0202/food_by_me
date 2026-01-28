import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

const DATA = {
  biryani: [
    { id: 1, name: "Hyderabadi Biryani", price: "₹299", rating: 4.6 },
    { id: 2, name: "Lucknowi Biryani", price: "₹349", rating: 4.5 },
    { id: 3, name: "Chicken Dum Biryani", price: "₹279", rating: 4.7 },
  ],
  noodles: [
    { id: 1, name: "Hakka Noodles", price: "₹199", rating: 4.4 },
    { id: 2, name: "Chilli Garlic Noodles", price: "₹229", rating: 4.5 },
  ],
};

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [slug]);

  if (loading) {
    return (
      <div className="category-loader">
        <div className="spinner" />
        <p>Loading {slug}...</p>
      </div>
    );
  }

  const items =
    DATA[slug]?.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <section className="category-page fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="category-title">
        🍽️ {slug.replace("-", " ").toUpperCase()}
      </h1>

      <input
        className="category-search"
        placeholder={`Search ${slug}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-grid">
        {items.map((item) => (
          <div className="category-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <span>⭐ {item.rating}</span>
          </div>
        ))}

        {!items.length && <p>No items found 😔</p>}
      </div>
    </section>
  );
}
