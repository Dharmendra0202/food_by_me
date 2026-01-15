import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import heroImg from "../assets/hero.jpg";
import deliveryImg from "../assets/delivery.png";
import burgerImg from "../assets/burger.jpg";
import WhatsOnYourMind from "../components/WhatsOnYourMind";

/* sample restaurant data — replace with real API later */
const sampleRestaurants = [
  {
    id: 1,
    name: "Spice Villa",
    cuisine: "Indian • Biryani",
    eta: "25-35 min",
    price: "₹250 for two",
    rating: "4.6",
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian • Pizza",
    eta: "20-30 min",
    price: "₹350 for two",
    rating: "4.5",
  },
  {
    id: 3,
    name: "Sushi Spot",
    cuisine: "Japanese • Sushi",
    eta: "30-40 min",
    price: "₹600 for two",
    rating: "4.7",
  },
  {
    id: 4,
    name: "Burger Barn",
    cuisine: "Fast Food • Burgers",
    eta: "18-25 min",
    price: "₹200 for two",
    rating: "4.3",
  },
  {
    id: 5,
    name: "Green Bowl",
    cuisine: "Healthy • Salads",
    eta: "22-32 min",
    price: "₹300 for two",
    rating: "4.4",
  },
  {
    id: 6,
    name: "Taco Town",
    cuisine: "Mexican • Tacos",
    eta: "20-30 min",
    price: "₹280 for two",
    rating: "4.2",
  },
];

