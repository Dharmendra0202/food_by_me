import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import heroImg from "../assets/hero.jpg";
import deliveryImg from "../assets/delivery.png";
import burgerImg from "../assets/burger.jpg";
import WhatsOnYourMind from "../components/WhatsOnYourMind";
{
  /* <WhatsOnYourMind autoMs={90000} /> */
}

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
      className="restaurant-card"
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

  // handler for category click from WhatsOnYourMind
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);

    const el = document.getElementById("restaurants");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // focus for screen readers/keyboard users
      el.focus({ preventScroll: true });
    }
  };

  // basic filter that checks name and cuisine for the selected category
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
      {/* HERO SECTION */}
      <header className="home-hero" role="region" aria-label="Homepage hero">
        <div className="hero-inner container">
          {/* Moving Badge Truck */}
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

      {/* Floating Food Icons — place here, outside the header so it sits above next section */}
      <div className="hero-icons" aria-hidden="true">
        <span>🍕</span>
        <span>🍔</span>
        <span>🥗</span>
        <span>🍜</span>
        <span>🥘</span>
        <span>🫀</span>
      </div>

      {/* <WhatsOnYourMind /> */}

      {/* Categories (clickable) */}
      <WhatsOnYourMind onSelect={handleCategorySelect} speed={230} />

      {/* WHY CHOOSE US */}
      <section id="why" className="why-section container">
        <div className="why-inner">
          <div className="why-left">
            <h2 className="why-title">
              Why Choose <span className="accent">Us?</span>
            </h2>

            <p className="why-sub">
              We focus on speed, quality, and value — so you can enjoy delicious
              meals without hassle.
            </p>

            <div className="why-decor" aria-hidden="true">
              <span className="blob b1" />
              <span className="blob b2" />
            </div>
          </div>

          {/* WHY CARDS */}
          <div className="why-cards" role="list">
            {[
              {
                id: "fast",
                title: "Fast Delivery",
                desc: "Hot food delivered from door to door in minutes.",
                icon: (
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="fastIcon" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#ff7c2e" />
                        <stop offset="1" stopColor="#ffb347" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M3 12h11l4-5h3v10h-3l-4-5H3"
                      stroke="url(#fastIcon)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="7" cy="17" r="2" fill="url(#fastIcon)" />
                    <circle cx="17" cy="17" r="2" fill="url(#fastIcon)" />
                  </svg>
                ),
              },

              {
                id: "top",
                title: "Top Restaurants",
                desc: "Handpicked partners with high hygiene & taste standards.",
                icon: (
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="topIcon" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#ff5562" />
                        <stop offset="1" stopColor="#ff8aa8" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"
                      fill="url(#topIcon)"
                    />
                  </svg>
                ),
              },

              {
                id: "price",
                title: "Best Prices",
                desc: "Offers, combos and deals that save you money every order.",
                icon: (
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient
                        id="priceIcon"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop stopColor="#38ef7d" />
                        <stop offset="1" stopColor="#11998e" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M12 2L4 6v6c0 5 3.8 9.7 8 11 4.2-1.3 8-6 8-11V6l-8-4z"
                      fill="url(#priceIcon)"
                    />
                    <path d="M11 9h2v6h-2z" fill="white" />
                  </svg>
                ),
              },

              {
                id: "variety",
                title: "Huge Variety",
                desc: "From local favorites to global cuisines — something for everyone.",
                icon: (
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="varIcon" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#fbd72b" />
                        <stop offset="1" stopColor="#f9484a" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M3 12h18c0 5-4 9-9 9s-9-4-9-9z"
                      fill="url(#varIcon)"
                    />
                    <circle cx="8" cy="9" r="2" fill="#fff" opacity="0.7" />
                    <circle cx="16" cy="9" r="2" fill="#fff" opacity="0.7" />
                  </svg>
                ),
              },
            ].map((f, i) => (
              <article
                key={f.id}
                className="why-card"
                role="listitem"
                tabIndex={0}
                style={{ "--i": i + 1 }}
              >
                <div className="why-icon">{f.icon}</div>

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
        className="restaurants-section container"
        tabIndex={-1}
      >
        <div className="section-head">
          <h2>Popular Restaurants</h2>
          <p className="section-sub">
            {selectedCategory
              ? `Showing results for "${selectedCategory}"`
              : "Handpicked places with great reviews near you"}
          </p>
          {selectedCategory && (
            <button
              className="btn btn-link"
              onClick={() => setSelectedCategory("")}
              aria-label="Clear filter"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="restaurants-grid">
          {filtered.length ? (
            filtered.map((r) => <RestaurantCard key={r.id} r={r} />)
          ) : (
            <div className="no-results">
              No restaurants found for "{selectedCategory}"
            </div>
          )}
        </div>

        <div className="more-action">
          <button
            className="btn btn-outline"
            onClick={() => {
              setSelectedCategory("");
              window.alert("Load more — hook to API later");
            }}
          >
            Show more restaurants
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer container">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} FoodByMe — Made with ❤️</div>

          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
