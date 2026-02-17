import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import WhatsOnYourMind from "../components/WhatsOnYourMind";
import { deliveryRestaurants } from "../data/restaurants";

const sampleRestaurants = deliveryRestaurants.slice(0, 6).map((restaurant) => ({
  id: restaurant.id,
  name: restaurant.name,
  cuisine: restaurant.cuisines.join(" • "),
  eta: `${restaurant.etaMin}-${restaurant.etaMax} min`,
  price: `₹${restaurant.priceForTwo} for two`,
  rating: restaurant.rating.toFixed(1),
}));

const cuisineOptions = [
  "All",
  ...new Set(
    deliveryRestaurants.flatMap((restaurant) => restaurant.cuisines)
  ),
];

const adRestaurantIds = new Set([
  "biryani",
  "pizza",
  "dosa",
  "idli",
  "rolls",
  "pav-bhaji",
]);


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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [heroSearchValue, setHeroSearchValue] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const knownAreas = useMemo(
    () =>
      Array.from(
        new Set(
          deliveryRestaurants
            .map((restaurant) => restaurant.area)
            .filter((area) => Boolean(area))
        )
      ),
    []
  );

  

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

  const filteredSwiggyRestaurants = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let list = deliveryRestaurants.filter((restaurant) => {
      const matchesSearch =
        !query ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.area.toLowerCase().includes(query) ||
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(query)
        );

      const matchesCuisine =
        selectedCuisine === "All" ||
        restaurant.cuisines.includes(selectedCuisine);

      return matchesSearch && matchesCuisine;
    });

    if (sortBy === "rating-high") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "eta-low") {
      list = [...list].sort((a, b) => a.etaMin - b.etaMin);
    } else if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.priceForTwo - b.priceForTwo);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.priceForTwo - a.priceForTwo);
    } else if (sortBy === "name-az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchTerm, selectedCuisine, sortBy]);

  const hasActiveSwiggyFilters =
    searchTerm.trim().length > 0 ||
    selectedCuisine !== "All" ||
    sortBy !== "relevance";

  const scrollToSwiggy = () => {
    const el = document.getElementById("swiggy");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.focus({ preventScroll: true });
  };

  const findMatchingArea = (value) => {
    const query = value.trim().toLowerCase();
    if (!query) return "";
    return (
      knownAreas.find((area) => {
        const normalizedArea = area.toLowerCase();
        return (
          normalizedArea.includes(query) ||
          query.includes(normalizedArea)
        );
      }) || ""
    );
  };

  const runHeroSearch = (value) => {
    const rawQuery = value.trim();
    const matchedArea = findMatchingArea(rawQuery);
    const nextSearch = matchedArea || rawQuery;

    setSearchTerm(nextSearch);
    setSelectedCuisine("All");
    setSortBy("relevance");
    setLocationError("");

    if (!nextSearch) {
      setLocationStatus("Showing all restaurants");
    } else if (matchedArea) {
      setLocationStatus(`Showing restaurants near ${matchedArea}`);
    } else {
      setLocationStatus(`Showing results for "${rawQuery}"`);
    }

    scrollToSwiggy();
  };

  const getGeoErrorMessage = (error) => {
    if (!error) return "Unable to fetch location right now.";
    if (error.code === 1)
      return "Location permission denied. Please allow location access.";
    if (error.code === 2)
      return "Could not detect your location. Please try again.";
    if (error.code === 3)
      return "Location request timed out. Please try again.";
    return "Unable to fetch location right now.";
  };

  const reverseGeocode = async (latitude, longitude) => {
    const endpoint = new URL("https://nominatim.openstreetmap.org/reverse");
    endpoint.searchParams.set("format", "jsonv2");
    endpoint.searchParams.set("lat", String(latitude));
    endpoint.searchParams.set("lon", String(longitude));
    endpoint.searchParams.set("zoom", "16");
    endpoint.searchParams.set("addressdetails", "1");

    const response = await fetch(endpoint.toString(), {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
    }

    const data = await response.json();
    const address = data?.address || {};
    const shortLabel =
      address.suburb ||
      address.neighbourhood ||
      address.city_district ||
      address.city ||
      address.town ||
      address.village ||
      "";

    return {
      shortLabel,
      fullLabel: data?.display_name || shortLabel,
    };
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");
    setLocationStatus("");

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = position.coords;
      let areaHint = "";
      let locationLabel = "";

      try {
        const geocode = await reverseGeocode(latitude, longitude);
        areaHint = geocode.shortLabel || geocode.fullLabel || "";
        locationLabel = geocode.shortLabel || geocode.fullLabel || "";
      } catch (error) {
        areaHint = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
        locationLabel = `Lat ${latitude.toFixed(3)}, Lon ${longitude.toFixed(3)}`;
      }

      const matchedArea = findMatchingArea(areaHint);

      if (matchedArea) {
        setHeroSearchValue(matchedArea);
        setSearchTerm(matchedArea);
        setLocationStatus(`Location detected: ${matchedArea}`);
      } else {
        setHeroSearchValue("");
        setSearchTerm("");
        setLocationStatus(`Location detected: ${locationLabel}. Showing all restaurants near you.`);
      }

      setSelectedCuisine("All");
      setSortBy("relevance");
      scrollToSwiggy();
    } catch (error) {
      setLocationError(getGeoErrorMessage(error));
    } finally {
      setLocationLoading(false);
    }
  };

  const resetSwiggyFilters = () => {
    setSearchTerm("");
    setSelectedCuisine("All");
    setSortBy("relevance");
    setLocationStatus("");
    setLocationError("");
    setHeroSearchValue("");
  };

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
            <span className="hero-title-main">
              Delicious Food <span className="accent">Delivered</span>
            </span>
            <br />
            <span className="hero-title-secondary">To Your Doorstep</span>
          </h1>

          {/* <p className="hero-sub">
            Order from the best restaurants in your city. Fast delivery, amazing
            taste, unbeatable prices.
          </p> */}

          {/* Search Bar like Image 1 (SVG Icons) */}
          <div className="hero-search">
            <div className="search-box">
              {/* Location Icon */}
              <button
                type="button"
                className="search-icon-btn"
                onClick={handleUseCurrentLocation}
                disabled={locationLoading}
                aria-label="Use current location"
                title="Use current location"
              >
                <span className="search-icon" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
                      stroke="#FF7A45"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      stroke="#FF7A45"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </button>

              <input
                type="search"
                className="search-input"
                placeholder="Enter delivery address..."
                value={heroSearchValue}
                onChange={(e) => setHeroSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    runHeroSearch(heroSearchValue);
                  }
                }}
                disabled={locationLoading}
              />

              <button
                type="button"
                className="search-btn"
                onClick={() => runHeroSearch(heroSearchValue)}
                disabled={locationLoading}
              >
                {locationLoading ? "Finding..." : "Find Food"}
                <span className="arrow" aria-hidden="true">
                  ›
                </span>
              </button>
            </div>

            {(locationStatus || locationError) && (
              <p
                className={`search-feedback${
                  locationError ? " search-feedback-error" : ""
                }`}
              >
                {locationError || locationStatus}
              </p>
            )}

            <div className="search-meta">
              {/* Clock */}
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#FF7A45"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7v5l3 2"
                      stroke="#FF7A45"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>30 min delivery</span>
              </div>

              {/* Star */}
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3l2.6 5.8 6.4.6-4.8 4.1 1.5 6.2L12 16.9 6.3 19.7l1.5-6.2L3 9.4l6.4-.6L12 3Z"
                      fill="#FF7A45"
                    />
                  </svg>
                </span>
                <span>4.8 avg rating</span>
              </div>
            </div>
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

      {/* SWIGGY STYLE RESTAURANT LIST SECTION */}
      <section
        className="swiggy-section container fade-in"
        id="swiggy"
        tabIndex={-1}
      >
        <div className="swiggy-head">
          <div>
            <h2 className="swiggy-title">
              Restaurants with online food delivery near you
            </h2>
          </div>

          <div className="swiggy-controls" role="group" aria-label="Filter restaurants">
            <input
              type="search"
              className="swiggy-search-input"
              placeholder="Search by name, cuisine, area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search restaurants"
            />

            <select
              className="sort-btn"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              aria-label="Filter by cuisine"
            >
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>

            <select
              className="sort-btn"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort restaurants"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="rating-high">Sort: Rating (High to Low)</option>
              <option value="eta-low">Sort: Fastest Delivery</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
              <option value="name-az">Sort: Name (A to Z)</option>
            </select>

            {hasActiveSwiggyFilters && (
              <button className="sort-btn reset-btn" onClick={resetSwiggyFilters}>
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="swiggy-grid">
          {filteredSwiggyRestaurants.length ? (
            filteredSwiggyRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="swiggy-card swiggy-card-link"
                aria-label={`Open ${restaurant.name}`}
              >
                <div className="swiggy-img">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <span className="swiggy-offer">{restaurant.offer}</span>
                </div>

                <div className="swiggy-info">
                  <div className="swiggy-title-row">
                    {adRestaurantIds.has(restaurant.id) && (
                      <span className="swiggy-ad-tag">Ad</span>
                    )}
                    <h3 className="swiggy-name">{restaurant.name}</h3>
                  </div>

                  <div className="swiggy-meta">
                    <span className="swiggy-rating">
                      <span className="swiggy-rating-icon" aria-hidden="true">
                        ★
                      </span>
                      <span>{restaurant.rating.toFixed(1)}</span>
                    </span>
                    <span className="swiggy-meta-dot" aria-hidden="true">
                      •
                    </span>
                    <span className="swiggy-time">
                      {restaurant.etaMin}-{restaurant.etaMax} mins
                    </span>
                  </div>

                  <p className="swiggy-cuisine">
                    {restaurant.cuisines.join(", ")}
                  </p>
                  <p className="swiggy-area">{restaurant.area}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="swiggy-empty">
              No restaurants matched your search. Try another cuisine or clear filters.
            </div>
          )}
        </div>
      </section>

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
          {/* <button
            className="btn btn-outline pulse"
            onClick={() => {
              setSelectedCategory("");
              window.alert("🍕 Loading more restaurants soon!");
            }}
          >
            🍴 Show More Restaurants
          </button> */}
        </div>
      </section>
      {/* APP DOWNLOAD / PARTNER SECTION */}
      <section className="app-section container fade-in" id="app">
        <div className="app-inner">
          <div className="app-left">
            <h2 className="app-title">
              Get Food Delivered <span className="accent">Faster 🚀</span>
            </h2>

            <p className="app-sub">
              Download our app and enjoy lightning-fast delivery, exclusive
              offers, and easy ordering anytime, anywhere!
            </p>

            <div className="app-features">
              <div className="app-feature">📍 Live Order Tracking</div>
              <div className="app-feature">💳 Easy Payments</div>
              <div className="app-feature">🎁 Daily Offers & Rewards</div>
              <div className="app-feature">🍔 1000+ Restaurants</div>
            </div>

            <div className="app-buttons">
              <button
                className="btn btn-primary"
                onClick={() => window.alert("📲 App Store link coming soon!")}
              >
                🍎 Download on App Store
              </button>

              <button
                className="btn btn-outline"
                onClick={() => window.alert("📲 Play Store link coming soon!")}
              >
                🤖 Get it on Google Play
              </button>
            </div>
          </div>

          <div className="app-right">
            <div className="app-card">
              <h3>🤝 Want to Partner with Us?</h3>
              <p>
                Grow your restaurant business with more orders and more
                customers.
              </p>
              <button
                className="btn btn-link"
                onClick={() =>
                  window.alert("📩 Partner registration coming soon!")
                }
              >
                ➕ Register Your Restaurant
              </button>
            </div>

            <div className="app-card">
              <h3>🛵 Become a Delivery Partner</h3>
              <p>Earn money with flexible working hours and daily payouts.</p>
              <button
                className="btn btn-link"
                onClick={() =>
                  window.alert("🛵 Delivery partner signup coming soon!")
                }
              >
                ➕ Join as Delivery Partner
              </button>
            </div>
          </div>
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