function RestaurantCard({ r }) {
  return (
    <article
      className="restaurant-card fade-in"
      tabIndex={0}
      aria-label={`${r.name} restaurant`}
    >
      <div className="restaurant-thumb" aria-hidden="true">
        <div className="thumb-placeholder">{r.name.split(" ")[0]}</div>
      </div>

      <div className="restaurant-info">
        <h3 className="restaurant-name">{r.name}</h3>

        <div className="restaurant-meta">
          <span className="cuisine">{r.cuisine}</span>
          <span className="dot">•</span>
          <span className="eta">{r.eta}</span>
        </div>

        <div className="restaurant-bottom">
          <div className="price">{r.price}</div>
          <div className="rating">⭐ {r.rating}</div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const badgeRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const truck = badge.querySelector(".truck");

    function adjustTruckTravel() {
      try {
        if (!badge || !truck) return;

        const badgeRect = badge.getBoundingClientRect();
        const truckRect = truck.getBoundingClientRect();

        const padding = 12;
        const travel = Math.max(
          0,
          badgeRect.width - truckRect.width - padding * 2
        );

        badge.style.setProperty("--truck-travel", `${Math.round(travel)}px`);
        badge.style.setProperty("--truck-start-left", `${padding}px`);
      } catch (err) {
        console.error("adjustTruckTravel error:", err);
      }
    }

    adjustTruckTravel();
    window.addEventListener("resize", adjustTruckTravel);

    const tId = setTimeout(adjustTruckTravel, 300);

    return () => {
      window.removeEventListener("resize", adjustTruckTravel);
      clearTimeout(tId);
    };
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);

    const el = document.getElementById("restaurants");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.focus({ preventScroll: true });
    }
  };

  const filtered = sampleRestaurants.filter((r) => {
    if (!selectedCategory) return true;
    const s = selectedCategory.toLowerCase();
    return (
      r.name.toLowerCase().includes(s) ||
      (r.cuisine || "").toLowerCase().includes(s)
    );
  });

  return (
    <>
      {/* HERO SECTION (UNCHANGED) */}
      <header className="home-hero" role="region" aria-label="Homepage hero">
        <div className="hero-inner container">
          <div
            className="hero-badge"
            role="status"
            aria-live="polite"
            ref={badgeRef}
            tabIndex={-1}
          >
            <span className="truck" aria-hidden="true">
              <svg
                viewBox="0 0 64 40"
                width="20"
                height="13"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    x="2"
                    y="10"
                    width="40"
                    height="18"
                    rx="3"
                    fill="#FF7A45"
                  />
                  <rect
                    x="36"
                    y="16"
                    width="18"
                    height="12"
                    rx="2"
                    fill="#FF4DA6"
                  />
                  <circle cx="14" cy="30" r="4.5" fill="#111827" />
                  <circle cx="46" cy="30" r="4.5" fill="#111827" />
                  <circle cx="14" cy="30" r="2.2" fill="#fff" />
                  <circle cx="46" cy="30" r="2.2" fill="#fff" />
                  <rect
                    x="8"
                    y="14"
                    width="14"
                    height="8"
                    rx="1"
                    fill="#FFD6B3"
                    opacity="0.14"
                  />
                </g>
              </svg>
            </span>

            <span className="badge-text">Fast Delivery • Fresh Food</span>
          </div>

          <h1 className="hero-title">
            Delicious Food <span className="accent">Delivered</span>
            <br /> To Your Doorstep
          </h1>

          <p className="hero-sub">
            Order from the best restaurants in your city. Fast delivery, amazing
            taste, unbeatable prices.
          </p>

          <div className="hero-ctas" role="navigation">
            <a href="#restaurants" className="btn btn-primary">
              <span className="icon">🔍</span>
              <span className="label">Explore Restaurants</span>
            </a>

            <a href="#cart" className="btn btn-outline">
              <span className="icon">🧾</span>
              <span className="label">View Cart</span>
            </a>
          </div>
        </div>
      </header>

      {/* Floating Food Icons */}
      <div className="hero-icons" aria-hidden="true">
        <span>🍕</span>
        <span>🍔</span>
        <span>🥗</span>
        <span>🍜</span>
        <span>🥘</span>
        <span>🧋</span>
      </div>

      {/* What's On Your Mind (UNCHANGED) */}
      <WhatsOnYourMind onSelect={handleCategorySelect} speed={230} />

      {/* WHY CHOOSE US (ENHANCED) */}
      <section id="why" className="why-section container fade-in">
        <div className="why-inner fancy-bg">
          <div className="why-left">
            <h2 className="why-title">
              Why Choose <span className="accent">Us? 🍽️</span>
            </h2>

            <p className="why-sub">
              We deliver more than meals — we deliver <b>joy 😋</b>, freshness
              🥦, and flavor 💫 with every bite.
            </p>

            <p className="why-extra">
              🎁 Enjoy exclusive deals, rewards, and premium partner
              restaurants!
            </p>

            <div className="why-decor animated-blobs" aria-hidden="true">
              <span className="blob b1" />
              <span className="blob b2" />
              <span className="blob b3" />
            </div>
          </div>

          <div className="why-cards" role="list">
            {[
              {
                id: "fast",
                title: "⚡ Fast Delivery",
                desc: "Hot meals delivered right when hunger strikes!",
              },
              {
                id: "top",
                title: "🏆 Top Restaurants",
                desc: "We partner only with the best-rated kitchens!",
              },
              {
                id: "price",
                title: "💸 Great Deals",
                desc: "Save money every time with exciting offers!",
              },
              {
                id: "variety",
                title: "🍱 Huge Variety",
                desc: "Cravings from Indian to Italian — all in one app!",
              },
              {
                id: "support",
                title: "💬 24/7 Support",
                desc: "Need help? Our team is here for you anytime, day or night!",
              },
              {
                id: "quality",
                title: "🥇 Premium Quality",
                desc: "We ensure the best hygiene, ingredients, and taste in every bite.",
              },
            ].map((f, i) => (
              <article
                key={f.id}
                className="why-card"
                role="listitem"
                tabIndex={0}
                style={{ "--i": i + 1 }}
              >
                <div className="why-icon">{f.title.split(" ")[0]}</div>
                <div className="why-body">
                  <h3 className="why-card-title">{f.title}</h3>
                  <p className="why-card-desc">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTS SECTION */}
      <section
        id="restaurants"
        className="restaurants-section container fade-in"
        tabIndex={-1}
      >
        <div className="section-head">
          <h2>🍔 Popular Restaurants Near You</h2>
          <p className="section-sub">
            {selectedCategory
              ? `Showing results for "${selectedCategory}"`
              : "Handpicked places with amazing food and reviews near you!"}
          </p>
          {selectedCategory && (
            <button
              className="btn btn-link"
              onClick={() => setSelectedCategory("")}
              aria-label="Clear filter"
            >
              ✖ Clear filter
            </button>
          )}
        </div>

        <div className="restaurants-grid">
          {filtered.length ? (
            filtered.map((r) => <RestaurantCard key={r.id} r={r} />)
          ) : (
            <div className="no-results">
              😞 No restaurants found for "{selectedCategory}"
            </div>
          )}
        </div>

        <div className="more-action">
          <button
            className="btn btn-outline pulse"
            onClick={() => {
              setSelectedCategory("");
              window.alert("🍕 Loading more restaurants soon!");
            }}
          >
            🍴 Show More Restaurants
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer container gradient-footer">
        <div className="footer-inner">
          <div>
            © {new Date().getFullYear()} <b>FoodByMe</b> — Made with ❤️, 🍔 & ☕
          </div>

          <div className="footer-links">
            <a href="/terms">📜 Terms</a>
            <a href="/privacy">🔒 Privacy</a>
            <a href="/contact">📞 Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
